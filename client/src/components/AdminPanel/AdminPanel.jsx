import React, { useContext, useState } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../firebase"; 
import { ProductContext } from "../../context/ProductContext";

function AdminPanel() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const { addProduct } = useContext(ProductContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }

    try {
      const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setFormData((prevData) => ({ ...prevData, imageUrl: downloadURL }));
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  const handleDeleteImage = async () => {
    if (!formData.imageUrl) {
      alert("No image to delete.");
      return;
    }

    try {
      const path = formData.imageUrl.split("/o/")[1].split("?")[0];
      const imgRef = ref(storage, decodeURIComponent(path));

      await deleteObject(imgRef);
      setFormData((prevData) => ({ ...prevData, imageUrl: "" }));
      setImageFile(null);

      alert("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      alert("Please upload an image before submitting.");
      return;
    }

    try {
      await addProduct(formData);

      console.log("Product created successfully:", formData);
      

      setFormData({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
        stock: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error creating the product:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create Product
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formData.imageUrl && (
            <div className="mt-2 flex items-center">
              <img
                src={formData.imageUrl}
                alt="Uploaded"
                className="w-16 h-16 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="ml-4 text-red-500"
              >
                Delete Image
              </button>
            </div>
          )}
          {!formData.imageUrl && imageFile && (
            <button
              type="button"
              onClick={handleUploadImage}
              className="mt-2 text-blue-500"
            >
              Upload Image
            </button>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product stock"
            required
          />
        </div>

        <button onClick={() => handleSubmit}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;

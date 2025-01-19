import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validateUserData } from '../validations/user.validation.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

dotenv.config();

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error during logout process.' });
  }
};

export const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const validationResult = validateUserData({ username, email, password, confirmPassword });

  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.errors });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: { email: 'User with this email already exists.' } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      token,
      user: { id: savedUser._id, username: savedUser.username, email: savedUser.email },
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errorMessages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ errors: errorMessages });
    }
    res.status(500).json({ message: err.message });
  }
};


export const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials (user not found)' });
    }

    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials (wrong password)' });
    }

    
    const token = jwt.sign(
      { userId: user._id, username: user.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    
    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
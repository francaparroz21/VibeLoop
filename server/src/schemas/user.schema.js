import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { validateUserData } from './path-to-your-zod-schema';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre('save', function (next) {
  const validation = validateUserData({
    username: this.username,
    email: this.email,
    password: this.password,
  });

  if (!validation.success) {
    const error = new mongoose.Error.ValidationError(this);
    validation.errors.forEach((err) => {
      error.addError(err.path[0], new mongoose.Error.ValidatorError({ message: err.message }));
    });
    return next(error);
  }
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model('User', userSchema);

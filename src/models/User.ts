import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface User extends Document {
  username: string,
  email: string,
  password: string,
  encryptPassword(password: string): Promise<string>,
  validatePassword(password: string): Promise<boolean>,
}

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  }
});

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}

export default model<User>('User', userSchema);
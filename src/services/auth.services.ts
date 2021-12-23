import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import UserModel, { User } from '../models/User';
import { ResponseData } from '../interface/response.interface';

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (userData: User): Promise<ResponseData> => {
  try {
    const userExist = await UserModel.findOne({email: userData.email});
    if (userExist) return { statusCode: 400, message: 'Email is duplicate'};
    const user: User = new UserModel(userData);
    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();
    return { statusCode: 201, message: 'Ok', userData: savedUser };
  } catch(err) {
    throw boom.internal();
  }
}

export const login = async (userData: User): Promise<ResponseData> => {
  const {email, password} = userData;
  try {
    const user = await UserModel.findOne({email});
    if (!user) return { statusCode: 400, message: 'Email/Password is incorrect' };
    const correctPassword = await user.validatePassword(password);
    if (!correctPassword) return { statusCode: 400, message: 'Email/Password is incorrect' };
    const token: string = jwt.sign({_id: user._id}, SECRET_KEY || 'tokentest', {
      expiresIn: 60 * 60 * 24
    });
    return { statusCode: 200, message: 'Ok', userData: {user, token} };
  } catch(err) {
    throw boom.internal();
  }
}

export const getUserProfile = async (id: string): Promise<ResponseData> => {
  try {
    const user = await UserModel.findById(id, {password: 0});
    if (!user) return { statusCode: 404, message: 'Email/Password is incorrect' };
    return { statusCode: 200, message: 'Ok', userData: user };
  } catch(err) {
    throw boom.internal();
  }
}
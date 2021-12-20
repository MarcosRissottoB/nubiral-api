import UserModel, { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { ResponseData } from '../interface/response.interface';
import boom from '@hapi/boom';
const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (userData: User): Promise<ResponseData> => {
  const user: User = new UserModel(userData);
  try {
    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();
    const token:string = jwt.sign({_id: savedUser._id}, SECRET_KEY || 'tokentest');
    return { statusCode: 201, message: 'Ok', data: savedUser, token };
  } catch(err) {
    throw boom.internal();
  }
}

export const login = async (userData: User): Promise<ResponseData> => {
  const {email, password} = userData;
  try {
    const user = await UserModel.findOne({email});
    if (!user) throw boom.badRequest('Email is incorrect');
    const correctPassword = await user.validatePassword(password);
    if (!correctPassword) throw boom.badRequest('Invalid is incorrect');
    const token: string = jwt.sign({_id: user._id}, SECRET_KEY || 'tokentest', {
      expiresIn: 60 * 60 * 24
    });
    return { statusCode: 200, message: 'Ok', data: user, token };
  } catch(err) {
    throw boom.internal();
  }
}

export const getUserProfile = async (id: string): Promise<ResponseData> => {
  try {
    const user = await UserModel.findById(id, {password: 0});
    if (!user) throw boom.badRequest('No user found');
    return { statusCode: 200, message: 'Ok', data: user };
  } catch(err) {
    throw boom.internal();
  }
}
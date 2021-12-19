import UserModel, { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { ResponseData } from '../interface/response.interface';

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (userData: User): Promise<ResponseData> => {
  console.log('register')
  const user: User = new UserModel(userData);
  try {
    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();
    const token:string = jwt.sign({_id: savedUser._id}, SECRET_KEY || 'tokentest');
    return { statusCode: 201, message: 'Ok', user: savedUser, token };
  } catch(err) {
    console.log('Err', err);
    return { statusCode: 500, message: 'Err', err };
  }
}

export const login = async (userData: User): Promise<ResponseData> => {
  const {email, password} = userData;
  try {
    const user = await UserModel.findOne({email});
    // if (!user) return res.status(400).json('Email is incorrect');
    if (!user)  return { statusCode: 400, message: 'Email is incorrect', user: {}, token: '', err: null };
    const correctPassword = await user.validatePassword(password);
    // if (!correctPassword) return res.status(400).json('Invalid password');
    if (!correctPassword)  return { statusCode: 400, message: 'Invalid password', user: {}, token: '', err: null };
    const token: string = jwt.sign({_id: user._id}, SECRET_KEY || 'tokentest', {
      expiresIn: 60 * 60 * 24
    });
    return { statusCode: 200, message: 'ok', user, token };
  } catch(err) {
    return { statusCode: 500, message: 'Err', err };
  }
}

export const getProfile = async (id: string): Promise<ResponseData> => {
  try {
    const user = await UserModel.findById(id, {password: 0});
    if (!user)  return { statusCode: 404, message: 'No user found', user: {}, token: '', err: null };
    return { statusCode: 200, message: 'ok', user };
  } catch(err) {
    return { statusCode: 500, message: 'Err', err };
  }
}
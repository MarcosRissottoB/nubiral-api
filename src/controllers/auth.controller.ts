import { Request, Response} from 'express';
import UserModel, { User } from '../models/User';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export const signup = async (req: Request, res: Response) => {
  const {username, email, password} = req.body;
  const user: User = new UserModel({
    username, email, password
  })
  try {
    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();
    const token:string = jwt.sign({_id: savedUser._id}, SECRET_KEY || 'tokentest');
    res.status(201).header('auth', token).json(savedUser);
  } catch(err) {
    console.log('Signup', err);
  }
}

export const signin = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  try {
    const user = await UserModel.findOne({email});
    if (!user) return res.status(400).json('Email is incorrect');
    const correctPassword = await user.validatePassword(password);
    if (!correctPassword) return res.status(400).json('Invalid password');
    const token: string = jwt.sign({_id: user._id}, SECRET_KEY || 'tokentest', {
      expiresIn: 60 * 60 * 24
    });
    res.status(200).header('auth', token).json(user);
  } catch(err) {
    console.log('Signin', err);
  }
}

export const profile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId, {password: 0});
    if (!user) return res.status(404).json('No user found');
    res.json(user);
  } catch(err) {
    console.log('Profile', err);
  }
}
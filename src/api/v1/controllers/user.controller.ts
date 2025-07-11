import md5 from "md5";
import User from "../models/user.model";
import { Request, Response } from "express";
import * as generateHelper from "../../../helpers/generate";

export const register = async (req: Request, res: Response) : Promise<void> => {
    try {
       req.body.password = md5(req.body.password);
       const exitsEmail = await User.findOne({
         email: req.body.email,
         deleted: false,
       });
       if (exitsEmail) {
         res.status(400).json({ message: "Email đã tồn tại" });
         return ;
       }
       req.body.token = generateHelper.generateToken();
       const newUser = new User(req.body );
       await newUser.save();
       const token = newUser.token;
       res.cookie("token", token, { httpOnly: true });
       res.json({
         code: 200,
         message: "Đăng ký tài khoản thành công",
         token: token,
       });
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Lỗi server" });
     }
} 

export const login = async (req: Request, res: Response) : Promise<void> => {
  try {
    const user = await User.findOne({ email: req.body.email, deleted: false });
    if (!user) {
      res.status(400).json({ message: "Tài khoản không tồn tại" });
      return ;
    }
    if (user.password !== md5(req.body.password)) {
      res.status(400).json({ message: "Sai mật khẩu" });
      return ;
    }
    const token = user.token;
    res.cookie("token", token, { httpOnly: true });
    res.json({ code: 200, message: "Login thành công", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
}

export const detail = async (req: Request, res: Response) : Promise<void> => {
  //  Cách 1
  try {
    res.json({
      code: 200,
      message: "Thành công",
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
}
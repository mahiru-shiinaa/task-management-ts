import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";
export const requireAuth = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const token : string = req.cookies.token;

    const user  = await User.findOne({ token: token, deleted: false }).select(
      "-password -token"
    ); 

    if (!user) {
      res
        .status(401)
        .json({ Code: 400, message: "Tài khoản không hợp lệ" });
        return ;
    }

    // Gắn user vào req để các middleware sau dùng
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

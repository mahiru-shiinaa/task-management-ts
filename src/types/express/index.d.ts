import { UserDocument } from "@models/user.model"; // hoặc kiểu user bạn đang sử dụng

declare module "express-serve-static-core" {
  interface Request {
    user?: UserDocument; // Kiểu của user, có thể là Document, IUser,... tùy vào model của bạn
  }
}

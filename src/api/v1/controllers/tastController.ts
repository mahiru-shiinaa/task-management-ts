import { Request, Response } from "express";
import Task from "@models/task.model";

export const index = async (req: Request, res: Response): Promise<void> => {
     const tasks = await Task.find({deleted: false});
  res.json(tasks);
}

export const detail = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const tasks = await Task.findOne({deleted: false, _id: id});
  res.json(tasks);
}
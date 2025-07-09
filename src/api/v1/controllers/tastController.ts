import { Request, Response } from "express";
import Task from "@models/task.model";
import paginationHelper from "@helpers/pagination";
import searchHelper from "@helpers/search";


export const index = async (req: Request, res: Response): Promise<void> => {
  const find: Record<string, any> = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status.toString();
  }

  // Sort
  const sort: Record<string, any> = {};
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toString();
    sort[sortKey] = req.query.sortValue;
  }
  const countTask = await Task.countDocuments(find);
  // Phân trang
  let objectPagination = paginationHelper(
    {
      limitItem: 2,
      currentPage: 1,
    },
    req.query,
    countTask
  );

  //search 
    // Tìm kiếm
    const objectSearch = searchHelper(req.query);
  
    if (objectSearch.regex) {
      find.title = objectSearch.regex;
    }
    //end search


  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip || 0);
  res.json(tasks);
};

export const detail = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const tasks = await Task.findOne({ deleted: false, _id: id });
  res.json(tasks);
};

export const changeStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedTask) {
      res.status(404).json({ message: "Không tìm thấy task" });
      return;
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const changeMulti = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids, key, value } = req.body;

    switch (key) {
      case "status": {
        const updatedTasks = await Task.updateMany(
          { _id: { $in: ids } },
          { status: value }
        );
        res.json(updatedTasks);
        return;
      }
      case "delete": {
        const deletedTasks = await Task.updateMany(
          { _id: { $in: ids } },
          { deleted: true, deletedAt: new Date() }
        );
        res.json({ message: "Xóa thành công!", result: deletedTasks });
        return;
      }
      default:
        res.status(404).json({ message: "Không tìm thấy task" });
        return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};




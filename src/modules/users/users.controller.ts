import { Request, Response } from "express";
import { serviceUsers } from "./users.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await serviceUsers.getAllUser();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updatedUser = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user;
    const updateUserId = req.params.id;

    if (!loggedInUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      loggedInUser.role === "customer" &&
      loggedInUser.id !== Number(updateUserId)
    ) {
      return res.status(403).json({
        success: false,
        message: "Customers can update only their own profile",
      });
    }

    if (loggedInUser.role === "customer" && req.body.role) {
      delete req.body.role;
    }

    const result = await serviceUsers.updatedUser(
      req.body,
      updateUserId as string
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Updated Successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await serviceUsers.deleteUser(req.params.id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const controllerUsers = {
  getAllUser,
  updatedUser,
  deleteUser,
};

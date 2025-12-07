import { Request, Response } from "express";
import { vehiclesService } from "../vehicles/vehicles.service";
import { bookingsServices } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first",
      });
    }

    const { vehicle_id, rent_start_date, rent_end_date } = req.body;

    const vehicle = await vehiclesService.getSingleVehicle(vehicle_id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    const total_price = days * Number(vehicle.rows[0].daily_rent_price);

    const customer_id =
      req.user.role === "customer" ? req.user.id : req.body.customer_id;

    const result = await bookingsServices.createBooking(
      { ...req.body, customer_id },
      total_price
    );

    await vehiclesService.updateVehicleStatus(vehicle_id, "booked");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        ...result.rows[0],
        vehicle: {
          vehicle_name: vehicle.rows[0].vehicle_name,
          daily_rent_price: vehicle.rows[0].daily_rent_price,
        },
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    let result;

    if (user.role === "admin") {
      result = await bookingsServices.getAllBookings();

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });
      }

      const formatted = result.rows.map((b) => ({
        id: b.id,
        customer_id: b.customer_id,
        vehicle_id: b.vehicle_id,
        rent_start_date: b.rent_start_date,
        rent_end_date: b.rent_end_date,
        total_price: b.total_price,
        status: b.status,
        customer: {
          name: b.customer_name,
          email: b.customer_email,
        },
        vehicle: {
          vehicle_name: b.vehicle_name,
          registration_number: b.registration_number,
        },
      }));

      return res.status(200).json({
        success: true,
        message: "Bookings retrieved successfully",
        data: formatted,
      });
    } else {
      result = await bookingsServices.getBookingsByCustomer(user.id);

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });
      }

      const formatted = result.rows.map((b) => ({
        id: b.id,
        vehicle_id: b.vehicle_id,
        rent_start_date: b.rent_start_date,
        rent_end_date: b.rent_end_date,
        total_price: b.total_price,
        status: b.status,
        vehicle: {
          vehicle_name: b.vehicle_name,
          registration_number: b.registration_number,
          type: b.type,
        },
      }));

      return res.status(200).json({
        success: true,
        message: "Your bookings retrieved successfully",
        data: formatted,
      });
    }
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const bookingId = Number(req.params.id);
    const { status } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const role = req.user.role;
    const userId = req.user.id;

    const result = await bookingsServices.updateBookingStatusService(
      bookingId,
      status,
      role,
      userId
    );

    if (status === "cancelled") {
      return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: result.booking,
      });
    }

    if (status === "returned") {
      return res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: {
          ...result.booking,
          vehicle: result.vehicle,
        },
      });
    }
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingsControls = {
  createBooking,
  getAllBookings,
  updateBookingStatus,
};

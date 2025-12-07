import { pool } from "../../config/db";

const createBooking = async (
  payload: Record<string, unknown>,
  total_price: number
) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const result = await pool.query(
    `INSERT INTO bookings 
       (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
       VALUES($1, $2, $3, $4, $5, 'active')
       RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  return result;
};

const getAllBookings = async () => {
  const result = await pool.query(`
    SELECT 
      b.id, b.customer_id, b.vehicle_id, 
      b.rent_start_date, b.rent_end_date, 
      b.total_price, b.status,
      u.name AS customer_name, u.email AS customer_email,
      v.vehicle_name, v.registration_number
    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
    ORDER BY b.id DESC
  `);
  return result;
};

const getBookingsByCustomer = async (id: number) => {
  const result = await pool.query(
    `
    SELECT 
      b.id, b.vehicle_id,
      b.rent_start_date, b.rent_end_date,
      b.total_price, b.status,
      v.vehicle_name, v.registration_number, v.type
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id
    WHERE b.customer_id = $1
    ORDER BY b.id DESC
    `,
    [id]
  );
  return result;
};

const updateBookingStatusService = async (
  bookingId: number,
  status: "cancelled" | "returned",
  role: "admin" | "customer",
  userId: number
) => {
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [
    bookingId,
  ]);

  if (bookingRes.rows.length === 0) {
    throw new Error("Booking not found");
  }

  const booking = bookingRes.rows[0];

  if (role === "customer") {
    if (booking.customer_id !== userId) {
      throw new Error("You are not allowed to update this booking");
    }
    if (status !== "cancelled") {
      throw new Error("Customers can only cancel bookings");
    }
  }

  if (role === "admin") {
    if (status !== "returned") {
      throw new Error("Admin can only mark booking as returned");
    }
  }

  const updatedBooking = await pool.query(
    `
    UPDATE bookings SET status = $1 WHERE id = $2 RETURNING * `,
    [status, bookingId]
  );

  let vehicleUpdate = null;

  if (role === "admin" && status === "returned") {
    const v = await pool.query(
      `UPDATE vehicles SET availability_status = 'available' WHERE id = $1 RETURNING availability_status`,
      [booking.vehicle_id]
    );

    vehicleUpdate = v.rows[0];
  }

  return {
    booking: updatedBooking.rows[0],
    vehicle: vehicleUpdate,
  };
};

export const bookingsServices = {
  createBooking,
  getAllBookings,
  getBookingsByCustomer,
  updateBookingStatusService,
};

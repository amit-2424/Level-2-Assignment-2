import { Router } from "express";
import { bookingsControls } from "./bookings.controller";
import auth from "../../middlewhere/auth";

const router = Router();

router.post("/", auth("admin", "customer"), bookingsControls.createBooking);
router.get("/", auth("admin", "customer"), bookingsControls.getAllBookings);
router.put(
  "/:id",
  auth("admin", "customer"),
  bookingsControls.updateBookingStatus
);

export const bookingRouter = router;

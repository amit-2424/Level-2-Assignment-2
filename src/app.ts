import express, { Request, Response } from "express";
import { authRouter } from "./modules/auth/auth.route";
import initDB from "./config/db";
import { vehiclesRouter } from "./modules/vehicles/vehicles.route";
import { userRouter } from "./modules/users/users.route";
import { bookingRouter } from "./modules/bookings/bookings.route";

const app = express();

// init DB
initDB();

// body parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Developers");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vehicles", vehiclesRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookings", bookingRouter);

export default app;

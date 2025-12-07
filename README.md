#Project Name: Vehicle Rental Management System
#Live Demo: [https://your-live-url.com](https://l2a2-kappa.vercel.app/)
#GitHub Repository: [https://github.com/your-repo-link](https://github.com/amit-2424/Level-2-Assignment-2)

A complete vehicle rental management system built using Node.js, Express.js, PostgreSQL, and JWT authentication.
This project supports admin and customer roles with secure booking management.

⭐ Features
🔐 Authentication & Roles

JWT-based login & registration

Role-based access control

Admin can manage vehicles & bookings

Customers can browse and rent vehicles

🚘 Vehicle Management

Add / Update / Delete vehicles (Admin only)

Vehicle availability tracking (available / booked)

Price validation with PostgreSQL constraints

📅 Booking System

Book a vehicle with date validation

Prevent double-booking

Admin can view all bookings

Customer can only view own bookings

🗄️ Database (PostgreSQL)

Secure schema with constraints

Numeric pricing

Enum-like validation using CHECK

⚙️ Technologies Used

Backend: Node.js, Express.js

Database: PostgreSQL, pg

Auth: JWT, bcrypt

Validation: Zod / Joi / Custom middleware

Deployment: Render / Vercel / Railway

🛠️ Setup Instructions
1️⃣ Clone the Repository
git clone [https://github.com/your-repo-link.git](https://github.com/amit-2424/Level-2-Assignment-2)
cd your-project

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file:

PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=yourSecretKey

4️⃣ Run Database Migration

(If you used SQL files or auto-sync)

npm run migrate

5️⃣ Start the Server
npm run dev


Server will run at:
👉 http://localhost:5000/

📌 API Endpoints Overview
🔐 Auth
POST /api/auth/register
POST /api/auth/login

🚘 Vehicles
GET    /api/vehicles         (public)
POST   /api/vehicles         (admin)
PUT    /api/vehicles/:id     (admin)
DELETE /api/vehicles/:id     (admin)

📅 Bookings
POST   /api/bookings         (customer)
GET    /api/bookings         (admin only)
GET    /api/bookings/my      (customer only)

🌍 Deployment

You can deploy on:

Render

Railway

Vercel (backend serverless)

DigitalOcean

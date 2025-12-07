🚗#Project Name: Vehicle Rental Management System

🔗#Live Demo: [https://your-live-url.com](https://l2a2-kappa.vercel.app/)

📂#GitHub Repository: [https://github.com/your-repo-link](https://github.com/amit-2424/Level-2-Assignment-2)

A complete Vehicle Rental Management System built using Node.js, Express.js, PostgreSQL, and JWT Authentication with dedicated Admin and Customer roles.

This project provides secure booking, vehicle management, and smooth role-based operations.

✨ Features
🔐 Authentication & Roles

JWT-based secure login & signup

Role-based access (Admin / Customer)

Admin: Manage vehicles & all bookings

Customer: Browse vehicles & create bookings

🚘 Vehicle Management

Add / Update / Delete vehicles (Admin only)

Track vehicle availability (available / booked)

Automatic validations

PostgreSQL constraints for data safety

📅 Booking Management

Book vehicles with date validation

Auto price calculation

Prevent double bookings

Admin → view all bookings

Customer → view only their own bookings

🗄️ Database (PostgreSQL)

Well-structured relational schema

NUMERIC(10,2) price handling

Enum-like validation using CHECK constraints

Strong foreign key rules

⚙️ Tech Stack
Layer	Technology
Backend	Node.js, Express.js
Database	PostgreSQL, pg
Authentication	JWT, bcrypt
Validation	Zod / Joi / Custom Middleware
Deployment	Render / Railway / Vercel
🛠️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-repo-link.git
cd your-project

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a .env file in project root:

PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=yourSecretKey

4️⃣ Run Database Migration

(If you added SQL migration files)

npm run migrate

5️⃣ Start the Server
npm run dev


Server will run at:
👉 http://localhost:5000/

📌 API Endpoint Overview
🔐 Authentication
Method	Endpoint	Description
POST	/api/v1/auth/register	Register user
POST	/api/v1/auth/login	Login and receive JWT
🚘 Vehicles
Method	Endpoint	Access
GET	/api/v1/vehicles	Public
POST	/api/v1/vehicles	Admin
PUT	/api/v1/vehicles/:id	Admin
DELETE	/api/v1/vehicles/:id	Admin
📅 Bookings
Method	Endpoint	Access
POST	/api/v1/bookings	Customer
GET	/api/v1/bookings	Admin
GET	/api/v1/bookings/my	Customer
🌍 Deployment Options

You can deploy the backend easily using:

🔵 Render

🚆 Railway

▲ Vercel (Serverless Functions)

🟣 DigitalOcean Apps

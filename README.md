### 🚗#Project Name: Vehicle Rental Management System

### 🔗#Live Demo: [https://your-live-url.com](https://l2a2-kappa.vercel.app/)

### 📂#GitHub Repository: [https://github.com/your-repo-link](https://github.com/amit-2424/Level-2-Assignment-2)

---

## 📘 Overview

The **Vehicle Rental Management System** is a full-stack application designed to manage vehicle rentals efficiently.  
It includes **user authentication**, **role-based access**, **vehicle management**, **booking creation**, **automatic price calculation**, and **real-time vehicle availability updates**.

---

## ⭐ Features

### 🔐 Authentication & Authorization
- Secure login using **JWT**
- Role-based access (**Admin & Customer**)

### 🚘 Vehicle Management
- Add, update, delete vehicles (Admin)
- View all vehicles
- Automatic availability updates (**available / booked**)

### 📅 Booking Management
- Create bookings with automatic price calculation
- Admin can view all bookings
- Customers can view only their own bookings
- Customers can cancel bookings
- Admin can mark vehicles as **returned**

### 👤 Customer Features
- Book vehicles
- View own bookings
- Cancel bookings

### 🛠️ Admin Features
- Manage vehicles
- View all bookings
- Update booking status

---

## 🧰 Technology Stack

### 🔙 Backend
- Node.js  
- Express.js  
- TypeScript  
- PostgreSQL  
- JWT Authentication  
- Bcrypt  
- `pg` PostgreSQL library  

### 🏗️ Architecture
-  API  
- Modulear Pattern  

---

### Githu repository

git clone [https://github.com/YOUR_REPO_URL.git](https://github.com/amit-2424/Level-2-Assignment-2)

🚀 Usage Instructions
🔑 1. Register or Login

You will receive a JWT token.

🛡️ 2. Use Authorization Header
Authorization: Bearer <token>

📌 Main API Endpoints
🔐 Authentication

POST /api/v1/auth/signup

POST /api/v1/auth/login

🚘 Vehicles
```
GET /api/v1/vehicles

POST /api/v1/vehicles (Admin)

PUT /api/v1/vehicles/:id (Admin)

DELETE /api/v1/vehicles/:id (Admin)
```
📅 Bookings
```
POST /api/v1/bookings

GET /api/v1/bookings (Admin)

GET /api/v1/bookings/my (Customer)

PUT /api/v1/bookings/:id
```
📁 Codebase Structure
```
src/
 ┣ routes/
 ┣ controllers/
 ┣ services/
 ┣ middleware/
 ┣ utils/
 ┣ config/
 ┗ app.ts
```
🌍 Deployment Options

You can deploy the backend easily using:

🔵 Render

🚆 Railway

▲ Vercel (Serverless Functions)

🟣 DigitalOcean Apps

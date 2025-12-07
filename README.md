### 🚗#Project Name: Vehicle Rental Management System

### 🔗#Live Demo: [https://your-live-url.com](https://l2a2-kappa.vercel.app/)

### 📂#GitHub Repository: [https://github.com/your-repo-link](https://github.com/amit-2424/Level-2-Assignment-2)

## 🎯 Project Overview

A backend API for a complete **Vehicle Rental Management System** that manages:

- 🚘 **Vehicles** – Inventory with availability status  
- 👤 **Users** – Admin & Customer authentication  
- 📅 **Bookings** – Rent vehicles with date validation & price calculation  
- 🔐 **Secure Access** – JWT-based role validation (Admin & Customer)

This system ensures clean architecture, modular design, and scalable backend performance.

---

## 🛠️ Technology Stack

- **Node.js** + **TypeScript**
- **Express.js**
- **PostgreSQL**
- **pg** (PostgreSQL Client)
- **bcrypt** (Password Hashing)
- **jsonwebtoken** (JWT Auth)
- **Custom Middlewares**

---

## 📁 Code Structure

src/
├── modules/

│ ├── auth/

│ ├── users/

│ ├── vehicles/

│ ├── bookings/

│
├── middleware/

├── utils/

├── app.ts

└── server.ts

yaml
Copy code

Each module contains:
- Routes  
- Controller  
- Service  
- Validation  
- Database operations  

---

## 📊 Database Tables

### 🧑‍💼 Users Table
| Field | Description |
|-------|-------------|
| id | Serial Primary Key |
| name | Required |
| email | Unique, lowercase enforced |
| password | Min 6 characters |
| phone | Required |
| role | `'admin'` or `'customer'` |

---

### 🚘 Vehicles Table
| Field | Description |
|-------|-------------|
| id | Serial Primary Key |
| vehicle_name | Required |
| type | `'car'`, `'bike'`, `'van'`, `'SUV'` |
| registration_number | Unique |
| daily_rent_price | Positive Numeric |
| availability_status | `'available'` or `'booked'` |

---

### 📅 Bookings Table
| Field | Description |
|-------|-------------|
| id | Serial Primary Key |
| customer_id | FK → Users(id) |
| vehicle_id | FK → Vehicles(id) |
| rent_start_date | Required |
| rent_end_date | Must be after start date |
| total_price | Auto-calculated |
| status | `'active'`, `'cancelled'`, `'returned'` |

---

## 🔐 Authentication & Authorization

### User Roles
- **Admin**
  - Manage all vehicles  
  - View all bookings  
  - Manage all users  
- **Customer**
  - View vehicles  
  - Create bookings  
  - View only own bookings  

### Authentication Flow
1. User registers via `/api/v1/auth/signup`
2. Login via `/api/v1/auth/signin`
3. Server returns JWT token
4. Token must be sent in header:  
Authorization: Bearer <token>

pgsql
Copy code
5. Middleware validates token + role permissions

Unauthorized → **401**  
Forbidden → **403**

---

## 🌐 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/auth/signup` | Public | Register new user |
| POST | `/api/v1/auth/signin` | Public | Login & get JWT |

---

### 🚘 Vehicles API
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/vehicles` | Admin | Create new vehicle |
| GET | `/api/v1/vehicles` | Public | List all vehicles |
| GET | `/api/v1/vehicles/:vehicleId` | Public | View single vehicle |
| PUT | `/api/v1/vehicles/:vehicleId` | Admin | Update vehicle info |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin | Delete vehicle |

---

### 🧑‍💼 Users API
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/users` | Admin | Get all users |
| PUT | `/api/v1/users/:userId` | Admin / Self | Admin: update any user<br>Customer: update own profile |
| DELETE | `/api/v1/users/:userId` | Admin | Delete user |

---

### 📅 Bookings API
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/bookings` | Customer / Admin | Create a booking & auto-calc price |
| GET | `/api/v1/bookings` | Admin | View all bookings |
| GET | `/api/v1/bookings/my` | Customer | View own bookings |
| PUT | `/api/v1/bookings/:id/return` | Customer/Admin | Return vehicle |
| PUT | `/api/v1/bookings/:id/cancel` | Customer/Admin | Cancel booking |

---

🌍 Deployment Options

You can deploy the backend easily using:

🔵 Render

🚆 Railway

▲ Vercel (Serverless Functions)

🟣 DigitalOcean Apps

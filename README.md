# ✈️ Vizier Airways - Flight Booking System

A full-stack web application for airline ticket booking, built with **Next.js** (frontend) and **Node.js/Express** (backend).

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Testing](#testing)
- [Deployment](#deployment)
- [Team Members](#team-members)
- [License](#license)

---

## ✨ Features

### For Users:
- 👤 **User Authentication** - Register and login with JWT-based authentication
- ✈️ **Flight Search** - Search flights by route (from/to), date, and class
- 🎫 **Flight Booking** - Select cabin class and add multiple passengers
- 💳 **Secure Payment** - Process payments with card validation (Luhn algorithm)
- 📋 **Booking Management** - View, cancel, and manage bookings
- 👥 **User Profile** - Update personal information
- ✉️ **Email Notifications** - Receive booking confirmations and e-tickets via email
- ❓ **FAQ Page** - Frequently asked questions and support information

### For Administrators:
- 👥 **User Management** - View all registered users
- ✈️ **Flight Management** - Add single or bulk flights
- 📊 **Booking Analytics** - View all bookings and statistics
- 🔐 **Role-Based Access Control (RBAC)** - Admin-only features and routes

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Validation**: React Hook Form + Zod
- **HTTP Client**: Fetch API
- **Icons**: Lucide React
- **Notifications**: React Toastify

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with HTTP-only cookies
- **Password Hashing**: bcryptjs
- **Validation**: Joi
- **Email Service**: Nodemailer (Gmail SMTP)
- **Package Manager**: pnpm

---

## 🏗️ Project Structure

```
Vizier Airways/
├── backend/
│   ├── app/
│   │   ├── config/          # Configuration (DB, email)
│   │   ├── controllers/     # Request handlers
│   │   ├── middlewares/     # Auth, validation, admin
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── validations/     # Joi validation schemas
│   ├── app.js               # Express entry point
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── app/                 # Next.js app directory
│   │   ├── page.tsx         # Home page
│   │   ├── auth/            # Login/Register
│   │   ├── profile/         # User profile
│   │   ├── mybookings/      # User bookings list
│   │   ├── bookings/        # Booking creation
│   │   ├── payment/         # Payment page
│   │   ├── admin/           # Admin panel
│   │   └── globals.css      # Global styles
│   ├── features/            # React components
│   │   ├── Search/          # Flight search
│   │   ├── Header/          # Navigation
│   │   └── FlightResults/   # Flight list
│   ├── shared/              # Shared resources
│   │   ├── api/             # API hooks
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utilities
│   │   ├── store/           # Zustand stores
│   │   └── ui/              # UI components
│   ├── widgets/             # Complex components
│   ├── public/              # Static files
│   ├── package.json
│   └── README.md
│
├── package.json             # Root package.json
├── pnpm-workspace.yaml      # pnpm workspace config
└── README.md                # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** >= 18.0.0
- **MongoDB** >= 5.0.0 (or MongoDB Atlas account)
- **pnpm** (recommended) or npm

### 1. Clone the Repository

```bash
git clone https://github.com/coonfituuree/backend-finalProject
cd vizier-airways
```

### 2. Install Dependencies

Install all dependencies for both frontend and backend:

```bash
pnpm install
```

Or install separately:

```bash
# Backend
cd backend
pnpm install

# Frontend
cd ../frontend
pnpm install
```

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database (MongoDB Atlas or local)
MONGO_PUBLIC_URI=mongodb+srv://username:password@cluster.mongodb.net/vizier-airways?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-use-long-random-string

# Email Configuration (Gmail SMTP)
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SENDER_EMAIL=your-email@gmail.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

**Gmail Setup for Email Service:**
1. Enable 2-factor authentication on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate a new app password
4. Use this app password in `SMTP_PASSWORD`

### Frontend (.env)

Create a `.env` file in the `frontend/` directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

## ▶️ Running the Application

### Development Mode

Run both frontend and backend concurrently:

```bash
# From root directory
pnpm dev
```

Or run separately:

```bash
# Backend only
pnpm dev:backend

# Frontend only
pnpm dev:frontend
```

### Production Build

```bash
# Frontend
cd frontend
pnpm build
pnpm start

# Backend
cd backend
pnpm start
```

**Access Points:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000/api`

---

## 📡 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/logout` | User logout | No |
| POST | `/auth/is-auth` | Check authentication | Yes |
| POST | `/auth/send-verify-otp` | Send email verification OTP | Yes |
| POST | `/auth/verify-account` | Verify email with OTP | Yes |
| POST | `/auth/send-reset-otp` | Send password reset OTP | No |
| POST | `/auth/reset-password` | Reset password with OTP | No |

### Flight Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/flights/getAllRoutes` | Get all available flights | No |
| POST | `/flights/getFlightByRoute` | Search flights by route | No |

### Booking Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/bookings` | Create new booking | Yes |
| GET | `/bookings/me` | Get current user's bookings | Yes |
| GET | `/bookings/:id` | Get booking by ID | Yes |
| PATCH | `/bookings/:id/cancel` | Cancel booking | Yes |

### Payment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/payments/pay` | Process payment for booking | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/user/profile` | Get current user profile | Yes |
| PUT | `/user/update` | Update user profile | Yes |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/users` | Get all users | Admin |
| POST | `/admin/flight/add` | Add single flight | Admin |
| POST | `/admin/flight/add/bulk` | Add multiple flights (JSON array) | Admin |
| GET | `/admin/flights` | Get all flights | Admin |
| GET | `/admin/bookings/all` | Get all bookings | Admin |

### Example API Requests

#### Register User
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "Password123!",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+77001234567"
  }'
```

#### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

#### Search Flights
```bash
curl -X POST http://localhost:4000/api/flights/getFlightByRoute \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Almaty",
    "to": "Astana"
  }'
```

#### Create Booking
```bash
curl -X POST http://localhost:4000/api/bookings \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "flightId": "507f1f77bcf86cd799439012",
    "cabinClass": "economy",
    "passengers": [{
      "firstName": "John",
      "lastName": "Doe",
      "gender": "male"
    }]
  }'
```

---

## 🗄️ Database Schema

### Collections Overview

The application uses 4 main MongoDB collections:

1. **users** - User accounts and authentication
2. **flights** - Flight routes and schedules
3. **bookings** - Flight bookings and passengers
4. **payments** - Payment transactions

### Database Relations

```
┌─────────┐         ┌──────────┐         ┌─────────┐
│  User   │────────>│ Booking  │────────>│ Flight  │
└─────────┘  1:N    └──────────┘   N:1   └─────────┘
     │                    │
     │                    │ 1:1
     │                    v
     │              ┌─────────┐
     └─────────────>│ Payment │
          1:N       └─────────┘
```

### User Schema

```javascript
{
  username: String (required, unique, 6-12 alphanumeric),
  email: String (required, unique),
  password: String (required, bcrypt hashed),
  firstName: String (required),
  lastName: String (required),
  phoneNumber: String (required, 10-15 digits),
  role: String (enum: ["user", "admin"], default: "user"),
  
  // Email verification
  verifyOtp: String,
  verifyOtpExpireAt: Number,
  isAccountVerified: Boolean (default: false),
  
  // Password reset
  resetOtp: String,
  resetOtpExpireAt: Number,
  
  createdAt: Date (auto-generated)
}
```

### Flight Schema

```javascript
{
  from: String (required, city name),
  fromAirport: String (required),
  fromAirportAbbreviation: String (required, 3 letters),
  to: String (required, city name),
  toAirport: String (required),
  toAirportAbbreviation: String (required, 3 letters),
  operatedBy: String (required, airline name),
  flightNumber: String (required),
  airplaneType: String (required),
  departureTime: String (required, "HH:mm"),
  departureDate: String (required, "YYYY-MM-DD"),
  arrivalTime: String (required, "HH:mm"),
  arrivalDate: String (required, "YYYY-MM-DD"),
  flightDuration: String (required, e.g., "2h 30m"),
  numberOfTransfers: String (required, "0" for direct),
  economyPrice: Number (required, price in KZT),
  businessPrice: Number (required, price in KZT),
  createdAt: Date (auto-generated)
}
```

### Booking Schema

```javascript
{
  user: ObjectId (ref: "user", required),
  flight: ObjectId (ref: "flight", required),
  
  passengers: [{
    firstName: String (required),
    lastName: String (required),
    gender: String (enum: ["male", "female"], required)
  }],
  
  cabinClass: String (enum: ["economy", "business"], required),
  pricePerPassenger: Number (required),
  totalPrice: Number (required),
  status: String (enum: ["pending", "confirmed", "cancelled"], default: "pending"),
  
  payment: ObjectId (ref: "payment"),
  pnr: String (required, unique, 6-char alphanumeric),
  email: String (required),
  
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Payment Schema

```javascript
{
  booking: ObjectId (ref: "booking", required, unique),
  user: ObjectId (ref: "user", required),
  
  amount: Number (required),
  currency: String (default: "KZT"),
  
  cardLast4: String (required, last 4 digits),
  expMonth: Number (required, 1-12),
  expYear: Number (required, 2025-2100),
  
  status: Boolean (default: false, true = paid),
  
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

---

## 📸 Screenshots

### 1. Home Page - Flight Search
*(Screenshot: Home page with search form showing departure/arrival cities, dates, and class selection)*

![Home Page](docs/home.png)

### 2. Flight Results
*(Screenshot: List of available flights with prices, times, and booking buttons)*

![Flight Results](docs/flights.png)

### 3. Login / Register Page
*(Screenshot: Authentication page with login and register forms)*

![Auth Page](docs/auth.png)

### 4. Booking Page
*(Screenshot: Booking form with passenger details and cabin class selection)*

![Booking Page](docs/booking.png)

### 5. Payment Page
*(Screenshot: Payment form with card details and booking summary)*

![Payment Page](docs/payment.png)

### 6. Payment Success Modal
*(Screenshot: Success modal showing PNR, flight details, and confirmation)*

![Success Modal](docs/success.png)

### 7. My Bookings Page
*(Screenshot: List of user's bookings with statuses and details)*

![My Bookings](docs/mybooking.png)

### 8. User Profile Page
*(Screenshot: User profile with personal information and edit option)*

![Profile Page](docs/profile.png)

### 9. Admin Panel - Users
*(Screenshot: Admin view of all users with roles and verification status)*

![Admin Users](docs/admin.png)

### 10. Admin Panel - Add Flight
*(Screenshot: Admin form for adding single or multiple flights)*

![Admin Add Flight](docs/addbookings.png)

### 11. Admin Panel - All Bookings
*(Screenshot: Admin view of all bookings across all users)*

![Admin Bookings](docs/allbookings.png)


---

## 🧪 Testing

### Test Data for Payment

Use these test card details for payment testing:

```
Card Number:  4111 1111 1111 1111
Expiry Month: 01-12 (any valid month)
Expiry Year:  25-99 (any future year)
CVV:          123 (any 3-digit code)
```

### Test Admin Account

To test admin features, create an admin user by:
1. Registering a normal user
2. Manually updating the `role` field in MongoDB to `"admin"`
3. Logging in with that user

### Sample Flight JSON for Bulk Import

```json
[
  {
    "from": "Almaty",
    "fromAirport": "Almaty International Airport",
    "fromAirportAbbreviation": "ALA",
    "to": "Astana",
    "toAirport": "Nursultan Nazarbayev International Airport",
    "toAirportAbbreviation": "NQZ",
    "operatedBy": "Air Astana",
    "flightNumber": "KC101",
    "airplaneType": "Boeing 767",
    "departureTime": "08:00",
    "departureDate": "2026-03-15",
    "arrivalTime": "10:30",
    "arrivalDate": "2026-03-15",
    "flightDuration": "2h 30m",
    "numberOfTransfers": "0",
    "economyPrice": 45000,
    "businessPrice": 95000
  }
]
```

---

## 🚀 Deployment

### Backend Deployment (Railway)

1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGO_PUBLIC_URI`
   - `JWT_SECRET`
   - `SMTP_USER`, `SMTP_PASSWORD`, `SENDER_EMAIL`
   - `FRONTEND_URL`
4. Build command: `pnpm install`
5. Start command: `pnpm start`

### Frontend Deployment (Vercel)

1. Import your GitHub repository
2. Framework preset: **Next.js**
3. Root directory: `frontend`
4. Environment variables:
   - `NEXT_PUBLIC_API_URL` (your deployed backend URL)
5. Deploy

### Database (MongoDB)

1. Database located on Railway servers

---

## 👥 Team Members

List all team members who contributed to this project:

1. **[Galym Bartay]** - Team Lead & Full Stack Developer


---

## 🔒 Security Features

- ✅ JWT authentication with HTTP-only cookies
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ Input validation using Joi
- ✅ Credit card validation (Luhn algorithm)
- ✅ CORS protection
- ✅ XSS protection through sanitized inputs
- ✅ SQL injection prevention (Mongoose)
- ✅ Email verification with OTP
- ✅ Password reset with time-limited OTP
- ✅ Role-based access control (RBAC)

---

## 📝 License

This project is created for educational purposes as part of a final project assignment.

**MIT License** - Feel free to use and modify for learning purposes.

---

## 🎯 Project Requirements Checklist

- [x] **Project Setup (5 points)**
  - [x] Node.js and Express backend
  - [x] Modular structure (routes, models, controllers, middleware)
  - [x] README.md with setup instructions, API docs, and screenshots

- [x] **Database (10 points)**
  - [x] MongoDB Atlas for storage
  - [x] Two main collections: User and Flight/Booking
  - [x] Connection URI in .env

- [x] **API Endpoints (15 points)**
  - [x] Authentication: POST /register, POST /login
  - [x] User Management: GET /profile, PUT /profile
  - [x] Resource Management: CRUD operations for bookings

- [x] **Authentication & Security (15 points)**
  - [x] JWT for authentication
  - [x] Protected endpoints with middleware
  - [x] bcrypt for password hashing
  - [x] Secret keys in .env

- [x] **Validation & Error Handling (5 points)**
  - [x] Input validation with Joi
  - [x] Meaningful error messages (400, 401, 404, 500)
  - [x] Global error handling middleware

- [x] **Frontend UI (10 points)**
  - [x] Responsive design (mobile & desktop)
  - [x] Readable color scheme with contrast
  - [x] Form validation
  - [x] All feature buttons functional

- [x] **Deployment (10 points)**
  - [x] Deployed to Vercel/Render
  - [x] Environment variables configured
  - [x] MongoDB Atlas connection

- [x] **Advanced Features**
  - [x] RBAC - Admin role with special access (5 points)
  - [x] SMTP Email Integration - Nodemailer with Gmail (5 points)

- [x] **Defence Preparation (20 points)**
  - [x] Team collaboration
  - [x] All members understand the system
  - [x] Ready to explain functionality and answer questions

---

**Version:** 1.0.0  
**Last Updated:** February 2026
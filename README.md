# HelpDesk Pro 🎫

A full-stack support ticket management system built with the MERN stack, featuring role-based access control, a real-time-feeling ticket workflow, and a polished, animated UI.

![Tech Stack](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![Tech Stack](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tech Stack](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

## 🔍 Overview

HelpDesk Pro is a support ticket platform where users can submit and track support requests, and admins can manage tickets and users across the entire system. It was built to demonstrate a complete, production-style authentication and authorization flow — not just a UI mockup, but a real backend enforcing real rules.

## ✨ Features

### Authentication
- Secure sign up / sign in with hashed passwords (bcrypt)
- JWT-based session persistence
- Protected routes on both frontend and backend
- Friendly, animated error and validation states

### Role-Based Access Control
Two roles, enforced server-side (not just hidden in the UI):

**User**
- Create, view, edit, and delete their own tickets
- Comment on their own tickets
- Cannot view or modify other users' tickets

**Admin**
- Full visibility into all tickets across all users
- Change ticket status and assignment
- Promote/demote users between `user` and `admin`
- Activate/deactivate user accounts
- Dashboard with live ticket and user statistics

### Ticketing System
- Create tickets with category and priority
- Threaded comments per ticket
- Status workflow: `Open → In Progress → Resolved → Closed`
- Filterable ticket lists

### UI/UX
- Custom purple + peach design system
- Smooth page transitions and micro-interactions (Framer Motion)
- Fully responsive across desktop, tablet, and mobile
- Loading, empty, and error states throughout
- Confirmation modals for destructive actions (logout, delete, deactivate)

## 🛠️ Tech Stack

**Frontend:** React (Vite), React Router, Axios, Framer Motion, CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas (Mongoose ODM)
**Auth:** JWT, bcrypt
**Validation:** express-validator

## 📂 Project Structure

```
helpdesk-pro/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── context/        # AuthContext (global auth state)
│       ├── pages/          # Route-level pages
│       └── services/       # Axios API layer
└── server/                 # Express backend
    ├── config/             # Database connection
    ├── controllers/        # Route handlers / business logic
    ├── middleware/         # Auth guards & validators
    ├── models/             # Mongoose schemas
    └── routes/             # API route definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster

### 1. Clone the repo
```bash
git clone https://github.com/your-username/helpdesk-pro.git
cd helpdesk-pro
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_random_secret_string
CLIENT_URL=http://localhost:5173
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../client
npm install
npm run dev
```

The app will be running at `http://localhost:5173`, with the API at `http://localhost:5000`.

### 4. Create an admin account
1. Sign up normally through the app.
2. In MongoDB Atlas, open the `users` collection and manually change that user's `role` field from `"user"` to `"admin"`.
3. Log out and log back in — you'll now have access to the Admin Dashboard.

> Admin roles are intentionally not self-selectable at signup — this prevents anyone from registering as an admin, which is a real security requirement, not just a demo limitation.

## 🔐 API Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Log in |
| GET | `/api/auth/me` | Authenticated | Get current user |
| GET | `/api/tickets` | Authenticated | Own tickets (admin: all tickets) |
| POST | `/api/tickets` | Authenticated | Create a ticket |
| GET | `/api/tickets/:id` | Authenticated | Ticket detail + comments |
| PUT | `/api/tickets/:id` | Owner or Admin | Update a ticket |
| DELETE | `/api/tickets/:id` | Owner or Admin | Delete a ticket |
| POST | `/api/tickets/:id/comments` | Owner or Admin | Add a comment |
| GET | `/api/users` | Admin only | List all users |
| PATCH | `/api/users/:id` | Admin only | Update role / active status |

## 🧪 Testing

A full manual QA checklist covering auth flows, role boundaries, CRUD operations, and responsive breakpoints was used during development — see `TESTING.md` if included, or the project's commit history for details.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋 Author

Built as a portfolio project demonstrating full-stack development with role-based authorization, real backend enforcement, and a polished, production-style UI.

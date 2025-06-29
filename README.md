🏸 CourtLink – Indoor Sports Facility Booking System
CourtLink is a full-featured indoor sports facility booking platform developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). This collaborative project was developed by a team of 5 and is structured around five robust sub-systems, each focused on delivering seamless user and administrative experiences.

https://github.com/user-attachments/assets/a8690d52-d869-489f-8a14-5bf619637403


https://github.com/user-attachments/assets/044d9cee-356f-49f0-8e9f-b2e941209889


https://github.com/user-attachments/assets/b3eb06e9-4543-41fc-8db7-6ca395875db8
![Screenshot 2025-06-29 142518](https://github.com/user-attachments/assets/cbc51137-2311-4e47-ac15-abc7067cfd1d)

![Screenshot 2025-06-29 142546](https://github.com/user-attachments/assets/2deb0694-78b0-493d-b1a2-c9a0e2433f39)

![Screenshot 2025-06-29 142327](https://github.com/user-attachments/assets/b3488982-a8fe-431b-901d-5c8af0d32148)

![Screenshot 2025-06-29 130431](https://github.com/user-attachments/assets/32b6b5d9-4dd8-4c3f-a63e-28a92cd7caa9)

![Screenshot 2025-06-29 130443](https://github.com/user-attachments/assets/b575f32f-7bfc-4f71-bd43-3fed2f351200)

![Screenshot 2025-06-29 130519](https://github.com/user-attachments/assets/b200382b-d4ad-490f-8a95-7f5e45285982)

![Screenshot 2025-06-29 130836](https://github.com/user-attachments/assets/745035d1-b2ec-4359-b0da-220499c69a2a)

![Screenshot 2025-06-29 130919](https://github.com/user-attachments/assets/3514ff9f-1284-4c67-8d80-4c0da46e7258)

![Screenshot 2025-06-29 130949](https://github.com/user-attachments/assets/5411d411-a165-48df-93df-56ab9b8f05c4)


🚀 Core Features
1. 👤 User Management
User registration and secure login (JWT-based authentication)

Profile creation and editing

Real-time booking of courts with calendar integration

Booking history tracking

2. 🛠️ Admin Management
Admin dashboard with full control over users, bookings, and facility management

Special Feature: IP Address Tracking for devices used in Review & Rating submissions

Advanced analytics and monitoring tools

System logs and activity tracking

3. ⭐ Review & Rating System - Dinuka Prathiraja
Users can rate facilities and leave feedback after booking

Admins can monitor reviews

Integrated with IP tracking for authenticity and moderation

4. 🏠 Owner Management
Court owners can register their facilities

Manage availability, pricing, and booking details

Track user engagement and booking analytics

5. 🔔 Notification Management
Email and in-app notifications for booking confirmations, updates, and reminders

Admin alerts for system activities

Owner notifications for new bookings and reviews

💡 Technologies Used
Frontend: React.js, Tailwind CSS / Bootstrap

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT, bcrypt

Device Tracking: IP-based identification system (under Admin Panel)

CourtLink_Booking/
├── server/                          # Backend API
│   ├── config/                      # Database and external service configs
│   ├── controllers/                 # Route handlers
│   │   ├── admin/                   # Admin-specific controllers
│   │   ├── owner/                   # Owner-specific controllers
│   │   └── user/                    # User-specific controllers
│   ├── middleware/                  # Custom middleware
│   │   ├── jwt/                     # Authentication middleware
│   │   ├── uploads/                 # File upload middleware
│   │   └── validators/              # Request validation
│   ├── models/                      # MongoDB schemas
│   ├── routes/                      # API routes
│   ├── utils/                       # Utility functions
│   └── server.js                    # Main server file
│
├── client/
│   ├── user/                        # User-facing React app
│   │   ├── src/
│   │   │   ├── components/          # Reusable UI components
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   ├── pages/               # Page components
│   │   │   ├── redux/               # State management
│   │   │   └── utils/               # Utility functions
│   │   └── package.json
│   │
│   └── owner/                       # Owner/Admin React app
│       ├── src/
│       │   ├── components/          # Admin/Owner components
│       │   ├── hooks/               # Custom hooks
│       │   ├── layouts/             # Layout components
│       │   ├── pages/               # Page components
│       │   └── redux/               # State management
│       └── package.json


This system was developed collaboratively by a team of 5 developers, with each team member responsible for one subsystem. Git version control and Agile practices were used to manage feature integration and code reviews.

📌 Special Highlights
🌐 IP Address Tracking to monitor suspicious review activity and user accounts, if suspicious acount found admin can delete or suspend it temporarily

📅 Real-time Booking Calendar with availability filtering

📊 Admin Insights Dashboard for bookings and user behavior

💬 Rating Moderation & Feedback Management

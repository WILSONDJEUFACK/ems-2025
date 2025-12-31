🚀 EMS 2025 | Elite Event Archive

EMS 2025 is a high-performance, professional Event Management System built to streamline campus event discovery and registration. It features a sophisticated glassmorphism UI, role-based access control, and persistent data management.
🌟 Key Features

    Role-Based Dashboards: Distinct experiences for Students (Discovery & Booking) and Admins (Event Creation & Global Analytics).

    Persistent Data: Utilizes browser localStorage to ensure your events and registrations survive page refreshes.

    Live Archive Search: Real-time filtering logic that scans titles and descriptions instantly.

    Dynamic Seat Tracking: Visual progress bars show real-time seat availability for every event.

    Automatic Archive Logic: Events dated before today are automatically flagged as "Passed" and registration is disabled.

    Elite UI/UX: Built with the Plus Jakarta Sans typeface and a clean, professional aesthetic optimized for all screen sizes.

🔐 Credentials for Evaluation

The judges can test the system using the following accounts:
Admin Portal (Full Control)

    Admin ID: admin@school.com

    Secure Token: admin123

    Note: Admin access allows you to view Global Registration metrics and publish new events to the archive.

Student Portal

    Students can create their own accounts via the Sign Up window or use any email/password after registering.

🛠️ Tech Stack

    Logic: TypeScript (Object-Oriented Architecture)

    Styling: CSS3 (Custom variables, Flexbox, Grid)

    Structure: HTML5

    Storage: Web Storage API

🚀 Getting Started

To run this project locally, follow these steps:

    Clone the project to your local machine.

    Install dependencies:
    Bash

npm install

Compile TypeScript:
Bash

    npm run build

    Launch the System:

        Open index.html using a local server (e.g., VS Code "Live Server" extension).

        Navigate to the provided local URL (usually http://127.0.0.1:5500).

📂 Project Structure
Plaintext

├── index.html          # Main entry point and UI structure
├── styles/
│   └── main.css        # Professional styling and layout
├── src/
│   ├── main.ts         # Core logic engine & State management
│   ├── models/
│   │   ├── Event.ts    # Event data structure
│   │   ├── User.ts     # User/Admin models
│   │   └── Registration.ts
└── dist/               # Compiled JavaScript (Production ready)

🏆 Competition Highlights

    Zero-Backend Simulation: The system perfectly mimics a database environment using complex array manipulation and persistence logic.

    Performance: Optimized for zero-lag searching even with dozens of archive entries.

    Professionalism: No emojis or clutter; the interface is designed for high-level academic or corporate environments.

    The Live Link: https://wilsondjeufack.github.io/ems-2025/ (This is  to play with the app).

The Repository Link: https://github.com/WILSONDJEUFACK/ems-2025 (This is to grade my code).
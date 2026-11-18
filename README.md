# QueueLess – Smart Shop Appointment & Queue Management System

QueueLess is a web-based appointment and queue management platform designed to make visiting service shops easier and more convenient.

Instead of waiting in long queues, customers can explore available shops, check their information, find available time slots, and book appointments.

The main goal of QueueLess is to save customers' time and help service providers manage their appointments more efficiently.

## Project Overview

Many people waste valuable time waiting for services such as haircuts, doctor consultations, and dental appointments.

QueueLess aims to reduce this problem by providing a simple online platform where customers can discover shops and manage their appointments.

## Features

### Customer
- Create a new account and log in.
- Browse available shops and services.
- Search shops by name or category.
- Filter shops by Barber, Doctor, Dentist, and other categories.
- View shop ratings and available time slots.
- Access shop details and booking options.

### Service Provider
- Register as a service provider.
- Submit shop information.
- Wait for admin approval before accessing provider features.

### Admin
- Separate admin login.
- Admin dashboard structure for managing the platform.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive design |
| JavaScript | Functionality and interactivity |
| LocalStorage | Temporary browser-based data storage |
| Git & GitHub | Version control and project hosting |

## Project Structure

```text
Queueless/
│
├── css/
│   ├── shops.css
│   └── style.css
│
├── js/
│   ├── auth.js
│   └── shops.js
│
├── login.html
├── register.html
├── shops.html
│
└── README.md
```

## How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/Ifteeboss/Queueless.git
   ```

2. Open the project folder in VS Code.

3. Open `login.html` or `shops.html` in your browser.

4. You can also use the VS Code Live Server extension to run the project locally.

## Current Project Status

QueueLess is currently under development.

The current version focuses on the frontend, user registration and login flow, shop listings, search functionality, and category filtering.

Shop information currently uses sample JavaScript data, and user information is stored in browser LocalStorage.

Future development will focus on database integration, real-time appointment management, and additional provider and admin functionalities.

## Future Improvements

- Integrate a backend and database.
- Replace sample shop data with real database records.
- Develop a complete shop management system for service providers.
- Implement real appointment booking and cancellation.
- Add real-time queue and token tracking.
- Improve customer and provider dashboards.
- Add notifications for appointment updates.

## Developer

**Ifteeboss**

GitHub: https://github.com/Ifteeboss

---

*QueueLess – Spend less time waiting, more time living.*

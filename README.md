# 🧠 AI Interview Coach App

[![Live Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge&logo=rocket)](https://ai-interview-app-pwdb.onrender.com/)

## 📌 Project Overview

The **AI Interview Coach App** is a full-stack web application designed to help job seekers practice and refine their interview skills using artificial intelligence. 

Users can:
- Simulate interview scenarios by generating personalized questions based on specific job roles and tech stacks.
- Submit their answers.
- Receive instant, detailed AI-powered feedback on their performance.

The application also tracks past interview sessions, allowing users to review their progress and focus on areas for improvement.

> This project demonstrates a robust **MERN (MongoDB, Express.js, React, Node.js)** stack implementation with modern development practices and integration of advanced AI capabilities.

---

## 🚀 Key Features

- **🔐 User Authentication**  
  Secure registration and login using JWT (JSON Web Tokens) for session management.

- **❓ Dynamic Question Generation**  
  Generates relevant interview questions based on:
  - Job roles (e.g., "Software Engineer")
  - Optional tech stacks (e.g., "React, Node.js, MongoDB")

- **🤖 AI-Powered Feedback**  
  Real-time feedback on submitted answers, including:
  - A numerical score  
  - Identified strengths and weaknesses  
  - Suggestions for improvement  
  - An AI-suggested optimal answer

- **📈 Interview Session Tracking**  
  Saves all sessions to user history for review and progress tracking.

- **🗑️ Session Management**  
  Users can delete past interview sessions from their history.

- **💻 Responsive UI**  
  Built with React and Tailwind CSS, ensuring a clean and intuitive experience across all devices.

---

## 🛠️ Technologies Used

### 💻 Frontend

- **React.js** – Component-based JavaScript library for dynamic UIs  
- **Vite** – Lightning-fast build tool for modern React apps  
- **Tailwind CSS** – Utility-first CSS framework for styling  
- **Axios** – For HTTP requests to the backend  
- **React Router DOM** – Declarative routing within the SPA

### 🧠 Backend

- **Node.js** – JavaScript runtime for server-side logic  
- **Express.js** – Web framework for building RESTful APIs  
- **Mongoose** – ODM for MongoDB to simplify database operations  
- **bcryptjs** – For password hashing  
- **jsonwebtoken (JWT)** – For token-based authentication  
- **dotenv** – For managing environment variables securely  
- **cors** – Enables Cross-Origin Resource Sharing

### 🗃️ Database

- **MongoDB Atlas** – Cloud-hosted NoSQL database for storing user profiles and interview sessions

### 🤖 Artificial Intelligence / External API

- **Google Gemini API (gemini-2.0-flash)** –  
  Used to:
  - Generate personalized interview questions  
  - Provide detailed feedback on user answers

---

## AI Interview Coach App
Project Overview
The AI Interview Coach App is a full-stack web application designed to help job seekers practice and refine their interview skills using artificial intelligence. Users can simulate interview scenarios by generating personalized questions based on specific job roles and tech stacks, submit their answers, and receive instant, detailed AI-powered feedback on their performance. The application tracks past interview sessions, allowing users to review their progress and focus on areas for improvement.

This project demonstrates a robust MERN (MongoDB, Express.js, React, Node.js) stack implementation with modern development practices and integration of advanced AI capabilities.

Key Features
User Authentication: Secure user registration and login system with JWT (JSON Web Tokens) for session management.

Dynamic Question Generation: Generates relevant interview questions based on user-specified job roles (e.g., "Software Engineer") and optional tech stacks (e.g., "React, Node.js, MongoDB").

AI-Powered Feedback: Provides real-time, comprehensive feedback on submitted answers, including:

A numerical score.

Identified strengths and weaknesses.

Suggestions for improvement.

An AI-suggested optimal answer.

Interview Session Tracking: Saves all interview sessions to the user's history, allowing them to revisit past questions, answers, and AI feedback.

Session Management: Users can delete past interview sessions from their history.

Responsive UI: A clean, intuitive, and fully responsive user interface built with React and Tailwind CSS, ensuring a seamless experience across desktop and mobile devices.

Technologies Used
This application leverages a modern full-stack architecture.

Frontend:

React.js: A declarative, component-based JavaScript library for building dynamic user interfaces.

Vite: A fast and opinionated build tool that provides an extremely quick development experience for React applications.

Tailwind CSS: A utility-first CSS framework for rapidly styling the application with pre-defined classes.

Axios: A promise-based HTTP client for making API requests to the backend.

React Router DOM: For declarative routing within the single-page application.

Backend:

Node.js: A JavaScript runtime environment for server-side logic.

Express.js: A fast, unopinionated, minimalist web framework for Node.js, used to build the RESTful API.

Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js, simplifying database interactions.

bcryptjs: For secure password hashing and comparison.

jsonwebtoken (JWT): For implementing token-based authentication.

dotenv: For securely managing environment variables.

cors: Node.js middleware to enable Cross-Origin Resource Sharing (CORS), allowing the frontend to communicate with the backend securely.

Database:

MongoDB Atlas: A cloud-hosted NoSQL database service, providing a flexible and scalable data store for user profiles and interview sessions.

Artificial Intelligence / External API:

Google Gemini API (gemini-2.0-flash): Utilized for generating interview questions and providing detailed, contextual feedback on user answers.

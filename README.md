
![Screenshot_19-9-2024_0723_israeloguntolu wixsite com](https://github.com/user-attachments/assets/c59124a9-4ffc-46b4-9c76-f8341be9dbfc)

# TRACKiT

TRACKiT is a web application designed to help users track and improve their daily practice routines. It provides a customizable platform for setting goals, monitoring progress, and receiving feedback on various activities like learning an instrument, fitness goals, or any other skill development.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Core Algorithms](#core-algorithms)
- [Challenges](#challenges)
- [Team Members](#team-members)
- [Learnings](#learnings)

## Introduction

TRACKiT was inspired by the need for a simple yet powerful tool to track progress in daily routines. Whether you are practicing an instrument, working on fitness, or developing a new skill, TRACKiT helps you monitor key aspects and achieve your objectives.

## Features

1. **Custom Activity Tracking**: Users can create and track specific activities with personalized goals and metrics.
2. **Performance Metrics & Goals**: Monitor key aspects of practice routines such as duration, quality, and objective achievement with real-time progress updates.
3. **Secure Authentication & Data Privacy**: Ensures data security with user authentication and protected routes for sensitive information.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Hosting**: Vercel (for both client and server)
- **Additional Tools**: JWT for authentication, bcrypt for password hashing

## Architecture

TRACKiT follows a modern web application architecture with a React-based frontend and an Express.js backend. The application uses MongoDB Atlas for data storage, providing scalability and ease of access. Both the frontend and backend are deployed on Vercel, ensuring a seamless and reliable user experience.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account
- Vercel CLI (for deployment)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/trackit.git
    ```
2. Navigate to the project directory:
    ```bash
    cd trackit
    ```
3. Install dependencies for the server:
    ```bash
    cd server
    npm install
    ```
4. Install dependencies for the client:
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1. Start the server:
    ```bash
    cd server
    npm start
    ```
2. Start the client:
    ```bash
    cd ../client
    npm start
    ```

## Core Algorithms

TRACKiT's core algorithms include:

- **Authentication**: Uses JWT for secure user sessions and bcrypt for password hashing.
- **Activity Tracking**: Allows users to create custom activities and track various metrics like duration, quality, and progress towards goals.
- **Real-Time Progress Monitoring**: Provides users with up-to-date information on their performance and achievements.

## Challenges

- **Integration with MongoDB Atlas**: Ensuring secure and efficient data storage and retrieval.
- **Deployment on Vercel**: Managing environment variables and ensuring both client and server work seamlessly together in a production environment.
- **User Authentication**: Implementing a secure authentication system that protects user data and provides a smooth user experience.

## Team Members

- **Israel Oguntolu**: Backend development, server deployment, database integration.
- **Israel Oguntolu**: Frontend development, client deployment, user interface design.

## Learnings

Working on TRACKiT has been an enriching experience, allowing me to deepen my understanding of full-stack web development, cloud deployment, and user authentication systems. I learned how to efficiently manage a project from conception to deployment, consulting and collaborating effectively to overcome technical challenges.

## License

This project is licensed under the ALX License - see the [LICENSE](LICENSE) file for details.# TRACKiT

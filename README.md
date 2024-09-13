Energy-Efficient Data Center Optimization Dashboard

Overview
The Energy-Efficient Data Center Optimization Dashboard is a web application designed to help data center managers optimize server and cooling operations to reduce overall energy consumption. Using Linear Programming and the Simplex algorithm, the system calculates the optimal server utilization and cooling configurations, ensuring the demand is met while minimizing energy usage.

The project is built using the MERN stack (MongoDB, Express, React, Node.js) for the front-end and back-end, and it integrates a Python optimization script to solve the linear programming problem. The front-end is styled with Tailwind CSS for a clean and responsive user interface.

Features
Dynamic Input: Users can add multiple servers and provide their power consumption, cooling power, and workload capacity.
Energy Optimization: The app uses a Python-based Simplex algorithm to determine the optimal configuration for server usage to minimize energy consumption.
Real-Time Results: The solution (which servers should be active and how much energy is consumed) is calculated in real-time and displayed to the user.
Responsive UI: A clean, responsive user interface powered by Tailwind CSS ensures accessibility on various screen sizes and devices.
Tech Stack
Frontend: React, Tailwind CSS
Backend: Node.js, Express.js
Optimization: Python (PuLP, Simplex Algorithm)
API Communication: Axios
Prerequisites
Before running this project, ensure that you have the following installed:

Node.js (v12 or later)
npm (comes with Node.js)
Python (v3.6 or later)

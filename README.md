# Travlr Getaways - CS-465 Full Stack Development

## Project Overview

Travlr Getaways is a full-stack travel booking demonstration application developed for Southern New Hampshire University's CS-465 Full Stack Development course.

The application provides a public-facing travel website and an Angular-based administrator interface for managing trip information. It uses the MEAN stack: MongoDB, Express.js, Angular, and Node.js.

## Technology Stack

MongoDB and Mongoose: Database storage and object modeling

Express.js and Node.js: Web server, MVC architecture, and RESTful API

Angular and TypeScript: Single-page administrator application

Handlebars: Server-rendered public website templates

Bootstrap: Responsive interface styling

JSON Web Tokens (JWT): Administrator authentication

bcryptjs: Password hashing

## Application Architecture

The project consists of three primary components:

Public website: An Express application using Handlebars templates to display travel information.

REST API: Express routes and Mongoose models that provide trip data and protected management operations.

Administrator SPA: An Angular application that communicates with the REST API to manage trips.

MongoDB provides persistent storage for trip records and administrator accounts.

## Features

Public Website

View travel information and available trips

Display trip descriptions, prices, and images

Retrieve trip information from MongoDB through the server application

Administrator Application

Administrator login and logout

View existing trips

Add new trips

Edit trip information

Delete trips with confirmation

Protected administrator routes

JWT-authenticated trip management requests

## REST API

Method

Endpoint

Description

Authentication

GET

/api/trips

Retrieve all trips

Not required

GET

/api/trips/:tripCode

Retrieve a specific trip

Not required

POST

/api/trips

Create a trip

JWT required

PUT

/api/trips/:tripCode

Update a trip

JWT required

DELETE

/api/trips/:tripCode

Delete a trip

JWT required

POST

/api/login

Authenticate an administrator

Not required

## Prerequisites

Install the following software before running the application:

Node.js and npm

MongoDB Community Server or another compatible local MongoDB instance

Angular CLI, or use the project's locally installed CLI through npx

## Installation

1\. Install Backend Dependencies

Open a terminal in the project root directory:

npm install

2\. Install Angular Dependencies

cd app\_admin

npm install

cd ..

3\. Configure MongoDB

Start MongoDB and ensure that the application can connect to:

mongodb://127.0.0.1/travlr

The application uses the travlr database.

Important: MongoDB must contain trip records for the public website and administrator trip listing to display travel packages. An empty database will not automatically contain the sample trips.

Seed the Sample Trip Data



After starting MongoDB and installing the backend dependencies, open PowerShell in the Travlr project root and run:



`node app\_api/models/seed.js`



This imports the three sample trips from `data/trips.json`: Gale Reef, Dawson's Reef, and Claire's REEF.



\*\*Warning:\*\* Running this script deletes all existing trip records before importing the sample data. Only run it when initializing or intentionally resetting the database's trip collection. Administrator accounts are not deleted.

4\. Configure the JWT Secret

In PowerShell, set a strong, randomly generated JWT signing secret:

$env:JWT\_SECRET = "REPLACE\_WITH\_A\_LONG\_RANDOM\_SECRET"

This value is a placeholder, not a production credential.

Set the variable in the terminal session used to start the Express server. Do not commit your actual secret to Git.

5\. Create an Administrator Account

From the project root, run:

node create-admin.js

Enter the requested administrator name, email address, and password.

The password must contain at least 12 characters. Password entry is hidden, and the password is hashed before storage.

6\. Start the Express Server

From the project root, run:

npm start

The Express server runs at:

http://localhost:3000

7\. Start the Angular Administrator Application

Open a second terminal:

cd app\_admin

npx ng serve

The Angular development server runs at:

http://localhost:4200

## Application URLs

Component

URL

Public travel website

http://localhost:3000/travel/

REST API

http://localhost:3000/api/trips

Administrator application

http://localhost:4200

Administrator login

http://localhost:4200/login

## Authentication and Security

Administrator authentication uses JWTs signed with a secret supplied through an environment variable.

Passwords are hashed using bcryptjs. Trip creation, modification, and deletion require a valid administrator token.

The Angular application stores the JWT in browser session storage. Logging out removes the stored token.

Security note: This application is an academic demonstration and has not undergone a comprehensive production security assessment.

## Testing

The application has been manually tested for:

Public website rendering and travel images

REST API trip retrieval

Administrator login and logout

Creating and deleting trips

Updating trip information through the REST API

Unauthorized requests returning HTTP 401

Protected Angular routes redirecting unauthenticated users to login

Angular production build completion

To generate a production Angular build:

cd app\_admin

npx ng build

The compiled application is written to app\_admin/dist/travlr-admin.

## Project Structure

travlr/

├── app\_admin/             Angular administrator application

├── app\_api/               REST API controllers, routes, and models

├── app\_server/            Express MVC controllers, routes, and views

├── public/                Public website assets

├── create-admin.js        Administrator account setup

├── app.js                 Express application entry point

├── package.json           Backend dependencies and scripts

└── README.md              Project documentation

## Academic Context

Developed as part of CS-465 Full Stack Development at Southern New Hampshire University.

The project demonstrates full-stack application development, MVC design, RESTful services, database integration, single-page application development, authentication, and client-server communication.

---

# CS-465 Module Eight Portfolio Reflection

## Architecture

Throughout the development of Travlr Getaways, I worked with two different approaches to frontend development. The customer-facing website used Express, JavaScript, and Handlebars templates to generate HTML on the server, while the administrative interface used Angular to create a single-page application (SPA). The Express approach generates complete pages for the browser, whereas Angular manages much of the interface through reusable components and updates content without requiring a full-page reload. Working with both approaches helped me understand how different frontend architectures can serve distinct purposes within the same application.

For the backend, I used MongoDB, a NoSQL database, to manage trip and administrator information. MongoDB's document-based structure was particularly useful because the application's data could be represented using JSON-like objects. Combined with Mongoose, MongoDB provided a flexible way to define schemas, validate data, and communicate with the Express API. This approach integrated effectively with the MEAN stack and simplified data exchange between the frontend and backend.

## Functionality

One important concept I developed a stronger understanding of was the distinction between JavaScript and JSON. JavaScript is a programming language used to implement application behavior, while JSON is a lightweight text format used to exchange structured data. In Travlr, JSON connected the frontend and backend through REST API requests and responses. For example, when an administrator retrieves or updates trip information, the Angular application communicates with the Express backend using JSON data.

Refactoring was also an important part of development. As the application evolved, I organized functionality into reusable Angular components and services. The TripDataService centralized API communication, while the AuthenticationService handled login and token management. This separation reduced duplicated code and improved maintainability. Reusable UI components also made the administrative interface more consistent, easier to troubleshoot, and simpler to extend as additional functionality was introduced.

## Testing

Developing Travlr strengthened my understanding of HTTP methods, REST API endpoints, and application security. GET requests retrieve trip information, POST requests create new records, PUT requests update existing records, and DELETE requests remove records. These operations communicate through defined API endpoints, allowing the frontend to interact with the database without accessing it directly.

I used Postman to test API endpoints and verify responses throughout development. Introducing JWT authentication added another layer of complexity because protected operations required valid authorization credentials. Testing involved confirming successful requests, identifying error responses, and verifying that unauthorized requests were rejected. I also tested the administrative interface to ensure that login, logout, navigation, and trip management worked together. This reinforced the importance of testing both individual components and the interactions between the frontend, backend, database, and security layers.

## Reflection

CS-465 provided valuable experience bringing together technologies that I had previously studied individually. Developing Travlr required me to approach software engineering from a systems perspective, considering how frontend interfaces, backend services, databases, APIs, and security mechanisms interact. One of the most rewarding aspects of the course was seeing these separate components evolve into a complete full-stack application.

Throughout the course, I strengthened my skills in JavaScript, TypeScript, Angular, Express, Node.js, MongoDB, Mongoose, REST API development, GitHub, and application testing. I also gained practical experience with component-based architecture, authentication, debugging, and maintaining a project across multiple development stages.

As I pursue opportunities in software engineering, artificial intelligence, and research-oriented development, these skills will be particularly valuable. Even advanced AI applications depend on reliable software infrastructure, secure APIs, efficient data management, and well-designed interfaces. This project strengthened my confidence in developing complete applications and provided a portfolio artifact that demonstrates my ability to integrate multiple technologies into a functioning system.


#  Book Library System

A full-stack web application that simulates a basic library management system. Users can register, log in, browse books, borrow and return them. Admins can manage the book inventory with full CRUD operations. Built using the MERN stack.


## Live Demo
 
  [Demo Vide](https://youtu.be/0rpyQKfTwRI)


## echnologies Used

| Layer       | Tech Stack              | Why Chosen |
|-------------|-------------------------|------------|
| Frontend    | React.js, Axios         | Fast, component-based UI |
| Backend     | Node.js, Express.js     | Lightweight, scalable REST API |
| Database    | MongoDB + Mongoose      | Flexible NoSQL schema for books/users |
| Auth        | JWT, bcrypt             | Secure token-based authentication |
| Deployment  | Vercel (frontend), Render (backend) | Easy CI/CD and free hosting |


##  ER Diagram (Text Format)

User { _id: ObjectId 
name: String 
email: String 
password: String (hashed)
 role: String ("user" | "admin") 
 borrowedBooks: [BorrowRecord] 
 }

Book { _id: ObjectId 
title: String 
author: String 
genre: String 
totalCopies: Number 
availableCopies: Number
 }

BorrowRecord { bookId: ObjectId
 borrowDate: Date 
 returnDate: Date | null
  }

  
---

##  API Endpoints

###  Auth Routes

| Method | Route           | Description            |
|--------|------------------|------------------------|
| POST   | `/api/register`  | Register new user      |
| POST   | `/api/login`     | Login and get JWT      |

###  Book Routes

| Method | Route              | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/api/books`       | Get all books                   |
| GET    | `/api/books/:id`   | Get single book details         |
| POST   | `/api/books`       | Add new book (Admin only)       |
| PUT    | `/api/books/:id`   | Update book (Admin only)        |
| DELETE | `/api/books/:id`   | Delete book (Admin only)        |

###  Borrowing Routes

| Method | Route                    | Description                          |
|--------|--------------------------|--------------------------------------|
| POST   | `/api/borrow/:bookId`    | Borrow a book (User only)            |
| POST   | `/api/return/:bookId`    | Return a borrowed book (User only)   |
| GET    | `/api/mybooks`           | View user's borrowed books           |


## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/book-library.git
cd book-library

## Backend Setup

cd backend
npm install

Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret

start backend:
npm start

## Frontend Setup
cd ../frontend && npm start



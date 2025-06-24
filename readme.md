# 📚 Library Management API

A full-featured **Library Management System** built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose**, designed to manage book inventories and borrowing logic with proper validation, error handling, and RESTful practices.

> **Live Demo**: [Library Management](https://library-management-silk-five.vercel.app/)
> *Deployed via Vercel*

---

## 🎯 Objective

To build a robust REST API that enables managing library books and borrowing operations. The project uses:

* **Express** for routing and middleware
* **TypeScript** for strong typing
* **MongoDB + Mongoose** for persistence and data modeling
* **Zod** for runtime validation
* **Mongoose middlewares and methods** for logic encapsulation

---

## 📦 Features

* 📘 Create, retrieve, update, and delete books
* 📚 Borrow books with quantity and due date validation
* ❌ Prevent borrowing more copies than available
* 🧠 Aggregation pipeline to summarize borrowed books
* ✅ Field validation using **Zod** and Mongoose
* 🛠️ Mongoose Static methods usage
* 🔍 Filter, sort, sortBy and limit used to show books

---

## 🚀 Installation

```bash
git clone https://github.com/juwel-r/assignment-3-library_management.git
cd assignment-3-library_management
npm install
cp .env.example .env
npm run dev
```

To build and run production:

```bash
npm run build
npm run prod
```

---

## 🛠️ Configuration

Update your `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_db
```

---

## 📡 API Endpoints

### 📘 Books

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/books`         | Add a new book              |
| GET    | `/api/books`         | Get all books (filter/sort) |
| GET    | `/api/books/:bookId` | Get a single book by ID     |
| PUT    | `/api/books/:bookId` | Update book info            |
| DELETE | `/api/books/:bookId` | Delete a book               |

### 📚 Borrow

| Method | Endpoint      | Description           |
| ------ | ------------- | --------------------- |
| POST   | `/api/borrow` | Borrow a book         |
| GET    | `/api/borrow` | Get borrowing summary |

---

## 🧪 Examples

### ✅ Create Book

```http
POST /api/books
```

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

### 🔄 Borrow a Book

```http
POST /api/borrow
```

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

## 📚 Models

### Book

| Field       | Type    | Required | Notes                       |
| ----------- | ------- | -------- | --------------------------- |
| title       | String  | ✅        | Book title                  |
| author      | String  | ✅        | Book author                 |
| genre       | String  | ✅        | Must be from allowed genres |
| isbn        | String  | ✅        | Must be unique              |
| description | String  | ❌        | Optional book description   |
| copies      | Number  | ✅        | Must be ≥ 0                 |
| available   | Boolean | ❌        | Defaults to true            |

### Borrow

| Field    | Type     | Required | Notes                     |
| -------- | -------- | -------- | ------------------------- |
| book     | ObjectId | ✅        | Refers to book            |
| quantity | Number   | ✅        | Must be a positive number |
| dueDate  | Date     | ✅        | Required return date      |

---

## ❗ Error Handling

All errors follow a consistent format:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```

---

## ⚙️ Technologies Used

* **Express** (v5)
* **TypeScript**
* **MongoDB** with **Mongoose**
* **Zod** for validation
* **ts-node-dev** for dev environment
* **Vercel** for deployment

---

## 🧑‍💻 Contributor

**Juwel Rana** — Full-stack Developer
[GitHub](https://github.com/juwel-r) | [LinkedIn](https://linkedin.com/in/juwel-r)

---
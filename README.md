# Real-Time Chat Application

This is a full-stack real-time chat application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO** for real-time communication. The project includes secure user authentication using **JWT** (with httpOnly cookies), RESTful APIs, and a responsive frontend UI.

---

## 🌐 Tech Stack

### Frontend

* **React** with **Vite**
* **Tailwind CSS** for styling
* **Redux Toolkit** for state management
* **Socket.IO-client** for real-time messaging

### Backend

* **Node.js** + **Express.js**
* **MongoDB** with **Mongoose**
* **Socket.IO**
* **JWT Authentication** (stored in httpOnly cookies)
* **CORS** and **cookie-parser** for secure communication

---

## 🔐 Features

### ✅ Authentication

* Register/Login
* httpOnly JWT tokens for security
* Protected routes using middleware

### 💬 Real-Time Chat

* One-to-one messaging
* Socket.IO room-based architecture
* Real-time message updates

### 🧑‍🤝‍🧑 Users & Chats

* Search users
* Create chats with any user
* View and select chats
* Dynamic chat UI updates

### ⚙️ UI Features

* Responsive layout
* Toggle user profile panel
* Dynamic chat list

---

## 🛠️ Project Structure

```
root/
├── client/             # React Frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/      # Redux Toolkit store, slices
│       └── utils/
│
├── server/             # Express Backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
│
├── .env                # Environment variables
├── package.json        # Monorepo root
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/realtime-chat-app.git
cd realtime-chat-app
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client/` folder:

```
VITE_API_URL=http://localhost:5000/api
```

Start the React app:

```bash
npm run dev
```

### 4. Run Both Concurrently (Optional)

Install `concurrently` at root and add scripts to `package.json`.

---

## 🔌 API Endpoints (Backend)

### Auth Routes

* `POST /api/auth/register`
* `POST /api/auth/login`

### User Routes

* `GET /api/user?search=xyz`
* `GET /api/user/allUsers`

### Chat Routes

* `POST /api/chat` (create chat)
* `GET /api/chat` (get all chats)

### Message Routes

* `POST /api/message`
* `GET /api/message/:chatId`

---

## 🧠 Learning Outcomes

* Handling secure authentication using cookies
* Managing state with Redux Toolkit
* Real-time communication with Socket.IO
* Full MERN stack architecture

---

## 🌍 Deployment

* Backend: \[Render / Railway / Vercel (functions)]
* Frontend: \[Vercel / Netlify]

Ensure proper CORS and cookie settings:

```js
credentials: true,
origin: "https://your-frontend-domain.com"
```

---

## 🤝 Acknowledgements

This project was developed as a part of internship/training for learning full-stack development and real-time systems.

---

## 📄 License

This project is licensed under the MIT License.

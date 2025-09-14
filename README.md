# 🏦 Micro-Entrepreneur Insurance Portal

A full-stack web application for managing **clients, policies, and documents** for micro-entrepreneurs.  
Built with **React + Vite + Tailwind CSS** on the frontend and **Express + MongoDB + Mongoose** on the backend.

---

## ✨ Features
- 👤 Client management (create, update, delete, documents)
- 📑 Policy management (view, purchase, assign to clients)
- 📊 Dashboard with charts & analytics
- 📂 Document upload & verification
- 🎨 Responsive UI with TailwindCSS + Chakra UI
- ⚡ Fast development with Vite and Nodemon

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
- [React 18](https://react.dev/) – UI library
- [Vite 5](https://vitejs.dev/) – dev server & build tool
- [React Router DOM 7](https://reactrouter.com/) – routing
- [TailwindCSS 3](https://tailwindcss.com/) – styling
- [Chakra UI](https://chakra-ui.com/) – components
- [Framer Motion](https://www.framer.com/motion/) – animations
- [Recharts](https://recharts.org/) – charts & graphs
- [Swiper](https://swiperjs.com/) – carousels/sliders
- [Axios](https://axios-http.com/) – HTTP requests
- Icons: [Lucide](https://lucide.dev/), [Heroicons](https://heroicons.com/), [React Icons](https://react-icons.github.io/)

### Backend (`/server`)
- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/) – REST API
- [MongoDB](https://www.mongodb.com/) + [Mongoose 8](https://mongoosejs.com/) – database
- [Cors](https://www.npmjs.com/package/cors) – cross-origin requests
- [Dotenv](https://www.npmjs.com/package/dotenv) – environment variables
- [Nodemon](https://nodemon.io/) – hot reload in dev

---

## 📂 Project Structure
├── frontend/ # React + Vite frontend
│ ├── src/
│ ├── package.json
│ └── vite.config.js
├── server/ # Express + MongoDB backend
│ ├── src/
│ ├── package.json
│ └── .env
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/your-username/micro-entrepreneur-portal.git
cd micro-entrepreneur-portal
```

### 2. Backend Setup
```
cd server
npm install
```
Create a .env file inside /server:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/insurance_portal
```
Start backend:
```
npm run dev
```

### 3. Frontend Setup
```
cd ../frontend
npm install
npm run dev
```

Frontend will run at: http://localhost:5173

Backend API will run at: http://localhost:3000/api

🚀 Usage

Open the app in your browser: http://localhost:5173

Navigate between:

Dashboard → view overall stats

Clients → manage client records

Policies → browse and purchase policies

Settings → manage configurations

Purchase a policy → upload required documents → verify.

📌 API Endpoints
Clients

GET /api/clients – list clients

GET /api/clients/:id – get client details

POST /api/clients – create client

PUT /api/clients/:id – update client

DELETE /api/clients/:id – delete client

Policies

GET /api/policies – list all policies

GET /api/policies/:id – get policy details

POST /api/policies – create new policy

PUT /api/policies/:id – update policy

DELETE /api/policies/:id – delete policy

Client Policies

GET /api/clients/:clientId/policies – list client’s policies

POST /api/clients/:clientId/policies/:policyId/purchase – purchase policy for client

Documents

GET /api/clients/:id/documents – list client documents

POST /api/clients/:clientId/documents – upload document

DELETE /api/clients/:clientId/documents/:docId – delete document

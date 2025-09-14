# Insurance Management System - Setup Guide

## Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   PORT=3000
   DB_CONNECTION=mongodb://localhost:27017/insurance-management
   ```

4. Make sure MongoDB is running on your system. If you don't have MongoDB installed:
   - Install MongoDB Community Edition
   - Start the MongoDB service

5. Seed the database with sample data (optional):
   ```bash
   npm run seed
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:3000`

## Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Dashboard
- `GET /api/dashboard` - Get dashboard analytics

### Clients
- `GET /api/clients` - Get all clients (with search and pagination)
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Client Documents
- `GET /api/clients/:id/documents` - Get client documents
- `POST /api/clients/:clientId/documents` - Add document to client
- `DELETE /api/clients/:clientId/documents/:docId` - Delete document

### Policies
- `GET /api/policies` - Get all policies (with search and pagination)
- `GET /api/policies/:id` - Get single policy
- `POST /api/policies` - Create new policy
- `PUT /api/policies/:id` - Update policy
- `DELETE /api/policies/:id` - Delete policy

## Features Implemented

### Backend
- ✅ Complete REST API with CRUD operations
- ✅ MongoDB integration with Mongoose
- ✅ CORS support
- ✅ Error handling
- ✅ Pagination and search
- ✅ Dashboard analytics
- ✅ Document management

### Frontend
- ✅ React with modern hooks
- ✅ Axios for API communication
- ✅ Custom hooks for API calls
- ✅ Responsive design with Tailwind CSS
- ✅ Real-time data fetching
- ✅ Form handling with validation
- ✅ Error handling and loading states
- ✅ Search and pagination
- ✅ Modal forms for CRUD operations
- ✅ Document upload with drag & drop
- ✅ Image preview and full-size viewing
- ✅ Support for multiple document types (Aadhar, PAN, Passport, etc.)

## Database Models

### Client Model
- name, dateOfBirth, address, phone, email
- occupation, maritalStatus, dependents
- documents array with name, type, and image data

### Policy Model
- name, type, premium, status, activeTill, description
- coverage details (coverageType, liability, collision, etc.)
- premium details (paymentFrequency, lateFee, cancellationPolicy)

## Usage

1. Start both backend and frontend servers
2. Open the frontend in your browser
3. Navigate through the dashboard to see analytics
4. Use the Clients page to manage clients
5. Click on a client to view details and manage their policies and documents
6. Use the search functionality to find specific clients or policies
7. Add new clients and policies using the form modals
8. Upload documents like Aadhar Card, PAN Card, Passport, etc. using the document upload feature
9. View uploaded documents in a grid layout with preview and full-size viewing options

## Document Upload Features

### Supported Document Types:
- Aadhar Card
- PAN Card
- Passport
- Driver's License
- Voter ID
- Bank Statement
- Salary Certificate
- Address Proof
- Identity Proof
- Other

### Upload Features:
- Drag & drop file upload
- File preview before upload
- Support for PNG, JPG, JPEG, and PDF files
- Base64 encoding for secure storage
- Image preview in grid layout
- Full-size viewing in new tab
- Document deletion functionality

The system is now fully functional with a complete backend API and frontend integration using Axios, including comprehensive document upload capabilities!

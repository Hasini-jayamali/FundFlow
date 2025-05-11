This is the backend API for the FundFlow system, handling authentication, customers, and loan application logic.

**Tech Stack**

Node.js (ES Modules)
Express.js
MySQL (loan & user data)
MongoDB (loan scoring logs)
JWT Authentication
dotenv for environment configuration

**Getting Started**

Clone the repository and navigate into the backend directory:
git clone <repo-url>
cd fundflow-backend

Install dependencies:
npm install

Create a .env file with the following content:
PORT=3001
JWT_SECRET=your_jwt_secret
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=admin1234
MYSQL_DATABASE=fundflow
MONGO_URI=mongodb://localhost:27017/fundflow_logs


Start the backend server:
npm run dev

**Project Structure**
routes/: Express routers
controllers/: Business logic
config/: DB connection (MySQL + MongoDB)
middleware/: Auth middleware
models/: Mongoose models

** API Endpoints**

POST /auth/register
POST /auth/login
GET /customers
GET /loans/mine
GET /loans/all
POST /loans

**Notes**

Ensure MySQL and MongoDB are running locally.
MongoDB stores logs of loan application scoring.
Admin access is required for /customers and /loans/all routes.
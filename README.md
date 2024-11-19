Here's a **README.md** template for your repository containing both the frontend and backend projects. Update the placeholders as necessary to fit your project specifics.

---

# Autovert Machine Task

This repository contains the **frontend** and **backend** codebases for the Autovert Machine Task, which provides a seamless user and admin interface for managing tasks. The frontend is built using modern technologies like React and TailwindCSS, while the backend is implemented in Node.js, Express, and MongoDB.
---

## Project Overview

The Autovert project includes:

- A user-friendly admin panel to manage workflows and tasks.
- API endpoints for managing workflows and performing CRUD operations.

---

## Features

### Frontend:
- Built with React and TypeScript.
- Styled with TailwindCSS.
- Responsive and accessible design.
- Vite for a fast development experience.

### Backend:
- RESTful APIs with Express.js.
- MongoDB as the database.
- Dockerized for seamless deployment.
- Environment-specific configurations.

---

## Folder Structure

```
autovert/
├── client/                # Frontend codebase
│   ├── src/               # React application source
│   ├── public/            # Static files
│   ├── tailwind.config.js # TailwindCSS configuration
│   └── package.json       # Frontend dependencies
├── server/                # Backend codebase
│   ├── src/               # Backend source code
│   ├── dist/              # Compiled backend files
│   ├── Dockerfile         # Docker configuration
│   └── package.json       # Backend dependencies
└── README.md              # Project documentation
```

---

## Getting Started

### Prerequisites
- Node.js (>=16)
- MongoDB
- pnpm (preferred package manager)

### Clone the Repository
```bash
git clone https://github.com/Rithick574/syncworks-autovert.git
cd syncworks-autovert
```

---

## Frontend

### Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   - Add your `.env` file in the `client/` directory with the following variables:
     ```
     VITE_API_BASE_URL=<Your Backend API URL>
     ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

### Build for Production
```bash
pnpm build
```

---

## Backend

### Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   - Add your `.env` file in the `server/` directory with the following variables:
     ```
     PORT=5000
     DATABASE_URL=<Your MongoDB Connection URL>
     ```

4. Run the server:
   ```bash
   pnpm start
   ```

### Run with Docker
1. Build the Docker image:
   ```bash
   docker build -t autovert-backend .
   ```

2. Run the container:
   ```bash
   docker run -p 5000:5000 --env-file .env autovert-backend
   ```

---

## API Documentation

The backend API documentation is available via Postman:

- **API Documentation Link:** [Postman Documentation](https://documenter.getpostman.com/view/29232780/2sAY55ZdEw)

---

## Deployment

- **Frontend**: Hosted on [Vercel](https://autovert.vercel.app/)
- **Backend**: Hosted on AWS EC2.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

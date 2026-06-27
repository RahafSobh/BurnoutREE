# BurnoutREE

BurnoutREE is an explainable developer burnout prediction app powered by a custom Decision Tree algorithm.

Full-stack application built with React, TypeScript, Vite, Node.js, and Express.

## Project Structure

```
BurnotREE/
├── frontend/          # React + TypeScript + Vite client
├── backend/           # Node.js + Express + TypeScript API
├── package.json       # Root workspace configuration
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [npm](https://www.npmjs.com/) >= 10

## Getting Started

### Install dependencies

```bash
npm install
```

### Environment setup

Copy the backend environment example and adjust values as needed:

```bash
cp backend/.env.example backend/.env
```

### Development

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run each service individually:

```bash
npm run dev:frontend   # http://localhost:5173
npm run dev:backend    # http://localhost:3000
```

### Build

```bash
npm run build
```

## Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Frontend | React, TypeScript, Vite |
| Backend  | Node.js, Express, TypeScript |
| Package manager | npm workspaces |

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start frontend and backend in development mode |
| `npm run dev:frontend` | Start frontend only |
| `npm run dev:backend` | Start backend only |
| `npm run build` | Build both packages for production |
| `npm run lint` | Lint frontend code |

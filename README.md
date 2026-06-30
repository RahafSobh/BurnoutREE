# BurnoutREE 🌳

BurnoutREE is a full-stack web application that predicts developer burnout risk using a manually implemented Decision Tree algorithm.

The application receives several work-related parameters, predicts the user's burnout level, and explains the prediction by visualizing the complete Decision Tree and highlighting the path used during classification.

The project was developed as part of the **Lotus Decision Tree Assignment**.

---

# Live Demo

**Frontend (Vercel)**

https://burnout-ree-frontend.vercel.app/

**Backend API (Render)**

https://burnoutree.onrender.com/

**Health Check**

https://burnoutree.onrender.com/health

**GitHub Repository**

https://github.com/RahafSobh/BurnoutREE

---

# Features

- Manual Decision Tree implementation
- No machine learning libraries
- Entropy and Information Gain calculations
- Automatic threshold search for numerical attributes
- Support for numerical and categorical features
- Burnout prediction
- Interactive Decision Tree visualization
- Highlighted prediction path
- Hover statistics for each node
- Frontend and backend validation
- REST API architecture
- Cloud deployment

---

# Dataset

The application uses a built-in dataset representing different developer work scenarios.

Each record contains the following features:

| Feature | Type |
|----------|------|
| Sleep | Number |
| Meetings | Number |
| Weekends | Yes / No |
| Stress | Number (1–10) |
| Target | Classification |

Possible prediction classes:

- Healthy
- Vacation Required
- Risk of Burnout
- Critical Condition

The Decision Tree is trained automatically using this built-in dataset.

---

# Decision Tree Algorithm

The Decision Tree was implemented manually without using Scikit-learn or any other machine learning framework.

The implementation includes:

- Entropy calculation
- Information Gain calculation
- Best split search
- Threshold search for numerical features
- Recursive tree construction
- Tree serialization
- Prediction by traversing the generated tree

### Why Entropy?

Entropy together with Information Gain was selected because it is the core splitting criterion of the ID3 algorithm. It measures how informative each split is and produces an explainable model where every prediction can be traced through the decision tree.

---

# System Architecture

```
React + TypeScript
        │
        │ REST API
        ▼
Express + TypeScript
        │
        ▼
Decision Tree Engine
        │
        ├── Entropy
        ├── Information Gain
        ├── Best Split Search
        ├── Recursive Tree Builder
        └── Prediction
        │
        ▼
Serialized Tree
        │
        ▼
React Flow Visualization
```

---

# Full-Stack Workflow

1. The backend trains the Decision Tree using the built-in dataset.
2. The frontend collects the user's input.
3. A prediction request is sent to the backend.
4. The backend traverses the trained Decision Tree.
5. The predicted burnout level and decision path are returned.
6. The frontend highlights the path inside the visualized Decision Tree.

---

# Frontend

The frontend provides:

- User-friendly prediction form
- Input validation
- Burnout prediction
- Interactive Decision Tree visualization
- Highlighted prediction path
- Hover information for every node

---

# Backend API

## Train Model

```
POST /api/train
```

Trains the Decision Tree using the built-in dataset.

---

## Predict

```
POST /api/predict
```

Receives user input and returns:

- predicted burnout level
- decision path

---

## Get Tree

```
GET /api/tree
```

Returns the serialized Decision Tree in JSON format.

---

# Error Handling

Both frontend and backend validate incoming data.

Examples include:

- Sleep hours must be within the allowed range.
- Stress level must be between 1 and 10.
- Meetings cannot be negative.
- Invalid requests return appropriate HTTP status codes.
- Validation errors are displayed to the user instead of crashing the application.

---

# Project Structure

```
BurnoutREE/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── utils/
│
├── backend/
│   ├── algorithms/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validation/
│
├── package.json
└── README.md
```

---

# Prerequisites

- Node.js >= 20
- npm >= 10

---

# Running the Project

Install dependencies

```bash
npm install
```

Run both frontend and backend

```bash
npm run dev
```

Run frontend only

```bash
npm run dev:frontend
```

Run backend only

```bash
npm run dev:backend
```

Build the project

```bash
npm run build
```

---

# Technologies

## Frontend

- React
- TypeScript
- Vite
- React Flow

## Backend

- Node.js
- Express
- TypeScript

## Deployment

- Vercel
- Render

## Version Control

- Git
- GitHub

---

# AI Usage

AI tools were used throughout the project as required by the assignment.

They were mainly used for:

- discussing implementation ideas
- understanding Decision Tree concepts
- debugging React and TypeScript code
- reviewing parts of the implementation
- improving the user interface
- troubleshooting deployment issues
- improving the project documentation

All final design decisions, implementation, testing, debugging and deployment were completed and verified by the project author.

---

# Future Improvements

Possible future improvements include:

- Support for custom uploaded datasets
- Larger training datasets
- Decision Tree pruning
- Better user interface
- Prediction history
- Additional burnout-related features
- Improved mobile responsiveness

---

# Author

**Rahaf Sobh**




# Project Overview

This project is a full-stack web application that allows users to interact with a grid of document cards. Built using React for the frontend and Python with PostgreSQL for the backend, the application provides a seamless user experience for managing document data.

## Features

1. **Static JSON Data**: The application loads a static JSON file containing document data and displays it as cards. This allows for quick prototyping and testing without needing a live backend.

2. **Card Display**: Each card is displayed with a thumbnail image, and a loading spinner is shown while the image is loading. This enhances the user experience by providing visual feedback during data fetching.

3. **Drag-and-Drop Functionality**: Users can reorder the cards using drag-and-drop. This feature allows for intuitive organization of documents, making it easier for users to manage their data.

4. **Image Overlay**: Clicking on a card opens an overlay displaying the associated image. Pressing the ESC key closes the overlay, providing a simple way to view document details without navigating away from the main interface.

5. **Mock Service Worker**: For frontend development, MSW is used to mock API responses, allowing for local data persistence. This enables developers to work with realistic data without needing a live backend, streamlining the development process.

> **NOTE**: Service workers in a dockerized environment need an SSL certificate, which is not possible for the project currently. Hence, the APIs don't work in the dockerized environment due to service workers not being registered. Kindly test in development mode.

## Architectural Design for Mock APIs

The frontend is built with React, utilizing modern features such as hooks for state management and effects. The mock API is built with service workers to mimic a real API call to the backend. This design allows for a clear separation of concerns, making the application easier to maintain and extend.

### Hypothetical API Endpoints

- **GET /api/cards**: Fetch all document cards.
- **POST /api/cards**: Add a new document card.
- **PUT /api/cards**: Update an existing document card.

These endpoints provide a simple RESTful interface for managing document data, allowing for easy integration with the frontend.

## Steps to Run the Project

### Prerequisites

- Ensure you have [npm](https://www.npmjs.com/) installed for the frontend.

### Frontend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ParthAhuja143/zania.git
   cd zania
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```
   Open your browser and go to `http://localhost:3000` to view the application.

# Full Stack React Application with LocalStorage Persistence

## Overview
This project provides a simple full-stack application using **React**, **TypeScript**, and **localStorage** for data persistence. The goal is to manage document cards (like Bank Draft, Invoice, etc.) and store them in the browser's `localStorage` for data permanence across page reloads. A mocked REST API is used to fetch and add data to `localStorage`.

## Project Structure

```bash
/project-root                   # Frontend application directory
│   ├── /public                   # Public assets
│   │   ├── favicon.ico           # Favicon for the app
│   │   ├── index.html            # Main HTML file
│   │   ├── manifest.json         # Web app manifest
│   │   └── mockServiceWorker.js   # MSW service worker file
│   │
│   ├── /src                      # Source code for the React app
│   │   ├── /components           # React components
│   │   │   ├── Card              # Component for rendering a single document card
│   │   │   │   └── index.tsx
│   │   │   ├── ImageLoader       # Component for handling image loading with placeholder
│   │   │   │   └── index.tsx
│   │   │   └── (other components)
│   │   │
│   │   ├── /hooks                # Custom hooks
│   │   │   ├── useFetch.ts       # Hook for fetching data
│   │   │   └── useSaveWithInterval.ts # Hook for saving data at intervals
│   │   │
│   │   ├── /mocks                # Mock data and handlers for MSW
│   │   │   ├── browser.ts        # MSW browser setup
│   │   │   └── handlers.ts       # MSW request handlers
│   │   │
│   │   ├── /utils                # Utility functions
│   │   │   └── localStorage.ts   # Utility for managing data persistence with localStorage
│   │   │
│   │   ├── App.tsx               # Main App component that handles drag-and-drop and overlays
│   │   ├── index.tsx             # Entry point for the React application
│   │   ├── data                  # Static JSON data
│   │   │   └── index.json        # Static JSON file with document data
│   │   └── App.css               # CSS styles for the app
│   │
│   ├── Dockerfile                # Dockerfile for building the frontend
│   ├── package.json              # Frontend dependencies and scripts
│   ├── .dockerignore             # Files to ignore in Docker context
│   └── .gitignore                # Git ignore file                   # Environment variables for the backend
│
├── docker-compose.yml            # Docker Compose configuration for the entire application
├── README.md                     # Project documentation
└── tsconfig.json                 # TypeScript configuration file
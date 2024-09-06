## Overview
This project provides a simple full-stack application using **React**, **TypeScript**, and **localStorage** for data persistence. The goal is to manage document cards (like Bank Draft, Invoice, etc.) and store them in the browser's `localStorage` for data permanence across page reloads. A mocked REST API is used to fetch and add data to `localStorage`.

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Steps to Run the Project](#steps-to-run-the-project)
- [API Design](#hypothetical-api-design)
- [Architectural/API Design Approach](#architectural--api-design-approach)

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
```

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

## Architectural / API Design Approach
When approaching the design of this full-stack application, my primary focus was on ensuring simplicity, scalability, and maintainability. Here’s a breakdown of the design approach:

1. Separation of Concerns: I followed a clear separation of responsibilities between the frontend features to ensure that each layer could evolve independently.

2. Local Data Persistence: To meet the requirement of data permanence across reloads, I leveraged the browser's localStorage. This allows the application to persist user data (like the JSON cards) locally, reducing the need for frequent server requests. The application initializes localStorage with default data if not present and retrieves, updates, or adds data as needed.

3. REST API Design: I created a RESTful interface that simulates server-like data fetching using local storage. This approach ensures that data manipulation (fetching, adding new cards) could happen through an API structure, which could later be extended to communicate with a real backend server. The API follows standard REST conventions to keep the structure clean and intuitive.

5. Data Flow: The frontend interacts with this API to fetch, display, and manage the data dynamically. By structuring the API this way, I’ve made it possible to easily swap out the local storage API for a remote server later on, without requiring significant changes to the frontend.

## Hypothetical API Design

### General Principles

1. RESTful Structure: The API will be structured following RESTful conventions, using standard HTTP methods like GET, POST, PUT, and DELETE.
Consistency: Adhering to consistent naming conventions and URL patterns will make the API intuitive for developers to use and extend.
2. Versioning: Incorporating versioning early on (e.g., /api/v1/) will allow for future updates and backward compatibility without breaking existing functionality.
3. Modular & Extensible: Each feature (add, remove, update) will be implemented as separate, self-contained endpoints to facilitate future expansion.

### Endpoints Overview
#### Get All Items

1. **Endpoint**: GET `/api/v1/cards`
2. **Description**: Retrieves all the cards stored in localStorage or database (if later extended).
Response:

```json
{
  "status": "success",
  "data": [
    {
      "type": "bank-draft",
      "title": "Bank Draft",
      "position": 0
    },
    {
      "type": "bill-of-lading",
      "title": "Bill of Lading",
      "position": 1
    }
  ]
}
```

Add New Item

1. **Endpoint:** POST `/api/v1/cards`
2. **Description:** Adds a new card element to the existing list.

Request Payload:

```json
{
  "type": "bank-draft-2",
  "title": "Bank Draft 2",
  "position": 3
}
```

Response:

```json
{
  "status": "success",
  "message": "New card added successfully",
  "data": {
    "type": "bank-draft-2",
    "title": "Bank Draft 2",
    "position": 3
  }
}
```

#### Update Existing Item

1. **Endpoint:** PUT `/api/v1/cards/:id`
2. **Description:** Updates an existing card based on its ID.
Request Payload:

```json
{
  "title": "Updated Bank Draft",
  "position": 2
}
```

Response:

```json
{
  "status": "success",
  "message": "Card updated successfully",
  "data": {
    "type": "bank-draft",
    "title": "Updated Bank Draft",
    "position": 2
  }
}
```

#### Delete Item

1. **Endpoint:** DELETE `/api/v1/cards/:id`
2. **Description:** Removes a card from the list based on its ID.
Response:

```json
{
  "status": "success",
  "message": "Card deleted successfully"
}
```

#### Reorder Items

1. **Endpoint:** PATCH /api/v1/cards/reorder
2. **Description:** Reorders cards based on their updated positions.

Request Payload:

```json
{
  "positions": [
    {"id": 1, "position": 0},
    {"id": 2, "position": 1},
    {"id": 3, "position": 2}
  ]
}
```

Response:

```json
{
  "status": "success",
  "message": "Cards reordered successfully"
}
```

#### Key Considerations for Long-Term Maintenance
1. Versioning: The API starts with /api/v1/ to ensure future iterations can co-exist with older versions without causing breaking changes.

2. Scalability: The API is designed to be extended easily. Future enhancements could include pagination, filtering, or more advanced querying options.

3. Validation: Input validation will be key to ensuring data integrity. Using a tool like Joi (for Node.js) or built-in validation libraries in Python can prevent invalid data from being saved to the database or localStorage.

4. Error Handling: Every endpoint should have robust error handling to ensure clear feedback is given to the client. For example:

```json
{
  "status": "error",
  "message": "Card not found",
  "code": 404
}
```

5. Security: As the application grows, adding authentication (e.g., JWT tokens) and authorization mechanisms can prevent unauthorized access to certain operations.

Example Architecture
Frontend:

React-based UI, which communicates with the API.
Cards displayed via the GET endpoint, with interactions like drag-and-drop updating the order through the PATCH reorder endpoint.
Backend:

LocalStorage simulates database operations (in production, this could be PostgreSQL).
API serves data to the frontend and supports data manipulation (CRUD operations).
This approach ensures that the application can evolve with changing requirements, offering flexibility in how the data is handled and displayed while maintaining best practices in API design.

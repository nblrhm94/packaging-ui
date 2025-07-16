# Package Shipping UI (Frontend)

This is the frontend user interface for the Package Shipping application, built with React and TypeScript. It provides a web page for users to select products, place an order, and see the results of the packaging logic performed by the backend API.

This application is designed to communicate with its corresponding backend service, the **Package Shipping API**. Therefore, the backend application must be running for this UI to function correctly.


*(This is a sample image. You can replace it with a screenshot of your own running application.)*

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)

## Features

-   **Dynamic Product Listing**: Fetches and displays a list of all available products from the backend API on load.
-   **Interactive Selection**: Allows users to select multiple products using checkboxes.
-   **Real-time Price Calculation**: Shows the total price of the currently selected items, with a visual indicator for orders over the $250 split threshold.
-   **Asynchronous Order Placement**: Submits the order to the backend without reloading the page.
-   **Dynamic Result Rendering**: Displays the returned packages, including items, total weight, total price, and courier price for each package.
-   **Loading & Error States**: Provides clear feedback to the user when data is loading or if an API call fails.

## Technology Stack

-   **Framework/Library**: [React](https://reactjs.org/) (v18+) with Hooks
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Bootstrap 5](https://getbootstrap.com/) for a clean, responsive layout.
-   **API Communication**: [Axios](https://axios-http.com/) for making RESTful API calls.
-   **Development Environment**: [Create React App](https://create-react-app.dev/)

## Project Structure

The main application logic is located within the `/src` directory.

    /src
    ├── App.tsx # Main application component, manages state and logic.
    ├── App.css # Styles specific to the App component.
    ├── index.tsx # The entry point of the application, renders the App component.
    ├── index.css # Global application styles.
    ├── types.ts # TypeScript interfaces for shared data structures (Product, PackageResult).
    └── ... # Other standard Create React App files.


## Prerequisites

Before you can run this project, you need to have the following installed on your machine:

-   **Node.js**: Recommended LTS Version 18.x or higher.
-   **npm** (Node Package Manager): Comes bundled with Node.js.

*On macOS, the easiest way to install is with Homebrew: `brew install node`*

## Getting Started

Follow these steps to get the frontend running locally for development.

### 1. Ensure the Backend is Running

**This is the most important step.** This frontend application cannot function without the backend API. Please ensure you have followed the `README.md` for the `packaging-api` project and that it is running on **`http://localhost:8080`**.

### 2. Install Dependencies

Navigate to the root directory of this `packaging-ui` project in your terminal and run the following command to install all the required libraries from `package.json`:

```bash
npm install
```

### 3. Start the Development Server

Once the dependencies are installed, you can start the React development server:

```bash
npm start
```

This command will:

- Start the local development server.
- Automatically open the application in your default web browser.
- The application will be available at http://localhost:3000.
- The server will automatically reload the page whenever you make changes to the code.

### Available Scripts

Runs the app in development mode.
```bash
npm test
```

Launches the test runner in interactive watch mode.
```bash
npm run build
```

Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance. The app is then ready to be deployed.

### Environment Variables

Currently, the backend API URL is hardcoded in src/App.tsx:
```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

For a production build, it is best practice to move this into an environment variable file (e.g., .env.production).
```typescript
REACT_APP_API_BASE_URL=https://your-production-api.com/api
```

And access it in the code via process.env.REACT_APP_API_BASE_URL.
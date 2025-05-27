# Didomi Front-end Engineering Challenge: Consent Management App

A simple consent collection and management application built for the Didomi front-end engineering challenge. This application allows users to submit their consent for various processing activities and view a list of collected consents with pagination.

## Table of Contents

- [Didomi Front-end Engineering Challenge: Consent Management App](#didomi-front-end-engineering-challenge-consent-management-app)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Technical Stack](#technical-stack)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
  - [Running Tests](#running-tests)
    - [Unit Tests (Vitest)](#unit-tests-vitest)
    - [End-to-End Tests (Cypress)](#end-to-end-tests-cypress)
  - [Project Structure](#project-structure)
  - [API Mocking](#api-mocking)
  - [Material UI Integration](#material-ui-integration)
  - [Linting and Formatting](#linting-and-formatting)

## Project Overview

This application fulfills the requirements of the Didomi front-end challenge. It consists of two main views:

1.  **Consent Collection Form:** Users can input their name, email address, and select from a list of consent options. This form is built using Material UI components for a consistent look and feel.
2.  **Consent Management List:** Displays all submitted consents in a Material UI Table with client-side pagination.

The project emphasizes clean code, component-based architecture, thorough testing (unit and E2E), and clear documentation.

## Features

- User submission of name, email, and selected consents via a Material UI form.
- Display of collected consents in a paginated Material UI Table.
- Client-side pagination for the list of consents.
- Mocked HTTP API calls for `GET /consents` and `POST /consents` using Mock Service Worker (MSW).
- Responsive UI built with React and Material UI.
- Unit tests for components and business logic using Vitest and React Testing Library.
- End-to-end tests for user flows using Cypress.
- Clear navigation between views using a persistent sidebar.

## Technical Stack

- **Framework:** React (v19.1.0)
- **UI Library:** Material UI (MUI) - _(Ensure you have `@mui/material`, `@emotion/react`, `@emotion/styled` in your `package.json`)_
- **Build Tool:** Vite
- **Language:** TypeScript
- **Routing:** Wouter (v3.7.0)
- **Styling:** SCSS/Sass (alongside MUI's styling solutions like Emotion or styled-components)
- **API Mocking:** Mock Service Worker (MSW) (v2.8.4)
- **Unit Testing:** Vitest & React Testing Library
- **E2E Testing:** Cypress
- **Linting:** ESLint (configured in `eslint.config.js`)
- **Package Manager:** pnpm (inferred from `pnpm-lock.yaml`)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (e.g., v18.x or v20.x or later recommended for Vite and modern tooling)
- pnpm package manager (e.g., v8.x or later)

## Getting Started

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```
2.  Install dependencies using pnpm:
    ```bash
    pnpm install
    ```

### Running the Development Server

To start the application in development mode (with Hot Module Replacement and MSW active):

```bash
pnpm dev
```

---

The application will typically be available at `http://localhost:5173`. Navigate to this URL in your browser to see the application.

## Running Tests

The project includes both unit tests and end-to-end tests.

### Unit Tests (Vitest)

Unit tests are written using Vitest and React Testing Library. They cover individual components, hooks, and utility functions to ensure they behave as expected in isolation.

1.  **Run all unit tests in watch mode:**
    ```bash
    pnpm test:unit
    # or, if you defined "test" as "vitest":
    # pnpm test
    ```
2.  **Run unit tests with an interactive UI:**
    This provides a better visual overview of your test suites.
    ```bash
    pnpm test:ui
    ```
3.  **Run tests once and generate a coverage report:**
    ```bash
    pnpm coverage
    ```
    The coverage report will be available in the `coverage/` directory.

### End-to-End Tests (Cypress)

E2E tests are written using Cypress to simulate real user scenarios and test the application flows from start to finish.

1.  **Open the Cypress Test Runner (GUI):**
    Ensure your development server (`pnpm dev`) is running in a separate terminal before starting Cypress.

    ```bash
    pnpm cy:open
    ```

    This will open the Cypress application, allowing you to select and run specific E2E tests or all of them.

2.  **Run Cypress tests headlessly (e.g., for CI environments):**
    This command will run all E2E tests in a headless browser. Ensure the development server is running.
    ```bash
    pnpm cy:run
    ```

E2E test specification files are located in the `cypress/e2e/` directory. The main Cypress configuration can be found in `cypress.config.ts` at the root of the project.

## Project Structure

A brief overview of the key directories and files:

- `public/`: Contains static assets, including the `mockServiceWorker.js` generated by MSW.
- `src/`: Contains the core application source code.
  - `components/`: Reusable UI components shared across different parts of the application (e.g., `Sidebar.tsx`).
  - `layout/`: Components responsible for the general page structure (e.g., `PageLayout.tsx`).
  - `mocks/`: Configuration for Mock Service Worker.
    - `browser.ts`: Sets up MSW for browser environments.
    - `db.ts`: In-memory database for mock data.
    - `handlers.ts`: Defines the request handlers for MSW.
    - `server.ts`: Sets up MSW for Node.js environments (used in Vitest).
  - `pages/`: Components representing individual pages or views of the application (e.g., `GiveConsent.tsx`, `Consents.tsx`).
  - `tests/`: Contains global test setup files like `setup.ts` for Vitest.
  - `App.tsx`: The main application component, responsible for setting up routing.
  - `main.tsx`: The application entry point. Initializes React and MSW for the browser.
  - `vite-env.d.ts`: TypeScript declarations for Vite-specific environment variables.
- `cypress/`: Contains all E2E tests and Cypress-specific configurations.
  - `e2e/`: Holds the E2E test specification files (e.g., `consent_flow.cy.ts`).
  - `support/`: Files for custom Cypress commands and global test setup for E2E tests.
- `eslint.config.js`: ESLint configuration file.
- `package.json`: Project metadata, dependencies, and scripts.
- `pnpm-lock.yaml`: Exact versions of dependencies.
- `tsconfig.json` (and related `tsconfig.*.json` files): TypeScript compiler configurations.
- `vite.config.ts`: Vite build tool and Vitest configuration.
- `cypress.config.ts`: Cypress E2E testing configuration.

## API Mocking

HTTP API calls for `GET /consents` and `POST /consents` are intercepted and mocked using Mock Service Worker (MSW) to ensure the application can be developed and tested without a live backend.

- **For Browser (Development & E2E Tests):** MSW is initialized via `src/main.tsx` using the browser worker setup in `src/mocks/browser.ts`. The service worker script itself is `public/mockServiceWorker.js`.
- **For Node.js (Unit Tests with Vitest):** A mock server is set up using `msw/node` in `src/mocks/server.ts`. This server is started before all unit tests and closed after, as configured in `src/tests/setup.ts`.

The request handlers logic is shared and defined in `src/mocks/handlers.ts`, which interacts with an in-memory "database" located in `src/mocks/db.ts`. This ensures consistent mock behavior across development, unit tests, and E2E tests.

## Material UI Integration

This project uses Material UI (MUI) as its component library. Components like TextFields, Buttons, Checkboxes, Tables, and Pagination are sourced from `@mui/material` to provide a consistent and accessible user interface. The default MUI theme is used, but it can be customized by wrapping the application in a `ThemeProvider` with a custom theme object if desired. SCSS is used for custom page and component-level styling that complements MUI.

## Linting and Formatting

The project is set up with ESLint for code linting, using configurations defined in `eslint.config.js`. It's recommended to integrate a code formatter like Prettier and configure it to work alongside ESLint for consistent code style.

To run the linter:

```bash
pnpm lint
```

This helps maintain code quality and consistency across the project.

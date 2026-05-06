# Real-Time Stock Dashboard

## Overview

This project is a single-page application that displays a list of stocks with real-time price updates.

It fetches an initial dataset and then updates prices live via a subscription, indicating whether each stock has gone up or down and briefly highlighting changes with a flash animation.

The focus of the implementation was to keep the code simple, predictable, and easy to follow while handling real-time updates correctly.

---

# Getting Started

## Prerequisites
- Node.js >= 20

## Install dependencies
`npm install`

## Run the application
`npm run dev`

## Run tests:
`npm run test`

# Implementation Notes

## State Management
* Redux Toolkit is used to manage stock data, as it represents shared, continuously updating state across the application.
* Each stock tracks its previousPrice to enable comparison between updates and drive UI behaviour (colour + animation).
* Transient UI behaviour (such as the flash animation) is handled locally within components using React state, as it is short-lived and purely presentational.

## Data Fetching & Real-Time Updates
* Initial data is fetched via Axios from /stocks.json
* A simple runtime check (isStockArray) ensures the fetched data is in the expected format before storing it. This is intentionally lightweight given the controlled data source.
* Real-time updates are handled through the provided subscribeToStockUpdates service
* Updates are merged into existing state via Redux. This keeps data flow centralised and predictable while keeping components focused on rendering.

## Animation Approach
The price change “flash” is modelled as transient state within each StockItem.

When a price update occurs:
* a temporary flash state is set (up / down)
* a CSS animation class is applied
* the state is reset using the animationend event

This avoids timing-based logic (e.g. setTimeout) and ensures the animation reliably retriggers on every update, even when values change in the same direction.

## Testing

* Reducer tests cover:
    * loading and error state transitions
    * stock updates and previousPrice logic
* Component tests cover:
    * loading state
    * error state
    * rendering of stock data
    * price change indicators

The goal was to validate core behaviour without over-testing implementation details.

## Trade-offs
Redux is used here to align with the exercise requirements and to manage shared real-time state.

In a production setting, I would likely consider a server-state library such as React Query or RTK Query for the initial fetch, while still keeping streaming updates in a central store.

The implementation avoids over-abstraction in favour of readability and maintainability.

## Project Structure

```text
src/
  features/
    stocks/
      StockList.tsx          // Renders grid/list of all stocks + handles loading/error states
      StockItem.tsx          // Individual stock card + price direction UI + flash animation
      stocksSlice.ts         // Redux slice (state, reducers, real-time updates)
      useStocks.ts           // Custom hook: fetch initial data + subscribe to live updates
      types.ts               // Shared TypeScript types for stock domain
      *.test.ts(x)           // Unit tests for slice + UI components
      *.module.css           // Scoped styles for stocks feature components

  store/
    store.ts                 // Redux store configuration (single source of truth)

  services/
    mockStockService.ts      // Mock API + real-time stock update simulator
```

# ORIGINAL EXERCISE BRIEF

# Frontend Take-Home Exercise: Real-Time Stock Dashboard

Welcome to the frontend developer take-home exercise! 
For this assignment, candidates are asked to build a real-time stock tracking dashboard.

## Objective

Create a Single Page Application (SPA) dashboard that displays a list of stocks. The application should fetch an initial list of stocks and their prices, then update those prices in real-time.

Please do not use AI to complete this exercise.

## Tech Stack Requirements
Your solution MUST use the following technologies:
- React 18
- TypeScript (Strict mode enabled)
- Redux Toolkit (for state management)
- Axios (for initial fetching)
- Jest / React Testing Library (for unit testing)

CSS can be written in vanilla CSS, CSS Modules, or any CSS-in-JS library you are comfortable with. 

## The Mock Service

This boilerplate comes with a mock service located in `src/services/mockStockService.ts`. It exposes two methods:
1. `GET /stocks.json`: A static endpoint mimicking an API response. You MUST use Axios to request this file (e.g., `axios.get('/stocks.json')`) to fetch the starting list of stocks. 
2. `subscribeToStockUpdates(callback)`: Provides a real-time feed that triggers your callback with a single updated stock object every second.

## Requirements

1. **Architecture**: Set up Redux Toolkit to store `stocks`. Assume the application could grow. Structure your files and slices cleanly.
2. **Dashboard UI**:
    - Build a grid or list of stocks showing symbol and current price.
    - Provide a clean and modern design. It does not have to be overly complex but should demonstrate your CSS/UI skills.
3. **Real-Time Updates**:
    - When a price updates, display it in red if it has gone down since last update, green if it has gone up.
4. **Testing**:
    - Write unit tests for your Redux slice (reducers).
    - Write at least one component test that renders the stock list using Jest and React Testing Library.

**Bonus**:
- When a price updates, temporarily highlight the stock cell/item (e.g., flash green if the price goes up, and red if it goes down).

## Getting Started

1. Make sure you're using node version >= 20
2. `npm install`
3. `npm run dev`

To run tests:
`npm run test`

## Submission Guidelines

Please zip your project (excluding the `node_modules` folder) or provide a link to a public GitHub repository. Include instructions on how to start the app if you modified the scripts.

Good luck!

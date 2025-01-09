# React.js E-commerce App

This is a simple React.js application that simulates an e-commerce platform. The app uses dummy JSON data for products and includes essential React features like conditional rendering, reusable components, reactivity, and routing with authentication.

## Main Features

- View list products
- View detail products
- View carousel products
- View recommendation products
- User can use slider products
- User can add a shopping cart
- User can buy now
- User can login to dashboard
- User can view account detail
- User can view total purchased items
- User can view total amount spent
- User can view purchase history

## Other Features

- Login functionality with route protection (private routes).
- Logout functionality to clear user sessions.
- Conditional rendering based on user interaction.
- Reusable and styled components.
- TypeScript support for better type checking.
- Routing and authentication using React Router.
- State Management using React Context
- Fetch data axios with instance and custom hooks services
- ESLint for code linting and best practices.

---

## Installation

Follow these steps to run the application locally:

### Prerequisites

- Node.js (v16 or later) and npm installed.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/MickeyStrike/dot-tes.git
   cd dot-tes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:5173
   ```

---

## Dummy Data

To test the app, use the following dummy login credentials:

- **Username**: `admin`
- **Password**: `admin`

Dummy product data is included in the application using [dummyjson](https://dummyjson.com)

---

## Application Structure

```
src/
|-- components/    # Reusable components like product cards and headers.
|-- pages/         # Page-level components (Login, Home, ProductDetails).
|-- constant/      # Constant folder containing the base url of dummyjson and the endpoint of dummyjson
|-- hooks/         # Hooks folder containing custom hooks
|-- providers/     # Contains to store context using react context
|-- router/        # Router folder contains routers from each page
|-- App.tsx        # Main app entry point with routing setup.
|-- index.tsx      # Application bootstrap file.
|-- styles/        # Global and styled component styles.
```

---

## Scripts

- Start the development server:
  ```bash
  npm run dev
  ```

- Build the production version:
  ```bash
  npm run build
  ```

- Run ESLint to check for linting issues:
  ```bash
  npm run lint
  ```

---

## License

This project is licensed under the MIT License.

---

## Contributing

Feel free to open issues or submit pull requests to enhance this application. Ensure your contributions adhere to the project's coding standards by running:

```bash
npm run lint
```

---


# **Backend Setup for Project**

## **Dependencies**

The following dependencies are installed for the backend:

1. **Express**
   - Lightweight and fast web framework for building REST APIs and handling HTTP requests.
   - Used to set up routes, middleware, and server configuration.

2. **Mongoose**
   - ODM (Object Document Mapper) for MongoDB.
   - Provides schema-based solutions to model application data.

3. **Jsonwebtoken**
   - Library for implementing token-based authentication.
   - Ensures secure communication between frontend and backend.

4. **Bcrypt**
   - Used for hashing passwords securely.
   - Protects user credentials in the database.

5. **Cors**
   - Enables Cross-Origin Resource Sharing.
   - Allows the backend to serve requests from the frontend hosted on different domains/ports.

6. **Dotenv**
   - Loads environment variables from a `.env` file into `process.env`.
   - Keeps sensitive configuration like API keys and database URIs secure.

7. **Body-Parser**
   - Parses incoming request bodies in JSON and URL-encoded formats.
   - Essential for handling POST and PUT requests.

8. **Multer**
   - Middleware for handling file uploads.
   - Used to manage and store files like images, documents, etc., in the project.

9. **Stripe**
   - Payment processing library.
   - Used for integrating secure payment gateways into the application.

10. **Validator**
    - Provides string validation and sanitization.
    - Ensures user input meets specified criteria.

11. **Nodemon**
    - Development tool to restart the server automatically whenever file changes are detected.
    - Speeds up the development process.

---

## **Setup Instructions**

1. Clone the repository:
   ```bash
   git clone https://github.com/gasbygasplc/Supply-Chain-Management-for-Gas-By-Bas-PLC.git
   ```

2. Navigate to the backend folder:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run server
   ```

5. Confirm the Server connected and verify the backend is working:
   ```bash
   Message show on backend : 
   ```

---

## **Why These Packages Were Installed?**

- **Express**: To create REST APIs and handle routing.
- **Mongoose**: For interacting with MongoDB using schemas and models.
- **Jsonwebtoken**: To implement secure user authentication.
- **Bcrypt**: To encrypt user passwords for added security.
- **Cors**: To enable communication between frontend and backend on different origins.
- **Dotenv**: To manage sensitive environment variables securely.
- **Body-Parser**: To handle JSON and URL-encoded request payloads.
- **Multer**: To manage file uploads efficiently.
- **Stripe**: To process online payments securely.
- **Validator**: To validate and sanitize user inputs.
- **Nodemon**: To streamline backend development by auto-restarting the server on changes.

---

### **Initial Kickoff Project**

**Date**: 26th December 2024 (Thursday)  
---

## **Key Discussion Points**

### **1. Tech Stack**
- **Frontend**: React.js, Bootstrap, TailwindCSS, Material UI.
- **Backend**: Express.js.
- **Database**: MongoDB.
- **Authentication**: Token-based authentication.
- **Additional Tools**: API handling.
- **Mobile Device Support**: PWA (Progressive Web Apps).
---

**Prepared By**: Harishanth Kandeepan
**Date**: 26th December 2024
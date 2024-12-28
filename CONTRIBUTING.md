## How to Contribute

### 1. Reporting Issues
- Use the **GitHub Issues** section to report bugs or suggest new features.
- Provide as much detail as possible:
  - Steps to reproduce the issue.
  - Expected and actual outcomes.
  - Environment details (e.g., OS, browser, Node.js version).

---

### 2. Suggesting Features
- Open a **feature request issue** to propose new ideas.
- Include a clear explanation of the feature and its use case.

---

### 3. Submitting Code
#### **Step 1: Fork the Repository**
1. Fork this repository to your GitHub account.
2. Clone the forked repository to your local machine:
   ```bash
   git clone https://github.com/your-username/Supply-Chain-Management-for-Gas-By-Gas-PLC.git
   ```
3. Navigate to the project directory:
   ```bash
   cd Supply-Chain-Management-for-Gas-By-Gas-PLC
   ```

#### **Step 2: Create a New Branch**
- Use a descriptive name for your branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### **Step 3: Make Changes**
- Ensure code changes are well-documented.
- Write tests for new features or bug fixes.
- Follow the [naming conventions](#naming-conventions).

#### **Step 4: Commit Changes**
- Use clear and descriptive commit messages:
   ```bash
   git add .
   git commit -m "[Feature] Add functionality for XYZ"
   ```

#### **Step 5: Push Changes**
- Push the changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

#### **Step 6: Create a Pull Request**
- Go to the original repository on GitHub.
- Click **Pull Requests** and then **New Pull Request**.
- Select your fork and branch, and describe your changes clearly.

---

## Development Guidelines

### Code Style
- Use consistent formatting based on the project’s linting rules.
- Backend: Follow JavaScript/Node.js best practices.
- Frontend: Use modern React.js conventions and ensure components are reusable.

### Testing
- Add tests for all new features and bug fixes.
- Ensure all tests pass before creating a pull request.

### Branch Naming
- Use the following convention:
  - `feature/<feature-name>` for new features.
  - `fix/<issue-name>` for bug fixes.
  - `chore/<task-name>` for maintenance tasks.

---

## Naming Conventions

### **File Naming Conventions**
#### 1. **General Recommendations**
- Use `lowercase` with dashes (`-`) or underscores (`_`) to separate words in file names.
- File extensions should match the file's purpose (`.js` for JavaScript, `.css` for styles, `.json` for configuration, etc.).

#### 2. **Frontend (React.js)**
| File Type         | Naming Convention Example      |
|-------------------|---------------------------------|
| Component Files   | `PascalCase`                   |
|                   | E.g., `Header.js`, `UserForm.js` |
| Context/Provider  | `PascalCase`                   |
|                   | E.g., `AuthContext.js`         |
| Hook Files        | `camelCase` prefixed with `use`|
|                   | E.g., `useAuth.js`, `useFetch.js` |
| Style Files       | Match component names          |
|                   | E.g., `Header.css`             |
| Utility Files     | `camelCase`                    |
|                   | E.g., `apiHelper.js`, `formatDate.js` |
| Pages             | `PascalCase`                   |
|                   | E.g., `Dashboard.js`, `AdminPanel.js` |

#### 3. **Backend (Node.js/Express)**
| File Type        | Naming Convention Example       |
|------------------|----------------------------------|
| Controllers      | `camelCase`                     |
|                  | E.g., `authController.js`       |
| Routes           | `camelCase`                     |
|                  | E.g., `authRoutes.js`           |
| Models           | `PascalCase`                    |
|                  | E.g., `User.js`, `GasRequest.js`|
| Middleware       | `camelCase`                     |
|                  | E.g., `authMiddleware.js`       |
| Utility Functions| `camelCase`                     |
|                  | E.g., `errorHandler.js`, `sendMail.js` |
| Config Files     | `lowercase`                     |
|                  | E.g., `db.js`, `env.js`         |

---

### **Function Naming Conventions**
#### 1. **General Rules**
- Use `camelCase` for regular functions.
- Use `PascalCase` for classes and constructors.

#### 2. **Backend**
| Function Type       | Naming Convention Example       |
|---------------------|----------------------------------|
| Controller Functions| `camelCase`                     |
|                    | E.g., `registerUser`, `approveRequest` |
| Utility Functions   | `camelCase`                     |
|                    | E.g., `validateToken`, `formatResponse` |
| Middleware Functions| `camelCase`                     |
|                    | E.g., `checkAuth`, `logRequests` |

#### 3. **Frontend**
| Function Type       | Naming Convention Example       |
|---------------------|----------------------------------|
| React Component     | `PascalCase`                    |
|                    | E.g., `UserDashboard`, `AdminPanel` |
| Event Handlers      | `camelCase` prefixed with `on`   |
|                    | E.g., `onClickSubmit`, `onInputChange` |
| Hooks               | `camelCase` prefixed with `use` |
|                    | E.g., `useAuth`, `useFetch`       |
| Utility Functions   | `camelCase`                     |
|                    | E.g., `formatDate`, `calculateTotal` |

---

### **Examples in Practice**

#### **Frontend: React Component**
```jsx
// Example: UserDashboard.js
import React from "react";

const UserDashboard = () => {
    const onClickSubmit = () => {
        console.log("Submit clicked");
    };

    return (
        <div className="dashboard">
            <button className="button button--primary" onClick={onClickSubmit}>
                Submit
            </button>
        </div>
    );
};

export default UserDashboard;
```

---

#### **Backend: Controller**
```javascript
// Example: gasController.js
const GasRequest = require("../models/GasRequest");

const createGasRequest = async (req, res) => {
    try {
        const gasRequest = new GasRequest(req.body);
        await gasRequest.save();
        res.status(201).json(gasRequest);
    } catch (error) {
        res.status(500).json({ error: "Error creating gas request" });
    }
};

module.exports = { createGasRequest };
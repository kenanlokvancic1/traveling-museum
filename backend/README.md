# How to Run

First, open the terminal.<br>
<br>
Use `npm i` to install dependencies.<br>
<br>
On a fresh install, we need to run the following commands, in order to have the database:<br>
<br>
`npx sequelize db:create` <br>
`npx sequelize db:migrate`<br>
`npx sequelize db:seed:all`<br>

If we want to reinitialize it, we must run the following commands:<br>
`npx sequelize db:drop` <br>
`npx sequelize db:create` <br>
`npx sequelize db:migrate`<br>
`npx sequelize db:seed:all`<br>

If we already have the database, the steps are as following:<br>
`npx sequelize db:migrate`<br>
`npx sequelize db:seed:all`<br>

# Best Practices

This document outlines the best practices for our project to ensure consistency and maintainability on the backend.

## Commit Types

We follow a conventional commit message format to maintain a readable and meaningful commit history. Each commit message should start with a type, followed by an optional scope, and a concise description.

**Allowed commit types:**

- **feat:** Introduce new functionalities or remove existing ones in routes, services, controllers, or DTOs.
- **fix:** Correct backend defects introduced by prior commits.
- **refactor:** Modify backend code structure without changing behavior (e.g., reorganizing services, optimizing controllers).
- **perf:** Backend-specific performance improvements (e.g., query optimizations, service performance tweaks).
- **style:** Changes related to code formatting, not functionality (e.g., spacing, semicolons).
- **test:** Add or update unit, integration, or end-to-end tests.
- **docs:** Update backend documentation (e.g., README, API specs).
- **build:** Changes to build processes, dependencies, database migrations, or versioning.
- **ops:** Infrastructure, CI/CD pipelines, deployment scripts, or monitoring updates.
- **chore:** Other maintenance tasks (e.g., updating .gitignore, modifying configs).


**Example:**

```
feat: add password reset endpoint
```

<br>

## Folder & File Naming Convention

### JavaScript Files

Use **camelCase** for backend files, and suffix files based on their type:

- `.service.js` for services
- `.controller.js` for controllers
- `.route.js` for routes
- `.middleware.js` for middleware

**Examples:**

- `user.service.js`
- `auth.middleware.js`
- `user.route.js`
- `auth.controller.js`

### DTOs

Use **PascalCase** for Data Transfer Objects (DTOs).

**Examples:**

- `CreateUserDTO.js`
- `UpdateProfileDTO.js`

### Seeders

Format: `{number}-seed-{description}.cjs`

**Examples:**

- `001-seed-users.cjs`
- `002-seed-museums.cjs`

### Folders

Use **camelCase** for all folder names.

**Examples:**

- `src/controllers/`
- `src/services/`
- `src/routes/`
- `src/middleware/`
- `src/dtos/`
- `src/seeders/`

---

## Project Structure Example

```
backend/
  controllers/
    auth.controller.js
    user.controller.js
  services/
    auth.service.js
    user.service.js
  routes/
    auth.route.js
    user.route.js
  middleware/
    auth.middleware.js
    errorHandler.middleware.js
  dtos/
    CreateUserDTO.js
    LoginDTO.js
  seeders/
    001-seed-users.cjs
    002-seed-roles.cjs
```

---

## Function & Variable Naming Convention

Use **camelCase** for functions and variables.

**Examples:**

```javascript
function validateUserData(data) {
  // ...
}

const tokenExpirationTime = 3600;
```

---

## Branch Naming Convention

Format: `<category>/<trello-task-number>-<short-description>`

**Categories:**  
`controllers`, `services`, `routes`, `middleware`, `seeders`, `dtos`, `backend`

**Examples:**

- `controllers/1.2.3-create-user-controller`
- `services/2.1.5-optimize-login-service`
- `seeders/3.3.7-add-default-roles`

---

## Additional Notes

- **Services** handle business logic.
- **Controllers** should be minimal and delegate to services.
- **Routes** connect HTTP methods to controllers.
- **Middleware** should handle validation, authentication, error handling.
- **DTOs** define request body structures and validation.
- **Seeders** should follow chronological order and have clear naming.

---

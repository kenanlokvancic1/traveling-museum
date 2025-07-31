# How to Run

Open the terminal.
Next up is to install all dependencies that are listed in the package.json file by typing `npm i`
Use `npm run dev` in order to start the local server.

# Best Practices

This document outlines the best practices for our project to ensure consistency and maintainability on the frontend.

## Commit Types

We follow a conventional commit message format to make our commit history more readable and meaningful. Each commit message should start with a type, followed by an optional scope, and a concise description.

**Allowed commit types:**

- **feat:** Introduce new functionalities or remove existing ones from the API or UI.
- **fix:** Correct API or UI defects introduced by prior feature commits.
- **refactor:** Modify the codebase structure without altering API or UI behavior.
- **perf:** A subset of refactor commits specifically aimed at improving performance.
- **style:** Address stylistic concerns, such as whitespace, formatting, or missing semicolons, without impacting code functionality.
- **test:** Augment test coverage by adding new tests or rectify existing tests.
- **docs:** Focus solely on changes to documentation.
- **build:** Pertain to alterations in build components, including build tools, continuous integration pipelines, dependencies, and project versioning.
- **ops:** Relate to modifications in operational aspects, such as infrastructure, deployment procedures, backups, and recovery mechanisms.
- **chore:** Cover miscellaneous tasks, such as updating the `.gitignore` file.

**Example:**

```
feat: add email notifications on new direct messages
```

<br>

## Folder & File Naming Convention

**JavaScript Files:** Use _camelCase_ for file names.
Example:

> userProfile.js

> createUserAccount.js
> <br>

## Folders

Use **camelCase** for folder names for consistency.

**Example:**

> src/components

> src/utils

<br>

## For UI components, use meaningful names and a folder structure that clearly reflects their purpose.

**Example:**

> src/components/CuratorSidebar/CuratorSidebar.js

> src/components/Navbar/Navbar.js

<br>

## Utility Functions

Use **camelCase** for utility function files.

**Example:**

- Utility Functions: camelCase (e.g., useFetch.js, formatDate.js)
- Stylesheets: PascalCase.styles.js (e.g., Button.styles.js)
- State Management Files: camelCase (e.g., userStore.js)

<br>

## Function & Variable Naming Convention

Maintain consistency in naming functions and variables for better readability.

Use **camelCase** for both functions and variables.

**Example:**

```javascript
function handleLogin() {
  // ...
}

const userDetails = {
  // ...
};
```

<br>

## Branch naming:

> <category>/<trello-task-number>-<1 word>-<2 word..>

### Examples:

> components/1.1.2-sidebar-feature

> backend/1.1.1-api-endpoint

> pages/4.6.11-add-museum-page

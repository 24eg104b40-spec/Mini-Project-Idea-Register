# Mini Project Idea Register

A beginner-friendly full-stack CRUD application for storing student mini-project ideas.

## Requirements

- Java 17 or later
- Maven
- Node.js and npm
- No database installation required; H2 runs locally inside the backend

## Local H2 database

The application uses an embedded file-based H2 database. It stores data in
`backend/data/project_idea_db` and creates the `projects` table automatically
through JPA/Hibernate. No MySQL setup or credentials are required.

The optional H2 console is available at `http://localhost:8080/h2-console`.
Use these values to connect:

```text
JDBC URL: jdbc:h2:file:./data/project_idea_db
User Name: sa
Password: (empty)
```

## Run the backend

From the project root:

```powershell
cd backend
mvn spring-boot:run
```

The API runs at `http://localhost:8080`.

## Run the frontend

In a second terminal, from the project root:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## CRUD API

The React frontend uses Axios to communicate with `http://localhost:8080/api/projects`:

- `GET /api/projects` loads all projects.
- `POST /api/projects` adds a project.
- `PUT /api/projects/{id}` updates an existing project.
- `DELETE /api/projects/{id}` deletes a project.

To verify all operations, add a project, edit it and save, then delete it after confirming the browser dialog. Required project title and student name fields are validated in both the frontend and backend.

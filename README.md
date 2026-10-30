# Mini Project Idea Register

A beginner-friendly full-stack CRUD application for storing student mini-project ideas.

## Requirements

- Java 17 or later
- Maven
- Node.js and npm
- MySQL

## Create the MySQL database

Open MySQL and run:

```sql
CREATE DATABASE project_idea_db;
```

The application creates the `projects` table automatically through JPA/Hibernate.

## Configure MySQL credentials

Open [backend/src/main/resources/application.properties](backend/src/main/resources/application.properties) and replace:

```properties
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Use the username and password from your local MySQL installation.

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

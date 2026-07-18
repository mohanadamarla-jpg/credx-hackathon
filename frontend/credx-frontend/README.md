# CredX PS1 Matching Dashboard

This project is a student-focused job matching dashboard built with Angular for the frontend and a local rule-based matching approach for the recommendation logic. The experience allows students to enter a profile with their skills, GPA, work authorization status, and sponsorship needs, then view ranked job opportunities with clear explanations of why each listing matched. The interface also includes filters for role, location, work mode, and sponsorship requirement so students can narrow the results quickly.

The implementation was created using Angular, TypeScript, Reactive Forms, and Vitest. The matching logic is fully local and explainable, with no external APIs or LLM services involved. The dashboard is designed as a clean demo of how a matching platform could work for PS1-style recruitment use cases.

To run the application locally, navigate to the frontend project folder and install dependencies with npm install. Then start the app with npm start, which launches the development server at http://localhost:4200/. To build the project, use npm run build. To run the automated tests, use npx vitest run.

The main application logic is organized around the dashboard component, the match scoring service, and the local jobs service, which together provide the profile form, filter controls, ranked listings, and explanation panel seen in the UI.

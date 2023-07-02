# SecRadar - 🛡️ Your AppSec Dashboard

SecRadar is a mobile-focused web application that provides administrators, executives, and team leaders in DevSecOps processes with a daily visualization of Checkmarx One platform results. Its main goal is to facilitate informed decision-making through an executive dashboard that presents security scan results and offers key indicators to assess the security status of applications.

## Scope 🎯

The application will be developed using the Angular framework and will be accessible from mobile devices. It will consume data from a database and have an API to display relevant information on the dashboard.

## Features 🧪
This application allows you to:

- 🔒 **Local user login:** Users will be able to access the application through a local authentication system.
- 📊 **Centralized dashboard with scan results:** The dashboard will display security scan results in a clear and organized manner to facilitate understanding of the current situation.
- 🎯 **Configured Key Performance Indicators (KPIs):** Key indicators (KPIs) will be configured to reflect the security status of applications and evaluate their risk level.
- 🔍 **Graphics by result severity:** Users will be able to filter scan results by severity (high, medium, low, informational) to prioritize necessary actions.
- 🛠️ **Graphics by scan type:** The option to filter results by scan type (SAST, SCA, IaC) will be provided to visualize security from different perspectives.
- ⚠️ **Threshold breach alerts:** The application will send automatic alerts to users when scan results exceed the established vulnerability thresholds. This way, users can take quick and preventive measures in response to risk situations.
 
## Initial Design and Workflow 🎨

- Link to [Figma](https://www.figma.com/proto/fVmJDL4qNGh6wq6mL84ub7/SecRadar?type=design&node-id=144-682&scaling=scale-down&page-id=0%3A1) presentation.
- Link to our [Trello Board](https://trello.com/b/2aCoMn0k/finalprojectwd).

## Technologies 👾 

Link to [Backend repo](https://github.com/PVmendez/FinalProject_backend/)
- Npm
- Angular
- Typescript
- MongoDB
- Ionic
- NodeJS
- Express

## How to run 🏃
1. Clone backend repo to your pc.
2. Create the environment variables file based in the env.example file in the repo.
3. Install dependencies (run the command: npm install) .
4. Whitelist your ip in MongoDB (if you don't have credentials to do it, ask one of the team members to whitelist you).
5. run the command 'npm run start'.
6. In your terminal, you will see that the backend is listening in port 3000 and the database connection was established.
7. Clone frontend repo to your pc.
8. Install dependencies (run the command: npm install).
9. Launch the frontend in your browser (command: ng serve -o).
10. Login and use the app. 

## Credits 💪

This app is developed and maintained by: Joel Alayón, Matías Ferreira, Valentino Mendez, Sebastián Olivera, Belén Peirano, and Juan Tabarez. For the "Desarrollo Web y Mobile" course at Universidad Católica del Uruguay.

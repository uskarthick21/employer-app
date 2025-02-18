![image](https://github.com/user-attachments/assets/0304d6a4-7910-42d9-95b2-3c528d8374b8)

## Welcome!

This repository contains the final code for the code test.
It has two folders: **employer-App (Front End)** and **employer-backend (Back End)**.
The user needs to run both folders in the terminal via a code editor (Visual Studio Code) to view the application successfully.

## Technical Requirements

employer-app (Front End):

- Node v20.16.0
- NPM 10.8.1
- React ^19.0.0
- Typescript
- Redux
- Redux toolkit
- Redux Saga
- Css (Plain css with Responsive web design)
- Vite for Create react app.
- Testing for Vitest
- For Api communication Axios

employer-backend (Back End):

- Node v20.16.0
- NPM 10.8.1
- Express js (server)
- Typscript

## My Plan on this Task

The requirement is make simple app without much using of external libraires. So my plan is below.

- Create a React app using the Vite package.

- As mentioned in the requirement, I generated `sample-data.json` and created **employer-backend (Back End)** for this application.
  The reason I decided to do this is that I plan to use **Redux-Saga** for asynchronous calls. Instead of loading `sample-data.json` directly in **employer-app (Front End)**, it is more secure and efficient to fetch the data from a server.
  So, I created a basic backend server using **Node.js** and **Express.js**, which serves the data from `sample-data.json` as a response to **employer-app (Front End)**.

- Use plain CSS with a responsive design. As mentioned in the requirement to reduce the usage of external libraries, I decided not to use any frameworks like **Bootstrap or Tailwind**. Instead, I used plain CSS with RWD to demonstrate my skills in CSS.

- I understood the design requirements from the wireframes located in `/materials/wireframes`.
  - As mentioned in the requirement, (`The roster should be represented in a "card" layout (see wireframe summary-view.png) which initially shows minimal employee information consisting of the employee's name, avatar picture and with personal info`. `Clicking on a card should highlight the card in some way and render additional information in a modal overlay`).
  - However, `summary-view.png` the design appears in a table format. But according to the requirement, the user wants a `card layout` that is clickable. Therefore, I decided to design the component using `div` elements while keeping responsive **design (RWD)** in mind.
  - For the detail view `(detail-view.png)`, I developed the component according to the given requirements.

## How to run the application

- Clone or download from following github repo. I marked this repo as `public`, So user can view all my commit history.
  - **Git hub url:** https://github.com/uskarthick21/employer-app
- Locate the Downloaded File. The downloaded file will be named `employer-app-master` in your Downloads folder.

- Extract the ZIP File. Unzip the folder and open it.

- Inside the unzipped folder, you will find two main directories:

  - **employer-app (Front End)**
  - **employer-app (Front End)**

- Open VS Code or any other preferred code editor. Open Project Folders in Separate Tabs
- Open both and in separate tabs in VS Code. Open two terminals one for frontEnd another for backEnd:

  - **employer-app (Front End)**
  - **employer-app (Front End)**

- Terminal paths should look like this:

  - **Example 1:** `\employer-app-master\employer-app>`
  - **Example 2:** `\employer-app-master\employer-backend>`

- To Install Dependencies, run the following command in each terminal:

  - **Example 1:** `\employer-app-master\employer-app> npm install `
  - **Example 2:** `\employer-app-master\employer-backend> npm install`

- To Start the Application, once the installation is complete, start both the frontend and backend servers using:

  - **Example 1:** `\employer-app-master\employer-app> npm run dev`
  - **Example 2:** `\employer-app-master\employer-backend> npm run dev`

- **⚠️ IMPORTANT:** `.env `File Information.
- The .env file is included in this project for interview purposes.
- Normally, this is not recommended in real-world projects due to security concerns.
- If the .env file is missing, you will need to create it manually inside the application. Below the steps for manual creation.
- create a file `.env` and place the text `VITE_API_BASE_URL=http://localhost:3000/api` and put the file inside `employer-app/src`. The `.env` should be inside `src` folder. This is for frontEnd.
- create a file `.env` and place the text `PORT=3000` and put the file inside `employer-backend/src`. The `.env` should be inside `src` folder. This is for backEnd.
- Then stop the application from running and restart both **employer-backend (Back End)** and **employer-app (Front End)** enviroment by this command `npm run dev` and application load perfectly.



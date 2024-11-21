# eVoting System
This website is hosted with afrihost reachable at: [https://](https://evoting.co.za/)
The eVoting System is a secure and user-friendly platform for conducting elections digitally. This project allows registered voters to securely cast their votes for candidates, view real-time election results, and analyze voter turnout statistics.

## Tasks
### Task 1
Website template integrated from: [( https://www.free-css.com/free-css-templates/page290/brainwave ) ](https://www.free-css.com/free-css-templates/page290/brainwave)
### Task 2
Class Diagram
![image](https://github.com/user-attachments/assets/aa1e5e1a-4b21-417c-9b43-6af8a7ede5a7)
### Task 3
Implemented throughout the application
### Task 4
This website is built using firebase realtimeDB which is a NoSQL database
### Task 5
Registration verification can be found in: src/services/validationService
Email API verification can be found on line 23 of that file.
### Task 6
Authentication via firebase authentication
### Task 7
GitHub Repo: https://github.com/Aahdeal/eVoterElections


## Features
User Registration and Authentication:
Uses Firebase Authentication for secure login and registration.

## Vote Casting:
Registered voters can cast votes for their preferred candidates. The system ensures that each voter can only vote once.

## Real-time Election Data:
Displays real-time statistics such as total votes, voter turnout, and vote breakdown by province and candidate.

## Responsive Design:
Accessible across devices with a mobile-friendly interface.

## Secure and Encrypted Communication:
Hosted with HTTPS to ensure secure data transmission.

## Project Structure
The project is structured to ensure adherence to the Component Based Framework of React.

## Requirements
Node.js (v14+ recommended)
npm (v7+ recommended)
Firebase Project (configured for authentication and database)
Setup and Installation
Clone the Repository:

## bash
git clone https://github.com/Aahdeal/eVoterElections.git
cd eVotingSystem

## Install Dependencies:
## bash
### npm install

## Set Up Firebase:
Configure your Firebase project.
Replace the placeholder configuration in src/firebase/firebaseConfig.js with your Firebase project credentials.
Environment Variables:

Add sensitive keys (like Firebase credentials) to environment variables:
### makefile
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
...
## Build the Project:

## bash
npm run build

## Deploy to Server:
Upload the contents of the build/ directory to your hosting server's public_html folder.
Running the Project Locally
Start the Development Server:

## bash
npm start

## Access the Application:
Open your browser and navigate to http://localhost:3000.

## Hosting
This project is deployed using Afrihost Shared Linux Hosting.
Ensure the following for hosting:

Place the contents of the build/ folder in the public_html directory.
Set up an .htaccess file for routing.
Configure environment variables through cPanel or .env.local files.

## Acknowledgments
Built using React.js.
Firebase services for authentication and real-time database.
Hosted using Afrihost.

# eVoting System
The eVoting System is a secure and user-friendly platform for conducting elections digitally. This project allows registered voters to securely cast their votes for candidates, view real-time election results, and analyze voter turnout statistics.

### Class Diagram
![image](https://github.com/user-attachments/assets/a9d1af53-d5c1-4773-87c9-934f0350a730)

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

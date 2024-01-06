# USER DIRECTORY APP

This repository contains a web app that displays a directory of users, each with a clickable card leading to their individual profile page. On the profile page, users can view details about the selected user, including their posts, a clock with country selection, and a feature to pause/resume the clock.

# Folder Structure
# Main Project Folder
 1. gitignore
 2. package.json
 3. package-lock.json
 4. README.md

# Public
 1. favicon.io
 2. index.html
 3. manifest.json
 4. robots.txt

# src
 1. App.js
 2. App.css
 3. index.js
 4. index.css

# src/Components
  1. Clock.jsx
  2. ProfilePage.jsx
  3. UserCardData.jsx
  4. UserCards.jsx
  5. UserDetails.jsx

# Covered Features: 
# User Directory: 
View a list of users with clickable cards.
# User Profile Page:
Click on a card to view a detailed profile page for the user.
 # Header Section:
   # Left Section:
     Back button to navigate to the users' directory.
   # Right Section:
     Dropdown menu with a list of countries fetched from an API.
     Digital clock displaying the current time in seconds.
     Pause/Start button to control the clock.
# User Details Section:
  1. Displayed below the header section.
  2. User's name, username, and catchphrase.
  3. User's address, email, and phone number.
# Posts Section:
  1. Display all posts as cards under the user details.
  2. Clicking on a post opens a pop-up displaying the complete post content.
  3. The pop-up closes when clicking outside its bounds.

# Prerequisite to run the project
1. Nodejs
2. Package Manager: Either npm which comes with Node.js or Yarn. You can install Yarn from yarnpkg.com

# Installation and Setup (To run the project)
1. Clone the respository using `git clone https://github.com/username/UserDirectoryApp`
2. Navigate to the project directory using cd.
3. Install dependencies using npm install or yarn install.
4. Run the application using npm start or yarn start.

# Technologies and Libraries Used:
1. HMTL
2. CSS
3. JS
4. React
5. axios
6. react-router-dom

# Usage
1. Click on a user card in the directory to view their profile page.
2. Explore the profile page with user details, posts, and clock functionality.
3. Use the back button to return to the user directory.

# Project status
Completed and open for your contributions.

# License
  None.




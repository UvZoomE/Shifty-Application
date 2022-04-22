# Shifty-Application

# Overview
Shifty is an scheduling app that can automatically generate different types of 24/7 crew shifts. Rather than manually creating crew schedules via Excel or Outlook, Shifty can generate your schedules at the click of a button!

# Table of Contents

[Description](#Description)

[Installation](#Installation)

[Usage](#Usage)

[Team Members](#Team-Members)

[Contributing](#Contributing)

[Roadmap](#Roadmap)

[License](#License)

# Description

- Feature list
  Currently, there are two types of schedules that are desiged to autogenerate for four teams.

# Usage
- After logging in (or creating an account if you haven't done so already) you can create an office.
- In this office you can create teams that will be automatically assigned shifts upon schdule generation.
- After creating teams you can navigate to the Schedule page and select your preferred schedule type along with the desired start and end dates.
- At this point, you have the option to save your new schedule or cancel it and make a new one that is more to your liking.

- The purpose of this app it to automatically generate schedules


# For Developers
## Frontend
- How was the frontend made (React, AstroUXDS)
- The UI of Shifty was created by using both [ReactJS](https://reactjs.org/) and [AstroUXDS](https://www.astrouxds.com/getting-started/readme/), a Javascript design library. The user's interation with the Shifty web application is completely ran by React, but the schedule design from resources retrieved from AstroUXDS.

## Backend
- How was the backend made (Express, Knex, PostgreSQL)

- Shifty handles routing and requests made by the client by leveraging [Express.JS](https://expressjs.com/) as its main backend application. Important data created on Shifty remains persistent by storing it in a [PostgreSQL](https://www.postgresql.org/about/) database. Data coming in and out of the database is managed by the [Knex.JS](https://knexjs.org/) middleware.

## Authentication
- [Firebase](https://firebase.google.com/) is used as a 3rd party authenticator
- The react frontend utilizes Firebase's [Auth SDK](https://firebase.google.com/docs/reference/js/v8/firebase.auth) to communicate create user accounts and retrieve JWTs.
- The express backend utilizes Firebase's [Admin SDK](https://firebase.google.com/docs/reference/admin) to verify the legitimacy of a requesting user's JWT.

## Installation
[Firebase Setup]
  - Make an account with Firebase @ https://firebase.google.com/
  - Create a project (of any name)

[Frontend]
  - Navigate to client folder
  - Run `npm install`
  - Navigate to your project on the Firebase website
  - Go to cog at top left (next to "Project Overview")
  - Select Project Settings
  - Under the 'General' tab, click the symbol denoted as `</>` (assign any app nickname in step 1), select register app
  - Add the config information provided in step 2 into a file named 'firebaseConfig.json' in the client folder
  - To start run: `npm start`

[Backend]
  - Navigate to server folder
  - Run `npm install`
  - Run `npm run database` to setup docker container
  - Navigate to your project on the Firebase website
  - Go to cog at top left (next to "Project Overview")
  - Select Project Settings
  - Under the 'Service Accounts' tab, click the 'Firebase Admin SDK' button and create a new service account
  - Generate a new private key and save it to the server/utils folder
  - Rename the private key file to adminKey.json
  - To start run: `npm start`



# Team Members
- [@UvZoomE](https://github.com/UvZoomE) - (Express Backend)
- [@devonknudsen](https://github.com/UvZoomE) - (Express Backend)
- [@mrichburg](https://github.com/mrichburg) - (React Frontend)
- [@crispy-landslide](https://github.com/crispy-landslide) - (React frontend)

# Roadmap
- Additional schedule types meant for office layouts with a varying number of teams are intended to be published in the future.

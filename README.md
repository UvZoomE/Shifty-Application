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
- How the app works, what can you do with the app

- Feature list
  Currently, there are two types of schedules that are desiged to autogenerate for four teams.

- include pictures and made videos

- A more detailed outline of the project. What does it do? Is there a high level list of features? If describing a project that has visual features, consider adding pictures or animations of the features and functionality in this section. See Adding Screen Captures below.

# Usage
- After logging in (or creating an account if you haven't done so already) you can create an office.
- In this office you can create teams that will be automatically assigned shifts upon schdule generation.
- After creating teams you can navigate to the Schedule page and select your preferred schedule type along with the desired start and end dates.
- At this point



- include pictures and videos

- Further details on how the project is meant to be used may be helpful. For a library or framework, this section would outline how to use the library within another project (see socket.io  ). For a service that is meant to be used within a larger project architecture, instructions on how to integrate may be necessary (see node-statsD  ).


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
[Frontend]
  - Navigate to client folder
  - Run `npm install`
[Backend]
  - Navigate to server folder
  - Run `npm install`




# Team Members
- [@UvZoomE](https://github.com/UvZoomE) - (Express Backend)
- [@devonknudsen](https://github.com/UvZoomE) - (Express Backend)
- [@mrichburg](https://github.com/mrichburg) - (React Frontend)
- [@crispy-landslide](https://github.com/crispy-landslide) - (React frontend)

# Roadmap
- Additional schedule types meant for office layouts with a varying number of teams are intended to be published in the future.

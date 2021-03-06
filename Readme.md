## People crud

Express js based backend that manages a person entity.

### Running

To run this project, execute `npm install` in the project root folder to get packages for the backend installed.
After that, execute `cd frontend` and then `yarn` to get the packages for the frontend project installed.
With all the dependencies installed, execute `npm start` on the root folder to execute start the backend and `yarn start`
at the `/frontend` folder to start the frontend.

The backend will be running at `localhost:4000` and the frontend at `localhost:3000`.

### Developing

The following steps are being considered as implementation priority.

- Backend
- [x] Express js backend with data in memory
  - [x] Get request: list of people
  - [x] Get request: single person
- [x] post request
- [x] add new person
- [x] put request
  - [x] edit one person
- [x] delete request
  - [x] remove one person
- [x] Add database
- [x] Use database with default data
- [x] Validate data before saving

<br/>

- FrontEnd
  - [x] Create home view with list of people and button to add more
  - [x] form to add new person
  - [x] button to remove person from list
  - [x] button to edit person from the list
  - [x] form to edit person
  - [x] Mask for data on the table
    - [x] CPF
    - [x] Birthdate
  - [x] Validation on forms before making http request

# The Lets Do It Project

Lets Do IT is a task management app (a to-do list) implemented for studying purposes. In this project, you can do all the operations regarding tasks (read, create, edit and delete). Some other functionalities were added as well, such as prioritizing tasks.

This project is divided into two subprojects:

* The **frontend** subproject: the [Lets Do It App](https://github.com/coop-code/lets-do-it-app), implemented using the **AngularJS** framework and the **Angular Material** for better UX. This APP will be described in details in this document.
* The **backend** subproject: the Lets Do It Api, which is a RESTFul Web Api implemented using NodeJS and MongoDB.

The main goal of the APP is to deal with user interactions.
The API, on the other way, deal with the data itself: processing and answering to all the requests made by the APP, such as task creation, getting tasks and much more.

# The Lets Do It API

Lets Do It API is a RESTful Web API that deals with requests regarding tasks (read, create, edit and delete).
This API uses the HTTP protocol and JSON objects to interact with other systems. Requests are made as follows:

- GET .../api/tasks
- GET .../api/tasks/:id
- POST .../api/tasks (with a request body)

The full list of operations along with the data transfer objects models will be available once we finish the documentation.
For now, check the file `lets-do-it-api/routes/index.js`. This file contains all available operations and routes for it.

The main purpose of the API is to study (and be good at) NodeJS and MongoDB. So expect a lot of changes along the way.
The other purpose is to be a Service Layer for any other APP (or another API) that wants to consume services that manipulate tasks.

## Setup

1. Clone this repository 
2. Open an console in the project folder and run `npm install` to install all the dependencies.
3. Run `npm start` to the start the application.

The API runs on port 4001 as default. If you want the test it (and make all possible requests) easily, we recommend the http client [Postman](https://www.getpostman.com/)

If you have any issue or comment, you can contact the [developers](https://github.com/coop-code/lets-do-it-api/graphs/contributors) or register and [issue](https://github.com/coop-code/lets-do-it-api/issues) anytime. Feedback is very important to us.

## Additional Information

- The API did not has user authentication **yet**.
- The tasks are registered **globally**, which means that they are the same for everyone.
- The API is not in a fully mature state. It is working properly, but it's in, let's say, **alpha stage**.

## Future Features

- User Authentication
- Documentation
- Deal with files (pdf, png, txt, ...)

## Special Thanks

Special Thanks to Pluralsight for providing amazing courses.

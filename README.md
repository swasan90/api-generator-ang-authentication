# API GENERATOR - Authentication Application

This is an entrypoint of an api generator application. This repository contains the code for an authentication. This application is developed using Angular framework. 

## Prequisites

The below software are required to run the Angular application

- Node 
- Angular CLI

## Architecture

This application is built to authenticate users for the registered users and create account on api generator application. It is developed using Angular 7 with RxJs and Typescript. This application uses token based authentication to authenticate user to the backend application.
This application is a responsive single page application which communicates the API using RESTAPI layer. This application communicates to the Springboot microservice application which is the backend application.

## For New Users

For the new users, create a new user account by clicking the Register button. Provide the valid details. Upon registering your information, the application would send a token link to your registered email id with token. The user has to activate their account by clicking the link within 24 hours. Upon activation, the user will be able to login with their credentials. The user cannot login unless the account is activated.  

Note: Email id is unique. 

## For Registered Users

Note: The registered user will be able to login only if they activated their account. 

When the User logins, the system would call the login endpoint first to get a JWT Token which should then be passed as an authorization header with a Bearer string so that the authenticated endpoints are accessible. The token is set to 15 minutes (ttl).  After 15 minutes, if the user is not active, the token will be expired. If the user is still active after 15 minutes, the front end application requests the backend server to generate a new token for the user and the new token will be attached to the subsequent request headers.

If the token is expired or if the user experience 401 error when accessing the application, the user will be logged out automatically. This is achieved by implementing HttpInterceptor to capture 401 error.The token is attached to the each request on Authorization Header with string "Bearer" followed by token. 

 Upon successfull login, the application redirects to another frontend angular application which spawns the main application (Api generator). 


## Forgot Password

If the user forgots his/her password, the application prompts for the registered email id. The application would send a token link to the registered email id for resetting his/her password. By clicking the token link, the application would allows the user to reset the password. On resetting password, the user can use new credentials.

 ## UI Library

The application uses Angular Material for rendering data on the material components and bootstrap4 for designing stylesheets. The application is covered with Behavioral driven development using Jasmine and Karma. The application uses template driven forms to render view.

## List of Technology stack Used
- Node                   
- Angular CLI        
- Angular 7
- Angular Material
- Bootstrap 4
- Sendgrid (to send emails)

## Setup Instruction
 
1. Install node (This application need node 8.x or 10.x)

2. Install angular/cli 
    npm install -g @angular/cli
3. Navigate to the project directory.
        npm install
4. The above step 3 installs the required dependencies to run this application.

## IP Address of the Docker Engine (!!!!Important for Connecting the Client)
a. Make note of docker machine by running this below command in the docker terminal window:
$ docker-machine ip
b. Update the following file with the IP retrieved from docker
    File to be updated: {APP_ROOT_DIR}/environments/environment.ts
    Property to be updated: "api_url".
     After updating, your api_url value should look like this: "http://192.168.99.100/api/",
     the ip address may differs based on your container

5. Once the above steps completes, run the following command to start application.
    $ ng serve --port 4210
    This should run the application on http://localhost:4210 or whichever port it says on the terminal.
    Open the link in browser, you should be able to view the login page that is redirected to http://localhost:4210/auth

This is all that's required to start and run the application.

## Application Start up Workflow

1. Once the application is up, enter the email id and password if registered else create new user account.
2. The application takes you to the api generator which is spawned as a separate angular application.
3. The application is active until the user logs off (or) the token is active.
 

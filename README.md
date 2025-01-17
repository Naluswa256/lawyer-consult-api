# Easy-Consult API Documentation

## Overview

Easy-Consult is a lawyer appointment scheduling app that allows clients to book appointments with lawyers. This document provides details about the REST API endpoints used to interact with the Easy-Consult flutter app.Description outlines the major endpoints and features of a Lawyer Appointment API, focusing on user management, lawyer specializations, appointment scheduling, authentication, authorization, error handling, logging, and testing.


## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Logging](#logging)
- [Custom Mongoose Plugins](#custom-mongoose-plugins)
- [Linting](#linting)

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: centralized error handling mechanism
- **Dependency management**: with [Yarn](https://yarnpkg.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

# SMTP configuration options for the email service
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```


### API Endpoints

List of available routes:

## Authentication

- **POST** `/auth/register`
  - Description: Register a new user.
  - Middleware: None
- **POST** `/auth/login`
  - Description: Login with credentials to obtain access tokens.
  - Middleware: None
- **POST** `/auth/logout`
  - Description: Logout the currently authenticated user.
  - Middleware: None
- **POST** `/auth/refresh-tokens`
  - Description: Refresh expired access tokens using refresh token.
  - Middleware: None
- **POST** `/auth/forgot-password`
  - Description: Initiate the password reset process by email.
  - Middleware: None
- **POST** `/auth/reset-password`
  - Description: Reset user password after receiving reset token.
  - Middleware: None
- **POST** `/auth/verify-email`
  - Description: Verify user's email after registration.
  - Middleware: Authenticated User

## User Management

- **POST** `/users/`
  - Description: Create a new user.
  - Middleware: Manage Users
- **GET** `/users/`
  - Description: Get all users.
  - Middleware: Get Users
- **GET** `/users/:userId`
  - Description: Get a specific user by ID.
  - Middleware: Get Users
- **DELETE** `/users/:userId`
  - Description: Delete a user by ID.
  - Middleware: Manage Users
- **PATCH** `/users/update-profile`
  - Description: Update user profile information.
  - Middleware: Authenticated User
- **POST** `/users/save-fcm-token`
  - Description: Save Firebase Cloud Messaging token for push notifications.
  - Middleware: Authenticated User

## Lawyer Specializations

- **POST** `/lawyer-specializations/`
  - Description: Create a new specialization.
  - Middleware: Authenticated User
- **GET** `/lawyer-specializations/`
  - Description: Get all specializations.
  - Middleware: Authenticated User
- **GET** `/lawyer-specializations/search`
  - Description: Search for specializations.
  - Middleware: Authenticated User

## Lawyers

- **GET** `/lawyers/specializations/:specializationId`
  - Description: Get lawyers by specialization ID.
  - Middleware: Authenticated User
- **GET** `/lawyers/specializations/:specializationId/search`
  - Description: Search lawyers within a specialization by name.
  - Middleware: Authenticated User
- **GET** `/lawyers/search`
  - Description: Search lawyers by name.
  - Middleware: Authenticated User
- **GET** `/lawyers/popular`
  - Description: Get popular lawyers.
  - Middleware: Authenticated User
- **GET** `/lawyers/:lawyerId/availability`
  - Description: Get availability schedule of a lawyer.
  - Middleware: None

## Services

- **POST** `/services/`
  - Description: Create a new service package.
  - Middleware: Authenticated User
- **GET** `/services/`
  - Description: Get all service packages.
  - Middleware: Authenticated User
- **GET** `/services/:packageId`
  - Description: Get a service package by ID.
  - Middleware: Authenticated User
- **PUT** `/services/:packageId`
  - Description: Update a service package by ID.
  - Middleware: Authenticated User
- **DELETE** `/services/:packageId`
  - Description: Delete a service package by ID.
  - Middleware: Authenticated User

## Reviews

- **POST** `/reviews/`
  - Description: Create a new review.
  - Middleware: Authenticated User
- **GET** `/reviews/`
  - Description: Get all reviews.
  - Middleware: Authenticated User
- **GET** `/reviews/:id`
  - Description: Get a review by ID.
  - Middleware: Authenticated User
- **PATCH** `/reviews/:id`
  - Description: Update a review by ID.
  - Middleware: Authenticated User
- **DELETE** `/reviews/:id`
  - Description: Delete a review by ID.
  - Middleware: Authenticated User
- **GET** `/reviews/lawyer/:id`
  - Description: Get reviews of a lawyer by lawyer ID.
  - Middleware: Authenticated User

## Appointments

- **POST** `/appointments/`
  - Description: Create a new appointment.
  - Middleware: Authenticated User
- **GET** `/appointments/`
  - Description: Get all appointments.
  - Middleware: Authenticated User
- **GET** `/appointments/lawyer/:lawyerId`
  - Description: Get appointments of a lawyer by lawyer ID.
  - Middleware: Authenticated User
- **GET** `/appointments/user/:userId`
  - Description: Get appointments of a user by user ID.
  - Middleware: Authenticated User
- **GET** `/appointments/happening-today/user/:userId`
  - Description: Get appointments happening today for a user by user ID.
  - Middleware: Authenticated User
- **GET** `/appointments/:appointmentId`
  - Description: Get a specific appointment by appointment ID.
  - Middleware: Authenticated User
- **POST** `/appointments/:appointmentId/cancel`
  - Description: Cancel a specific appointment by appointment ID.
  - Middleware: Authenticated User
- **POST** `/appointments/:appointmentId/confirm`
  - Description: Confirm a specific appointment by appointment ID.
  - Middleware: Authenticated User
- **POST** `/appointments/:appointmentId/report-issue`
  - Description: Report an issue with a specific appointment by appointment ID.
  - Middleware: Authenticated User
- **GET** `/appointments/issues`
  - Description: Get all reported issues with appointments.
  - Middleware: Admin User
- **DELETE** `/appointments/issues/:issueId`
  - Description: Delete a reported issue by issue ID.
  - Middleware: Authenticated User


## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
};
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', validate(userValidation.createUser), userController.createUser);
```

## Authentication

To require authentication for certain routes, you can use the `auth` middleware.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', auth(), userController.createUser);
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the register (`POST /v1/auth/register`) or login (`POST /v1/auth/login`) endpoints. The response of these endpoints also contains refresh tokens (explained below).

An access token is valid for 30 minutes. You can modify this expiration time by changing the `JWT_ACCESS_EXPIRATION_MINUTES` environment variable in the .env file.

**Refreshing Access Tokens**:

After the access token expires, a new access token can be generated, by making a call to the refresh token endpoint (`POST /v1/auth/refresh-tokens`) and sending along a valid refresh token in the request body. This call returns a new access token and a new refresh token.

A refresh token is valid for 30 days. You can modify this expiration time by changing the `JWT_REFRESH_EXPIRATION_DAYS` environment variable in the .env file.

## Authorization

The `auth` middleware can also be used to require certain rights/permissions to access a route.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', auth('manageUsers'), userController.createUser);
```

In the example above, an authenticated user can access this route only if that user has the `manageUsers` permission.

The permissions are role-based. You can view the permissions/rights of each role in the `src/config/roles.js` file.

If the user making the request does not have the required permissions to access this route, a Forbidden (403) error is thrown.

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## Custom Mongoose Plugins

The app also contains 2 custom mongoose plugins that you can attach to any mongoose model schema. You can find the plugins in `src/models/plugins`.

```javascript
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    /* schema definition here */
  },
  { timestamps: true }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model('User', userSchema);
```

### toJSON

The toJSON plugin applies the following changes in the toJSON transform call:

- removes \_\_v, createdAt, updatedAt, and any schema path that has private: true
- replaces \_id with id

### paginate

The paginate plugin adds the `paginate` static method to the mongoose schema.

Adding this plugin to the `User` model schema will allow you to do the following:

```javascript
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};
```

The `filter` param is a regular mongo filter.

The `options` param can have the following (optional) fields:

```javascript
const options = {
  sortBy: 'name:desc', // sort order
  limit: 5, // maximum results per page
  page: 2, // page number
};
```

The plugin also supports sorting by multiple criteria (separated by a comma): `sortBy: name:desc,role:asc`

The `paginate` method returns a Promise, which fulfills with an object having the following properties:

```json
{
  "results": [],
  "page": 2,
  "limit": 5,
  "totalPages": 10,
  "totalResults": 48
}
```

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`


## License

[MIT](LICENSE)

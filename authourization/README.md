# API Documentation

## Overview

This API provides endpoints for user authentication, user management, and organization management. Users can register, log in, and manage organizations they belong to. The API also supports JWT-based authentication for protected endpoints.


## Authentication

All protected endpoints require a valid JWT token to be included in the request headers as follows:

Authorization: Bearer <token>



## Models

### User Model

| Field     | Type   | Description                     |
|-----------|--------|---------------------------------|
| userId    | string | Unique user ID                  |
| firstName | string | First name (required)           |
| lastName  | string | Last name (required)            |
| email     | string | Email (unique and required)     |
| password  | string | Password (required)             |
| phone     | string | Phone number                    |

### Organisation Model

| Field       | Type   | Description                     |
|-------------|--------|---------------------------------|
| orgId       | string | Unique organization ID          |
| name        | string | Organization name (required)    |
| description | string | Organization description        |

## Endpoints

### [POST] /auth/register

Registers a user and creates a default organization.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}


Success Response:

{
  "status": "success",
  "message": "Registration successful",
  "data": {
    "accessToken": "eyJh...",
    "user": {
      "userId": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string"
    }
  }
}

Error Response (Validation):

{
  "status": "Bad request",
  "message": "Registration unsuccessful",
  "statusCode": 400
}

[POST] /auth/login
Logs in a user.

Request Body:

{
  "email": "string",
  "password": "string"
}


Success Response:
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "accessToken": "eyJh...",
    "user": {
      "userId": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string"
    }
  }
}

Error Response:

{
  "status": "Bad request",
  "message": "Authentication failed",
  "statusCode": 401
}

[GET] /api/users/:id
Gets the record of the logged-in user or user records in organizations they belong to or created. [PROTECTED]

{
  "status": "success",
  "message": "",
  "data": {
    "userId": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string"
  }
}


[GET] /api/organisations
Gets all organizations the user belongs to or created. [PROTECTED]

Success Response:

{
  "status": "success",
  "message": "",
  "data": {
    "organisations": [
      {
        "orgId": "string",
        "name": "string",
        "description": "string"
      }
    ]
  }
}


[GET] /api/organisations/
Gets a single organization record. [PROTECTED]

Success Response:

{
  "status": "success",
  "message": "",
  "data": {
    "orgId": "string",
    "name": "string",
    "description": "string"
  }
}

[POST] /api/organisations
Creates a new organization. [PROTECTED]

Request Body:

{
  "name": "string",
  "description": "string"
}

Success Response:

{
  "status": "success",
  "message": "Organisation created successfully",
  "data": {
    "orgId": "string",
    "name": "string",
    "description": "string"
  }
}

Error Response:

{
  "status": "Bad Request",
  "message": "Client error",
  "statusCode": 400
}


[POST] /api/organisations/
/users
Adds a user to a particular organization. [PROTECTED]

Request Body:

{
  "userId": "string"
}

Success Response:

{
  "status": "success",
  "message": "User added to organisation successfully"
}

Validation Errors
When there’s a validation error, the API returns a 422 status code with the following payload:

Error Response:

{
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
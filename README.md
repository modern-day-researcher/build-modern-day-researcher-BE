# rticle API 

## Introduction

With rticle you can share and receive articles with people.

## Table of Contents

- [Overview](#overview)
  - [Installation](#Installation)
  * [API URL](#api-url)
  * [SCHEMA](#SCHEMA)
  * [Test accounts](#Test-Accounts)
  * [API endpoints](#API-ENDPOINTS)
- [Auth routes](#AUTH-ROUTES)
  - [Register](#REGISTER)
  - [Login](#Login)
- [User routes](#user-routes)
  * [Get all users](#Get-all-users)
  * [Get article by ID](#Get-user-by-id)
  * [Delete article](#delete-article)
  * [Create article](#create-article)
  * [Toggle read status](#toggle-read-status)
----
# Overview

This repository holds all back-end files and resources for the rticle application and its readme documentation. 

---

## API URL

https://rticle.herokuapp.com/


[Back to Table of Contents](#table-of-contents)

---

## Installation

Fork/Clone the repository. In the same directory as the package.json, in your terminal:
```
yarn install
```
This is to install all needed packages. To start the server, in your terminal, type:
```
yarn server
```
To test the repository:
```
yarn test
```

[Back to Table of Contents](#table-of-contents)

---

## SCHEMA

`users`
```
{
  "id": 1,                            // Integer [Primary key]
  "username": "admin",                // String [Required, Unique]
  "password": "password",             // String [Required]
  "first_name": "Mr."                 // String 
  "last_name": "Admin"                // String 
}
```

`articles`
```
{
  "id": 1,                                            // Integer [Primary key]
  "category": "Sports",                               // String [Required]
  "title": "Farthest Yeet Ever!"                      // String
  "url": "www.sports.com"                             // String [Required]
  "description": "A yeet so far you wont belive it!", // String
  "is_read": false,                                   // Boolean [Required]
  "users_id": 1                                       // Integer [Foreign Key]
}

```

[Back to Table of Contents](#table-of-contents)
## Test Accounts

```

  username: 'TestUser1',
  password: 'password'


  username: 'TestUser2',
  password: 'foobar'


  username: 'TestUser3',
  password: 'banana'

```

[Back to Table of Contents](#table-of-contents)

## API ENDPOINTS

| name | method | endpoint | description|
| ---- | ------ | -------- | ----------- |
| Register | POST | api/auth/register| Creates a new `user` to the users table in the database and returns user id|
|Login|POST|/api/auth/login|Checks whether payload from the `body` matches with a user in the database. On Succesful login, returns a message, a `JWT Token`, and user id|
|Get all users|GET|/api/users| `PROTECTED ROUTE` - Returns an array of user objects of all users|
|Get user articles by ID|GET|/api/user/:id| `PROTECTED ROUTE` - Returns an array of object of articles of user|
|Delete article by ID|DELETE|/api/article/:id| `PROTECTED ROUTE` - delete selected article by ID|
|Creates article|POST|/api/article| `PROTECTED ROUTE` - returns creation success or faliure response|
|Toggles article read status |POST|/api/article/read| `PROTECTED ROUTE` - returns update success or faliure response|

[Back to Table of Contents](#table-of-contents)

---



# AUTH ROUTES

## **REGISTER**
### **Registers a user**

*Method Url:* `/api/auth/register`


*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`     | String | Yes      | Must be unique           |
| `password`     | String | Yes      |                          |
| `first_name`   | String | No       |                          |
| `last_name`    | String | No       |                          |

*example:*

```
{
  username: "admin",
  password: "password",
  first_name: "Mr.",
  last_name: "Admin"
}
```

#### Response

##### 201 (Created)
>If you successfully register a user the endpoint will return an HTTP response with a status code `201` and a body as below.
```
{ 
  1
}
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
[Back to Table of Contents](#table-of-contents)
____

## **LOGIN**
### **Logs a user in**

*Method Url:* `/auth/login`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`        | String | Yes      | Must match a username in the database |
| `password`     | String | Yes      | Must match a password in the database |

*example:*

```
{
  username: "admin",
  password: "password"
}
```

#### Response

##### 200 (OK)
>If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "message": "Welcome admin!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE"
}
```
##### 400 (Bad Request)
>If you send in invalid fields or the passwords do not match, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 404 (Not Found)
>If you send in an email address that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```

[Back to Table of Contents](#table-of-contents)
___

# USER ROUTES

## **GET ALL USERS**
### Returns all users

*Mehod Url:* `/api/users`
*HTTP method:* **[GET]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)
>If you successfully get al the users, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  {
    "total": 3,
    "last_page": 1,
    "per_page": 15,
    "current_page": 1,
    "from": 0,
    "to": 3,
    "data": [
      {
        "id": 1,
        "username": "admin",
        "email": "admin@administrator.com"
      },
      {
        "id": 2,
        "username": "beniscool",
        "email": "beniscool@administrator.com"
      },
      {
        "id": 3,
        "username": "ceciljohn",
        "email": "ceciljohn@administrator.com"
      }
    ]
  }
}
```


##### 400 (Bad Request)
>If you send in invalid fields or the password of the user corresponding to the token does not match the currentPassword field, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---

## **GET USER BY ID**
### Returns selected user by ID

*Mehod Url:* `/api/users/:id`
*HTTP method:* **[GET]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `id`| Int    | Yes      | Id of specific user |


#### Response

##### 200 (OK)
>If you successfully get al the users, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "id": 1,
  "username": "admin",
  "email": "admin@administrator.com"
}
```

##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

## **DELETE USER**
### Deletes seletcted user by ID

*Mehod Url:* `/api/users/:id`
*HTTP method:* **[DELETE]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `id`| Int    | Yes      | Id of specific user |


#### Response

##### 200 (OK)
>If you successfully delete the selected user, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "id": 1,
  "username": "admin",
  "email": "admin@administrator.com"
}
```

##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

[Back to Table of Contents](#table-of-contents)

---

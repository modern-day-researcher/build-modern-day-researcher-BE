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
  - [Get all users](#Get-all-users)
  - [Get articles by user ID](#Get-articles-by-user-id)
  - [Delete article](#delete-article)
  - [Create article](#create-article)
  - [Toggle read status](#toggle-read-status)

---

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

| name                        | method | endpoint          | description                                                                                                                                   |
| --------------------------- | ------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Register                    | POST   | api/auth/register | Creates a new `user` to the users table in the database and returns user id                                                                   |
| Login                       | POST   | /api/auth/login   | Checks whether payload from the `body` matches with a user in the database. On Succesful login, returns a message, a `JWT Token`, and user id |
| Get all users               | GET    | /api/users        | `PROTECTED ROUTE` - Returns an array of user objects of all users                                                                             |
| Get user articles by ID     | GET    | /api/user/:id     | `PROTECTED ROUTE` - Returns an array of object of articles of user                                                                            |
| Delete article by ID        | DELETE | /api/article/:id  | `PROTECTED ROUTE` - delete selected article by ID                                                                                             |
| Creates article             | POST   | /api/article      | `PROTECTED ROUTE` - returns creation success or faliure response                                                                              |
| Toggles article read status | POST   | /api/article/read | `PROTECTED ROUTE` - returns update success or faliure response                                                                                |

[Back to Table of Contents](#table-of-contents)

---

# AUTH ROUTES

## **REGISTER**

### **Registers a user**

_Method Url:_ `/api/auth/register`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name         | type   | required | description    |
| ------------ | ------ | -------- | -------------- |
| `username`   | String | Yes      | Must be unique |
| `password`   | String | Yes      |                |
| `first_name` | String | No       |                |
| `last_name`  | String | No       |                |

_example:_

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

> If you successfully register a user the endpoint will return an HTTP response with a status code `201` and a body with user id as below.

```
{
  1
}
```

##### 500 (Internal Server Error)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
   "message": "Error registering. Please try again."
}
```

[Back to Table of Contents](#table-of-contents)

---

## **LOGIN**

### **Logs a user in**

_Method Url:_ `/auth/login`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description                           |
| ---------- | ------ | -------- | ------------------------------------- |
| `username` | String | Yes      | Must match a username in the database |
| `password` | String | Yes      | Must match a password in the database |

_example:_

```
{
  username: "admin",
  password: "password"
}
```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
    { "message": "Welcome TestUser1!, Have a token...",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IlRlc3RVc2VyMSIsImlhdCI6MTU1NTYwNjQ2OCwiZXhwIjoxNTU1NjkyODY4fQ.VP94u3RrTQAbqKpmS3gIMtpugwWkIssIDpsWTlhk_s",
    "user_id": 1 }

```

##### 404 (Not Found)

> If you send in invalid fields or the passwords do not match, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
  { message: "Invalid Credentials" }
```

##### 401 (Unauthorized)

> If you do not put password and username, the endpoint will return an HTTP response with a status code `404` and a body as below

```

  { message: "Please log in" }

```

[Back to Table of Contents](#table-of-contents)

---

# USER ROUTES

## **GET ALL USERS**

### Returns all users

_Mehod Url:_ `/api/user/users`
_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | Yes      | Bearer JWT authorization token |

#### Response

##### 200 (OK)

> If you successfully get al the users, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
[
    {
    "id": 1,
     "username": "TestUser1",
        "password": "$2a$10$YF/pNRUTjkaN05e1Q0dkl.8L7302U7LEfVUahe8diOLDvSSFsrlwm",
        "first_name": "John",
        "last_name": "Doe"
    },
    {
        "id": 2,
        "username": "TestUser2",
        "password": "$2a$10$Ru6tBXP5vet1TkHT/m.TxuoerlRLk5uFt9B95/xpBiRwS8eB/hSNi",
        "first_name": "Jane",
        "last_name": "Doe"
    },
    {
        "id": 3,
          "username": "TestUser3",
        "password": "$2a$10$w4BLS45rMDcfaMQWByNzkO3mNF9I5XIXYzrpALmbT1q7/p4s.szou",
        "first_name": "Adam",
        "last_name": "Smith"
    }
]
```

##### 500 (Internal Server Error)

> If there is an error retrieving users then endpoint will return an HTTP response with a status code `500` and a body as below.

```
{ error: "Could not retrieve list of users" }
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{ message: "No token provided. Please log in." }
```

[Back to Table of Contents](#table-of-contents)

---

## **GET ARTICLES BY USER ID**

### Returns selected articles by user ID

_Mehod Url:_ `/api/user/:id`
_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | Yes      | Bearer JWT authorization token |

#### Parameters

| name | type | required | description         |
| ---- | ---- | -------- | ------------------- |
| `id` | Int  | Yes      | Id of specific user |

#### Response

##### 200 (OK)

> If you successfully get all the articles of user, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
[
    {
        "id": 1,
        "category": "technology",
        "title": "Purported pricing details of the Google Pixel 3a and Pixel 3a XL surface",
        "url": "https://www.notebookcheck.net/Purported-pricing-details-of-the-Google-Pixel-3a-and-Pixel-3a-XL-surface.417469.0.html",
        "description": "The Pixel 3a and 3a XL are expected to be launched next month. Pricing details have been mostly elusive until now but a new leak has given us a good idea of how Google plans to price the mid-range phones.",
        "is_read": 0,
        "user_id": 1
    },
    {
        "id": 5,
        "category": "sports",
        "title": "L.A. Lakers coaching search: They’re STILL doing this all wrong",
        "url": "https://www.sbnation.com/2019/4/15/18311158/la-lakers-coach-rumors-updates-rob-pelinka-magic-johnson-why",
        "description": "Hiring a coach before deciding on Magic Johnson’s replacement? Letting Magic’s No. 2 conduct the search? Lakers, what are you doing?",
        "is_read": 0,
        "user_id": 1
    },
    {
        "id": 6,
        "category": "finance",
        "title": "France sees blockchain as anti-monopoly weapon in digital world",
        "url": "https://phys.org/news/2019-04-france-blockchain-anti-monopoly-weapon-digital.html",
        "description": "France is pushing blockchain technology as a means of preventing finance giants enjoying a monopoly on transactions, Finance Minister Bruno Le Maire said Monday.",
        "is_read": 0,
        "user_id": 1
    },
    {
        "id": 7,
        "category": "business",
        "title": "Lyft Pulls E-Bikes From Service Amid Alarming Reports of Excessive Braking",
        "url": "https://gizmodo.com/lyft-pulls-e-bikes-from-service-amid-alarming-reports-o-1834047278",
        "description": "Following reports of problematic braking that in some cases resulted in rider injury, Lyft is pulling its recently acquired network of e-bikes from service in three major cities. Those include Citi Bike in New York, GoBike in San Francisco, and Capital Bikesh…",
        "is_read": 0,
        "user_id": 1
    },
    {
        "id": 12,
        "category": "technology",
        "title": "Disc-free Xbox One S could land on May 7th",
        "url": "https://techcrunch.com/2019/04/15/disc-free-xbox-one-s-could-land-on-may-7th/",
        "description": "Microsoft is about to launch an even cheaper Xbox One S. In order to cut costs, the company is removing the BluRay disc drive altogether. According to leaked marketing images spotted by WinFuture (via Thurrott), the console could launch on May 7th for €229 in",
        "is_read": 0,
        "user_id": 1
    },
    {
        "id": 15,
        "category": "sports",
        "title": "Tiger Woods’s peers all agree his return to the top is great for golf - The Guardian",
        "url": "https://www.theguardian.com/sport/2019/apr/15/tiger-woods-rory-mcilroy-brooks-koepka",
        "description": "Rory McIlroy hailed Tiger Woods’s Masters win as a great day for golf as his peers lined up to congratulate the comeback king",
        "is_read": 0,
        "user_id": 1
    }
]
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{ message: "No token provided. Please log in." }
```

[Back to Table of Contents](#table-of-contents)

---

## **DELETE Article**

### Deletes seletcted article by ID

_Mehod Url:_ `/api/user/:id/articles`
_HTTP method:_ **[DELETE]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Parameters

| name | type | required | description            |
| ---- | ---- | -------- | ---------------------- |
| `id` | Int  | Yes      | Id of specific article |

#### Response

##### 200 (OK)

> If you successfully delete the selected user, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{ message: "Article removed from user" }
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{ message: "No token provided. Please log in." }
```

##### 404 (Not Found)

> If article does not exist, then endpoint will return an HTTP response with a status code `404` and a body as below.

```
{ message: "The article selected does not exist" }
```

[Back to Table of Contents](#table-of-contents)

---

## **Create Article**

### Creates article

_Mehod Url:_ `/api/user/articles`
_HTTP method:_ **[POST]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | Yes      | Bearer JWT authorization token |

#### Body

| name          | type    | required | description   |
| ------------- | ------- | -------- | ------------- |
| `category`    | String  | Yes      |               |
| `title`       | String  | No       |               |
| `url`         | String  | Yes      |               |
| `description` | String  | No       |               |
| `is_read`     | Boolean | Yes      | Must be false |
| `username`    | String  | Yes      | Is case sensitive              |

#### Response

##### 201 (Created)

> If you successfully add the article, the endpoint will return an HTTP response with a status code `201` and a body as below.

```
  {
    "id": 10,
    "category": "New",
    "title": "New Article",
    "url": "https://www.new.com",
    "description": "This a new article",
    "is_read": 0,
    "user_id": 1
   }

```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{ message: "No token provided. Please log in." }
```

##### 400 (Bad Request)

> If  a required fields is not entered, then endpoint will return an HTTP response with a status code `400` and a body as below.

```
{ message: "Please enter an *missing field*." }
```

[Back to Table of Contents](#table-of-contents)

---

## **Toggle read status**

### toggles read status

_Mehod Url:_ `/api/user/:id/read`
_HTTP method:_ **[POST]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | Yes      | Bearer JWT authorization token |

#### Body

| name      | type    | required | description                         |
| --------- | ------- | -------- | ----------------------------------- |
| `is_read` | Boolean | Yes      | value must be current is_read value |

#### Parameters

| name | type | required | description            |
| ---- | ---- | -------- | ---------------------- |
| `id` | Int  | Yes      | Id of specific article |

#### Response

##### 200 (Ok)

> If you successfully change read status, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
  {
    1
   }

```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{ message: "No token provided. Please log in." }
```

##### 500 (Internal Server Error)

> If request fails, then endpoint will return an HTTP response with a status code `500` and a body as below.

```
{ message: "Could not retrieve user data.", error }
```

[Back to Table of Contents](#table-of-contents)

---

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

##### 200 (OK)
>If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{ 
  "message" : "You have registered, ceciljohn!"
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
| `password`     | String | Yes      | Must match a password in the database corresponding to above email |

*example:*

```
{
  username: "ceciljohn",
  password: "password"
}
```

#### Response

##### 200 (OK)
>If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "message": "Welcome ceciljohn!",
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
## **UPDATE USER**
### Updates seletcted user by ID
TBA

[Back to Table of Contents](#table-of-contents)

---

# POKEMON ROUTES

## **GET ALL POKEMON(LIMITED)**
### Returns all pokemon name and ID

*Mehod Url:* `/api/pokemon/all`
*HTTP method:* **[GET]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)
>If you successfully get all the pokemon, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  {
        "id": 1,
        "name": "Bulbasaur"
    },
    {
        "id": 2,
        "name": "Ivysaur"
    },
    {
        "id": 3,
        "name": "Venusaur"
    },
    {
        "id": 4,
        "name": "Charmander"
    },
    {
        "id": 5,
        "name": "Charmeleon"
    },
    
    
    ...

   to the 800th+ pokemon object
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

## **GET ERRTHANG**
### Returns all pokemon and pokemon properties

*Mehod Url:* `/api/pokemon/errthang`
*HTTP method:* **[GET]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)
>If you successfully get all the pokemon, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
        "id": 1,
        "name": "Bulbasaur",
        "pokedex_number": 1,
        "type1": "grass",
        "type2": "poison",
        "height_m": 0.7,
        "weight_kg": 6.9,
        "abilities": "['Overgrow', 'Chlorophyll']",
        "base_happiness": 70,
        "hp": 45,
        "attack": 49,
        "defense": 49,
        "sp_attack": 65,
        "sp_defense": 65,
        "speed": 45,
        "generation": 1,
        "capture_rate": "45",
        "graph": [
            1,
            1,
            1,
            0.5,
            0.5,
            0.5,
            2,
            2,
            1,
            0.25,
            1,
            2,
            1,
            1,
            2,
            1,
            1,
            0.5
        ]
    },
    {
        "id": 2,
        "name": "Ivysaur",
        "pokedex_number": 2,
        "type1": "grass",
        "type2": "poison",
        "height_m": 1,
        "weight_kg": 13,
        "abilities": "['Overgrow', 'Chlorophyll']",
        "base_happiness": 70,
        "hp": 60,
        "attack": 62,
        "defense": 63,
        "sp_attack": 80,
        "sp_defense": 80,
        "speed": 60,
        "generation": 1,
        "capture_rate": "45",
        "graph": [
            1,
            1,
            1,
            0.5,
            0.5,
            0.5,
            2,
            2,
            1,
            0.25,
            1,
            2,
            1,
            1,
            2,
            1,
            1,
            0.5
        ]
    },
    
    ...

   to the 800th+ pokemon object
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

## **GET ALL POKEMON WITH PAGINATION**
### Returns all pokemon; 15 per page

*Mehod Url:* `/api/pokemon`
*HTTP method:* **[GET]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)
>If you successfully get all the pokemon with pagination that limits the list to 15 pokemon per page, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "total": 801,
  "last_page": 54,
  "per_page": 15,
  "current_page": 1,
  "from": 0,
  "to": 15,
  "data": [
    {
      "id": 1,
      "name": "Bulbasaur",
      "pokedex_number": 1,
      "type1": "grass",
      "type2": "poison",
      "height_m": 0.7,
      "weight_kg": 6.9,
      "abilities": "['Overgrow', 'Chlorophyll']",
      "base_happiness": 70,
      "hp": 45,
      "attack": 49,
      "defense": 49,
      "sp_attack": 65,
      "sp_defense": 65,
      "speed": 45,
      "generation": 1,
      "capture_rate": "45"
    },
    
    ...

    {
      "id": 15,
      "name": "Beedrill",
      "pokedex_number": 15,
      "type1": "bug",
      "type2": "poison",
      "height_m": 1,
      "weight_kg": 29.5,
      "abilities": "['Swarm', 'Sniper']",
      "base_happiness": 70,
      "hp": 65,
      "attack": 150,
      "defense": 40,
      "sp_attack": 15,
      "sp_defense": 80,
      "speed": 145,
      "generation": 1,
      "capture_rate": "45"
    }
  ]
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

## **GET POKEMON BY ID**
### Returns selected pokemon by ID

*Mehod Url:* `/api/pokemon/:id`
*HTTP method:* **[GET]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `id`| Int    | Yes      | Id of specific pokemon |


#### Response

##### 200 (OK)
>If you successfully get the selected pokemon, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "id": 151,
  "name": "Mew",
  "pokedex_number": 151,
  "type1": "psychic",
  "type2": null,
  "height_m": 0.4,
  "weight_kg": 4,
  "abilities": "['Synchronize']",
  "base_happiness": 100,
  "hp": 100,
  "attack": 100,
  "defense": 100,
  "sp_attack": 100,
  "sp_defense": 100,
  "speed": 100,
  "generation": 1,
  "capture_rate": "45"
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

# BACKPACK ROUTES

## **GET ALL**
### Returns all pokemon in backpack

*Mehod Url:* `/api/backpack`
*HTTP method:* **[GET]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)
>If you successfully get all the pokemon in the backpack table, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
[
    {
        "id": 1,
        "type1": "fire",
        "type2": null,
        "name": "Charmander",
        "pokedex_number": 4,
        "users_id": 1
    },
    {
        "id": 2,
        "type1": "water",
        "type2": null,
        "name": "Squirtle",
        "pokedex_number": 7,
        "users_id": 2
    }
]
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

## **POST TO BACKPACK**
### Inserts a pokemon to the backpack

*Mehod Url:* `/api/backpack`
*HTTP method:* **[POST]**


#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `name`     | String | Yes      |            |
| `pokedex_number`        | Integer | Yes      |           |
| `type1`     | String | Yes      |                          |
| `type2`     | String | No      |                          |
| `users_id`     | Interer | Yes      | Foreign Key                         |

*example:*

```
{
    "name": "Squirtle",
    "pokedex_number": 7,
    "type1": "water",
    "type2": null
    "users_id": 1,
}
```

#### Response

##### 200 (OK)
>If you successfully get all the pokemon in the backpack table, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
    "id": 3,
    "type1": "water",
    "type2": null,
    "name": "Squirtle",
    "pokedex_number": 7,
    "users_id": 1
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

## **GET BACKPACK OF USER**
### Returns backpack of selected user by ID

*Mehod Url:* `/api/backpack/:id`
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
[
    {
        "id": 1,
        "type1": "fire",
        "type2": null,
        "name": "Charmander",
        "pokedex_number": 4,
        "users_id": 1
    },
    {
        "id": 2,
        "type1": "water",
        "type2": null,
        "name": "Squirtle",
        "pokedex_number": 7,
        "users_id": 1
    },
    {
        "id": 3,
        "type1": "water",
        "type2": null,
        "name": "Squirtle",
        "pokedex_number": 7,
        "users_id": 1
    }
]
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

## **DELETE POKEMON IN BACKPACK**
### Returns backpack of selected user by ID

*Mehod Url:* `/api/backpack/:id`
*HTTP method:* **[DELETE]**

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
>If you successfully delete one pokemon in backpack, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
1
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

<!-- 
## **GET TOPICS**
### Gets an array of quiz topics

*Method Url:* `/api/quizzes/topics`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Response 

##### 200 (OK)

```
[
  {
    "id": 2,
    "name": "JavaScript"
  }
]
```

---

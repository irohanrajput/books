# Book Management Server


## Tech Stack


- **Server:** Node, Express
- **Database:** PostgreSQL
- **ORM Tool:** Prisma



# Run Locally

## With Docker
Go to the project directory

```bash
  cd books
```
Start project with docker compose
```
  docker compose up
```
## Without Docker

Clone the project

```bash
  git clone https://github.com/irohanrajput/books.git
```

Go to the project directory

```bash
  cd books
```

Install dependencies

```bash
  npm install
```
Manage Database Migrations

```bash
  npx prisma migrate dev --name init

```
Setup PostgreSQL Database
```
      Database Name: booksPassword
      Database User: booksUser
      Password: booksDB
```


Start the server

```bash
  npm run start
```




# API REFERENCE

#### Register a new user
- **Endpoint:** `/api/auth/register/`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string" //(SELLER/BUYER) default = BUYER
  }
  
  ```

#### Login
- **Endpoint:** `/api/auth/login`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
  User will be given an Access Token on successful Validation.


## Book Management 

#### List all books
- **Endpoint:** `/api/books/`
- **Method:** GET

#### Add a new book
- **Endpoint:** `/api/books/`
- **Method:** POST
- **Allowed to SELLERS only**
- **Headers:**
  ```
  Authorization: Bearer your_access_token
  ```
- **Request Body:**
  ```json
  {
    "title": "string",
    "author": "string",
    "publishedAt": "date: ISO 8601",
    "price": "float",
  }
  ```
#### Upload multiple books using CSV file
- **Endpoint:** `/api/books/upload/`
- **Method:** POST
- **Allowed to SELLERS only**

- **Headers:**
  ```
  Authorization: Bearer your_access_token
  ```
  ### Using Postman:
  - **Request Body**

  ```
  Body Type: form-data
      key = "file" & select "file"
      value = upload the CSV file.

  ```

#### Retrieve a single book
- **Endpoint:** `/api/books/book_id/`
- **Method:** GET

#### Update a book
- **Endpoint:** `/api/books/book_id/`
- **Method:** PUT
- **>>Allowed to CREATOR-SELLERS only**
- **Headers:**
  ```
  Authorization: Bearer your_access_token
  ```
- **Request Body:** (same as create)

#### Delete a book
- **Endpoint:** `/api/books/<pk>/`
- **Method:** DELETE
- **>>Allowed to CREATOR-SELLERS only**

- **Headers:**
  ```
  Authorization: Bearer your_access_token
  ```
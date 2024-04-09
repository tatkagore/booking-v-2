# Restaurant Reservation Project 👩🏻‍🍳

- [Restaurant Reservation Project 👩🏻‍🍳](#restaurant-reservation-project-)
  - [How to install:](#how-to-install)
  - [This project focuses on creating a backend system for managing restaurant reservations:](#this-project-focuses-on-creating-a-backend-system-for-managing-restaurant-reservations)
    - [Summary of Problems Encountered and Solutions Envisaged 📝](#summary-of-problems-encountered-and-solutions-envisaged-)
    - [Dictionary:](#dictionary)
    - [Used tools 🛠️](#used-tools-️)
    - [How to use](#how-to-use)
    - [API Endpoints 📲](#api-endpoints-)
    - [Database scheme 🎯](#database-scheme-)
    - [Postman screenshots 👩🏻‍🚀](#postman-screenshots-)
    - [Resources Consulted and Technological Monitoring 👩🏻‍💻](#resources-consulted-and-technological-monitoring-)

## How to install:
Add your own database information
```bash
echo -e "PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db_name
DB_HOST=your_host
```

```bash
npm install
npx sequelize-cli db:create 
npx sequelize db:migrate
npx sequelize db:seed:all
npm run start
```

## This project focuses on creating a backend system for managing restaurant reservations:

- Creation of a backend using Node.js with the Express framework.
- Use of a PostgreSQL database with the Sequelize ORM to manage data.
- Implementation of CRUD (Create, Read, Update, Delete) and routes to manipulate data.

### Summary of Problems Encountered and Solutions Envisaged 📝

- Database Integration: Integrating PostgreSQL using Sequelize was complex. We relied on Sequelize documentation, online forums, and used migrations for efficient schema management.
- Route Handling: Implementing CRUD routes demanded meticulous planning. We divided the process into smaller steps and created separate route handlers, improving code manageability and modularity.
- Error Handling: Ensuring meaningful error responses was crucial. We implemented error handling middleware to catch and log errors, enhancing user experience.
- Security: We prioritized security, using middleware, input validation, authentication, and authorization. We securely managed sensitive data like API keys and passwords.

### Dictionary: 
 - `Node.js`: is an open-source, server-side runtime environment that allows developers to run JavaScript code outside the browser. 
 - `Express`: is a minimal and flexible Node.js web application framework that provides a set of features for building web and mobile applications. It simplifies the process of building robust APIs and web applications, making it a popular choice for creating backends.
 - `PostgreSQL`: is a powerful, open-source relational database management system (RDBMS). It's known for its robustness, extensibility, and compliance with SQL standards. It's commonly used as a database for web applications and offers features for data integrity, scalability, and performance.
 - `Bcrypt`: is a widely-used cryptographic hashing function. In the context of web development, bcrypt is commonly used to securely hash and store passwords in databases. It adds a layer of security by making it computationally expensive to crack hashed passwords.
 - `Seeding`: is a process in which an initial set of data is provided to a database when it is being installed. It is especially useful when we want to populate the database with data we want to develop in future. So our goal is to “feed” the database with dummy data on its initialization.
 - `ORM` (Object-Relational Mapping): is a programming technique that allows you to interact with a relational database using an object-oriented paradigm. In this project, Sequelize is an example of an ORM that simplifies database interactions.
- `Sequelize`: is (ORM) library for JavaScript and Node.js, specifically designed for working with relational databases. It provides an abstraction layer that allows developers to interact with databases using JavaScript objects and methods, rather than writing raw SQL queries. Sequelize supports multiple database management systems, including PostgreSQL, MySQL, SQLite, and Microsoft SQL Server.
- `Token-based Authentication`: is a method where a token is provided to authenticated users, which they use for subsequent requests. In this project, we use JSON Web Tokens (JWT) for authentication.
- `JWT` stands for "JSON Web Token." It is a compact, self-contained, and secure way of representing information between two parties, typically the client and the server. JWTs are commonly used for authentication and data exchange in web applications and APIs. 




### Used tools 🛠️

- Node.js
- PostgreSQL
- VSCode
- TablePlus
- Postman
- brew
- ohmyzsh
- git/github
- terminal
- scheme drawio

### How to use

Requirements:
 - Postgres

To run tests:
 - Connect to postgres by running `psql postgres`
 - Create a user by running : `create user tatianasimmer;`
 - Create a database with an owner by running `create database database_test with owner=tatianasimmer;`
 - Quit postgres by ctrl + d
 - Run migrations on the database by running: `npx sequelize db:migrate --env test`
 - Add objects in db necessary for tests by running: `NODE_ENV=test node seeders/index.js`
 - Run tests by running: `npm test`

To run development server:
 - Connect to postgres by running `psql postgres`
 - Create a user by running : `create user tatianasimmer;`
 - Create a database with an owner by running `create database database_development with owner=tatianasimmer;`
 - Quit postgres by ctrl + d
 - Run migrations on the database by running: `npx sequelize db:migrate`
 - Run server by running: `npm run start`

### API Endpoints 📲

- GET /reservation: Retrieve the list of reservations
- POST /reservation: Create a new reservation
- PUT /reservation/: Modify an existing reservation
- DELETE /reservation/: Delete a reservation

### Database scheme 🎯

> `Users` and `Reservations` Relationship (One-to-Many):
> One user can make many reservations.
- `Ref: Reservations.user_id > Users.id`


> `Users` and `Membership` Relationship (One-to-One):
> Each user has one membership, and each membership is associated with one user
- `Ref: Membership.user_id - Users.id`

> `Users` and `Orders` Relationship (One-to-Many):
> One user can place many orders.
- `Ref: Orders.user_id > Users.id`
- `Ref: Orders.plate_id > Plates.id`


> `OrderItems` and `Plates` (Many-to-One )
> - Many: Each order can contain multiple items (or plates), so you can have multiple `OrderItems` entries associated with the same order.
> - One: Each entry in `OrderItems` is linked to one, and only one, `Orders` entry, indicating which specific order the item belongs to.
> - Many: A specific plate can be ordered multiple times across different orders, so you can have multiple OrderItems entries for the same plate_id.
> - One: Each entry in OrderItems corresponds to one, and only one, plate in the Plates table, specifying which plate was ordered.
- `Ref: OrderItems.order_id > Orders.id`
- `Ref: OrderItems.plate_id > Plates.id`


- ![Database scheme](db.png?raw=true  "Database scheme")

### Postman screenshots 👩🏻‍🚀

- Reservation - Get
  ![Reservation-get](reservation-get.png?raw=true "Reservation-get")
- Reservation - Post
  ![Reservation-post](reservation-post.png?raw=true "Reservation-post")
- Reservation - Put
  ![Reservation-put](reservation-put.png?raw=true "Reservation-put")
- Reservation - Delete
  ![Reservation-del](reservation-del.png?raw=true "Reservation-del")

- Signin - Post
  ![Signin-post](signin-post.png?raw=true "Signin-post")
- SignUp - Post
  ![Signup-post](signup-post.png?raw=true "Signup-post")

### Resources Consulted and Technological Monitoring 👩🏻‍💻

We referred to the following resources and monitored technological advancements:

- [Official Node.js and Express Documentation](https://nodejs.org/en/docs)
- [Sequelize Documentation](https://sequelize.org/)
- [Stack Overflow](https://stackoverflow.com/)
- [YouTube Tutorials](https://www.youtube.com/watch?v=tpso18ghda4&t=821s)
- Online Forums and Communities
- Tech Blogs and News Sites

### Restaurant Reservation Project 👩🏻‍🍳

#### This project focuses on creating a backend system for managing restaurant reservations: 

 - Creation of a backend using Node.js with the Express framework.
 - Use of a PostgreSQL database with the Sequelize ORM to manage data.
 - Implementation of CRUD (Create, Read, Update, Delete) and routes to manipulate data.


### Summary of Problems Encountered and Solutions Envisaged 📝
- Database Integration: Integrating PostgreSQL using Sequelize was complex. We relied on Sequelize documentation, online forums, and used migrations for efficient schema management.
- Route Handling: Implementing CRUD routes demanded meticulous planning. We divided the process into smaller steps and created separate route handlers, improving code manageability and modularity.
- Error Handling: Ensuring meaningful error responses was crucial. We implemented error handling middleware to catch and log errors, enhancing user experience.
- Security: We prioritized security, using middleware, input validation, authentication, and authorization. We securely managed sensitive data like API keys and passwords.

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

### API Endpoints 📲
- GET /reservation: Retrieve the list of reservations
- POST /reservation: Create a new reservation
- PUT /reservation/: Modify an existing reservation
- DELETE /reservation/: Delete a reservation

### Database scheme 🎯
- ![Database scheme](scheme.png?raw=true "Database scheme")

### Postman screenshots 👩🏻‍🚀
 - Reservation - Get
 ![Reservation-get](reservation-get.png?raw=true "Reservation-get")
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

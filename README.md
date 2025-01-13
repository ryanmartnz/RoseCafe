# The Rose Café 

## A full-stack e-commerce application for a cafe using the PERN stack

Rose Cafe is a web application that allows users to place food and drink orders to the cafe. Users can create an account to place orders and track their previous orders.

The application frontend was created using JavaScript, React, and HTML/CSS. The application backend was created using Express.js, PostgreSQL, and Node.js.

## How to Install and Run the Rose Cafe
1. In a new terminal, navigate to the server directory from the main directory
   
   ```
   $ cd server
   ```
2. Install the server's dependencies
   
   ```
   $ npm install
   ```
3. Edit the .env file in the server directory and change the PGPASSWORD variable to the password provided in my resume

4. Edit the .env file again and change the MY_SECRET variable to a random string of your choosing. This will be used to sign the JSON web tokens in the application.

5. Start the server. After this, the server should be running on http://localhost:3000

   ```
   $ node index
   ```
6. In a seperate terminal, navigate to the client directory from the main directory

   ```
   $ cd client
   ```
7. Install the client's dependencies 

   ```
   $ npm install
   ```
8. Start the server. After this, the program should be accessible from a web browser on http://localhost:3001

   ```
   $ npm start
   ```

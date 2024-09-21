//access express,cors,pg and dotenv
import express from "express";
import cors from "cors";
import dotenv from "dotenv";


//config .env to server
dotenv.config();

import pg from "pg";

const dbConnectingString = process.env.DATABASE_URL;

//we need to collect all the request from the server
export const db =new pg.Pool({
    connectionString: dbConnectingString,
});

const app = express();
//I need to tell my express app to use json
//I need to tell my express app to use cors
app.use(cors());
app.use(express.json());


const PORT =8080;
//I need to set up a port for my app to listen
app.listen(PORT, function () {
    console.log("Server is running");
  });
//! need to set up my database pool using the connection string from the .env file

//I need to set up a root route
app.get("/", function (request, response) {
    //task we want this endpoint to store
    response.json({ message: "Hotel Ratings API is working." });
  });

  app.get("/hotel_rating", async (request, response)=> {
    //task we want this endpoint to store
    const query = await db.query (`SELECT * FROM hotel_rating `);
    response.json(query.rows);
    console.log(query);
  });






// //I need to write an endpoint to ADD new data
// app.post("/hotel_rating", async (request, response)=> {
//     //we will use our request parameter to access the data in the body
//     //the body stores the data that comes from the user
//     const bodyData = request.body;

//     console.log(bodyData);

//      //we will use our response parameter to see what data was added
//   response.json({
//     message: "Body data received",
//     item: `${bodyData.location}`,
//   });
// });



//You need two routes minimum

//You need a route to READ the database data

//You need a route to CREATE or ADD new data to the database
//! In your CREATE route, the request.body is an object that represents the form data coming from your client

//You need to use SQL queries and parameters in these routes

//======================
//For this assignment, the minimum you need is one table to store your user feedback
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
  
  app.post("/hotel_rating", function (request, response) {
    const bodyData = request.body;
    console.log("Received Data:", bodyData);
    if (!bodyData.username || !bodyData.location 
        || !bodyData.hotel || !bodyData.rating
        || !bodyData.comment) {
        // If any of these fields are missing, send a response with a 400 status code (Bad Request)
        return response.status(400).json({ error: "Please provide all required fields" });
    }
    
    const query = ` INSERT INTO hotel_rating (username, email, location, hotel, rating, comment)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;
    
    const values = [bodyData.username, 
    bodyData.email, bodyData.location, 
    bodyData.hotel, bodyData.rating, bodyData.comment];
    
    db.query(query, values, function (error, result) {
    // 6. If there's an error executing the query, send a 500 status code (Internal Server Error)
    if (error) {
        return response.status(500).json({ error: "Failed to add hotel rating" });
    }
    // 7. If the data was successfully inserted, we send back a success message and the newly added data
    response.status(201).json({
        message: "Hotel rating added successfully!",
        newRating: result.rows[0], // This is the newly inserted row
        });
    });
    
    // The response will contain the newly added hotel rating and a message saying that the operation was successful.
    });





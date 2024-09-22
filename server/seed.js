//add my SQL queries to create my table and add dummy data

import{ db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS hotel_rating(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) ,
    email VARCHAR(150),
    hotel_location VARCHAR(255),
    hotel_name VARCHAR(225),
    rating INT CHECK (rating >= 1 AND rating <= 5)
   
  );`);


  db.query(`INSERT INTO hotel_rating (name,email,hotel_location,hotel_name,rating)
VALUES('Sam','sam@email.com','York','The Grand', '2' )`);
console.log("Hello");

//DOM manipulation
//select the form
//select the feedback container
const hotelRatingForm = document.getElementById("hotel-rating-form");

const feedbackContainer =document.getElementById("feedback-container");

//FORM
//we need an event to submit the form data
//the event handler
//prevent the default behaviour
async function handleSubmit(event) {
    event.preventDefault(); 

//get the formValues to insert them into the FormData object
const formData = new FormData(hotelRatingForm);

const formValues=Object.fromEntries(formData);
console.log(formValues);

hotelRatingForm.addEventListener("submit",handleSubmit);

try{
    
    const response= await fetch("http://localhost:8080/hotel_rating",{ //!remember to add the render endpoint url
    //the method specifies what endpoint method we are fetching
    method: "POST",
    //the headers tell the endpoint the type of language our data is written in
    headers: {
      "Content-Type": "application/json",
    },
    //the data we are sending to the endpoint (it can only send strings)
    body: JSON.stringify({ formValues }),
  });

if(!response.ok) {
    throw new Error("submit fail");
}
}


// FEEDBACK CONTAINER
// Fetch the READ endpoint to have access to the feedback data
async function fetchFormValues () {
    try {
      //! Replace 'localhost-url' with your deployed server URL when done
      const response = await fetch("http://localhost:3000/feedback");
  
      if (!response.ok) {
        throw new Error("Failed to fetch feedback messages");
      }
  
      const databaseData = await response.json();
      displayFormValues(databaseData);
    } catch (error) {
      console.error("Error:", error);
    }
  }


  databaseData.forEach((item) => {
    // Create DOM elements to contain the data
    const usernameElem = document.createElement("h3");
    const emailElem = document.createElement("p");
    const locationElem = document.createElement("p");
    const hotelElem = document.createElement("p");
    const ratingElem = document.createElement("p");

    // Assign values to the text content of each element
    username.textContent = `Username: ${item.username}`;
    email.textContent = `Email: ${item.email}`;
    location.textContent = `Location: ${item.location}`;
    hotel.textContent = `Hotel: ${item.hotel}`;
    rating.textContent = `Rating: ${item.rating}`;

    // Append elements to the feedback container
    formValues.appendChild(usernameElem);
    formValues.appendChild(emailElem);
    formValues.appendChild(locationElem);
    formValues.appendChild(hotelElem);
    formValues.appendChild(ratingElem);
  });
}

// Fetch the feedback messages when the page loads
document.addEventListener("DOMContentLoaded", fetchFeedbackMessages);


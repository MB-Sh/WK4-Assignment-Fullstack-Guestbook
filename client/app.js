console.log("Hello");

// DOM manipulation
// Select the form and the feedback container
const hotelRatingForm = document.getElementById("hotel-rating-form");
const feedbackContainer = document.getElementById("feedback-messages");

// FORM
// We need an event to submit the form data

// Prevent the default behavior
async function handleSubmit(event) {
  event.preventDefault(); // Prevent form from reloading the page

  // Get the formValues to insert them into the FormData object
  const formData = new FormData(hotelRatingForm);

  // Convert formData to a plain object
  const formValues = Object.fromEntries(formData);
  console.log(formValues);

  try {
    // Fetch the CREATE endpoint to send the formValues to the server
    //! Replace 'localhost-url' with your deployed server URL when done
    const response = await fetch("https://wk4-assignment-fullstack-guestbook.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Send JSON data
      },
      body: JSON.stringify(formValues), // Convert the form values to a JSON string
    });

    if (!response.ok) {
      throw new Error("Failed to submit feedback");
    }

    // After successful submission, reset the form
    hotelRatingForm.reset();

    // Fetch the updated feedback messages and display them
    fetchFeedbackMessages();
  } catch (error) {
    console.error("Error:", error);
  }
}

// The event listener for form submission
hotelRatingForm.addEventListener("submit", handleSubmit);

// FEEDBACK CONTAINER
// Fetch the READ endpoint to have access to the feedback data
async function fetchFeedbackMessages() {
    //! Replace 'localhost-url' with your deployed client URL when done
    const response = await fetch("https://wk4-assignment-fullstack-guestbook-1.onrender.com");
    const databaseData = await response.json(); // Parse response into JSON
    displayFormValues(databaseData); // Call function to display the data
  } 


// Function to display feedback messages on the page
function displayFormValues(databaseData) {
  // Clear previous feedback messages
  feedbackContainer.innerHTML = "";

  // Loop through each feedback item and create elements to display
  databaseData.forEach((item) => {
    const username = document.createElement("h3");
    const email = document.createElement("p");
    const location = document.createElement("p");
    const hotel = document.createElement("p");
    const rating = document.createElement("p");
    const comment = document.createElement("p");


    // Assign values to the text content of each element
    username.textContent = `Username: ${item.username}`;
    email.textContent = `Email: ${item.email}`;
    location.textContent = `Location: ${item.location}`;
    hotel.textContent = `Hotel: ${item.hotel}`;
    rating.textContent = `Rating: ${item.rating}`;
    comment.textContent = `Comment: ${item.comment}`;

    // Append the elements to the feedback container
    feedbackContainer.appendChild(username);
    feedbackContainer.appendChild(email);
    feedbackContainer.appendChild(location);
    feedbackContainer.appendChild(hotel);
    feedbackContainer.appendChild(rating);
    feedbackContainer.appendChild(comment);
  });
}

// Fetch the feedback messages when the page loads
window.addEventListener("DOMContentloaded", fetchFeedbackMessages);

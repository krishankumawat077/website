// 1. Find the form in your HTML using its ID
const studentForm = document.getElementById('studentForm‎');

// 2. Listen for when the user clicks the "Submit" button
studentForm.addEventListener('submit', async (e) => {
    
    // STOP the browser from refreshing (Fixes the issue in your screenshot)
    e.preventDefault(); 

    console.log("Form submission detected! Sending to Render...");

    // 3. Collect the data from the input fields
    const formData = {
        name: studentForm.name.value,
        email: studentForm.email.value,
        message: studentForm.skills.value
    };

    try {
        // 4. Send the data to your LIVE Render server
        const response = await fetch('https://my-backend-ko9k.onrender.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) // Convert object to JSON string
        });

        // 5. Get the response from your server
        const result = await response.json();

        if (response.ok) {
            alert("Success! Data saved to MongoDB.");
            studentForm.reset(); // Clear the form fields
        } else {
            alert("Server Error: " + result.error);
        }

    } catch (error) {
        console.error("Connection Error:", error);
        alert("Could not connect to the backend. Is Render awake?");
    }
});

// 1. Find the form (Cleaned from invisible characters)
const studentForm = document.getElementById('studentForm');

// 2. Listen for the submit event
if (studentForm) {
    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        console.log("Form submission detected! Sending to Render...");

        // 3. Collect data correctly using the IDs from your HTML
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('skills').value // Mapping 'skills' to 'message' for your backend
        };

        try {
            // 4. Send the data to Render
            const response = await fetch('https://my-backend-ko9k.onrender.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) 
            });

            const result = await response.json();

            if (response.ok) {
                alert("Success! Data saved to MongoDB.");
                studentForm.reset(); 
            } else {
                alert("Server Error: " + (result.error || "Unknown error"));
            }

        } catch (error) {
            console.error("Connection Error:", error);
            alert("Could not connect to the backend. Is Render awake?");
        }
    });
}

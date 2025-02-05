const express = require("express");
const cors = require("cors");
const app = express();


const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

//Temporary placeholder
const NET_API_URL = "http://localhost:5013";


app.get("/fetch-from-dotnet", async (req, res) => {
    try{
        const response = await fetch(`${NET_API_URL}/players`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch data from .NET API"});
    }
});

app.post("/add-to-dotnet", async (req, res) => {
    try {
        const newData = req.body;

        // Log request data
        console.log("Received data from frontend:", newData);

        if (!newData.firstName || !newData.lastName || !newData.position || !newData.club) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        console.log("Sending data to .NET API:", newData); 

        const response = await fetch(`${NET_API_URL}/player`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        });

        const result = await response.json();
        console.log("Response from .NET API:", result); // Debugging response
        res.json({ message: "Data sent successfully", response: result });

    } catch (error) {
        console.error("Error sending data to .NET API:", error); // Log any errors
        res.status(500).json({ error: "Failed to send data to .NET API" });
    }
});


app.listen(port, () => {
    console.log("Yo, my name is André 3000");
});

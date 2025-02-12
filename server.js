const express = require("express");
const cors = require("cors");
const app = express();


const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

const NET_API_URL = "https://labb2api.azurewebsites.net";


app.get("/get-players", async (req, res) => {
    try{
        const response = await fetch(`${NET_API_URL}/players`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch data from .NET API"});
    }
});

app.post("/add-player", async (req, res) => {
    try {
        const newData = req.body;

        if (!newData.firstName || !newData.lastName || !newData.position || !newData.club || !newData.country) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const response = await fetch(`${NET_API_URL}/player`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        });

        const result = await response.json();
        res.json({ message: "Data sent successfully", response: result });

    } catch (error) {
        res.status(500).json({ error: "Failed to send data to .NET API" });
    }
});


app.listen(port, () => {
    console.log("Yo, my name is André 3000");
});

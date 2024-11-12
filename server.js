const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// Connect to MongoDB
mongoose.connect("mongodb+srv://<username>:<password>@cluster.mongodb.net/enterprise_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Schema and Model
const DataSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const Data = mongoose.model("Data", DataSchema);

// Routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "views", "about.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "views", "contact.html")));
app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "views", "dashboard.html")));

// API to get all data
app.get("/api/data", async (req, res) => {
    const data = await Data.find();
    res.json(data);
});

// API to submit data from contact form (for demonstration purposes)
app.post("/api/data", async (req, res) => {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json(newData);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

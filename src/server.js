import express from "express"
import path from 'path';

const __dirname = path.resolve();
const publicDir = path.join(__dirname, 'public');

const app = express()

app.use(express.static(publicDir))

app.listen(8084, () => {
    console.log("Server running on port 8084")
})
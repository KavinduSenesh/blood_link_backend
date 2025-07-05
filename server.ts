import app from './app';
import connectDB from "./src/config/db";
import {Request, Response} from "express";

const port = process.env.PORT || 3000;

connectDB().then(r => {
    console.log("Database connected successfully");
});

app.get('/', (req: Request, res: Response) => {
    res.send("Blood_link backend is running!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

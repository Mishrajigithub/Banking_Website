import express from 'express';
import cors from 'cors';

import router from './src/Routes/api.js';
import { connectUsingMongoose } from './src/config/mongoose.js';



const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    return res.send("welcome to banking website api")
})

app.use("/api", router);


app.use((req, res) => {
    return res.status(401).send("resource not found");
})


const port = 8000;
app.listen(port, async () => {
    console.log(`server is running on port number :${port}`)
    await connectUsingMongoose();
})
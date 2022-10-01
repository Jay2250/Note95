require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const cors = require('cors');
const authRouter = require('./Routes/Auth')
const notesRouter = require('./Routes/Notes')
const authMiddleware = require('./middleware/Auth')
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Notes API</h1>');
});


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/note', authMiddleware, notesRouter);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        // console.log(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
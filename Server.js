const express = require('express')
const port = process.env.PORT || 8080;
const nexchatbot = require('./config/nexchatbot');
const cors = require('cors');

var corsOptions = {
    origin: "https://nexusmind-clone-32jd.vercel.app"
};
const app = express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
//app.use(cors(corsOptions));

app.post('/chatbot', async (req, res) => {
    const { text } = req.body;

    try {
        const data = await nexchatbot(text)
        res.status(200).json({ chatbot: data })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }

})


//Listen to port 
app.listen(port, () => {
    console.log('app running at port ' + port)

})

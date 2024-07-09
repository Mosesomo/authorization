const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const route = require('./api/route');
app.use('/', (req, res) => {
	res.status(200).json({message: "Hello and welcome"});
});

app.use('/', route);

sequelize.sync()
    .then(() => {
        console.log('Database connected and synchronized successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

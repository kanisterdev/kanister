const express = require('express');
const app = express();

var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static(__dirname + 'public'));

app.get('/', async (req, res) => {
    var response = await docker.listContainers({all: true}).catch((err) => { console.error(err); });
    res.send(response[0].Id);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
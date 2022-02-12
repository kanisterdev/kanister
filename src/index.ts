import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import dockerode from 'dockerode';
import helmet from 'helmet';

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
 }

const PORT: number = parseInt(process.env.PORT as string);

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.static(__dirname + 'public'));
app.use(express.json());

const docker = new dockerode({socketPath: '/var/run/docker.sock'});

app.get('/', async (req, res) => {
    var response = await docker.listContainers({all: true}).catch((err) => { console.error(err); });
    res.send(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import api     from './api/api';
import bp      from 'body-parser';	
import path    from 'path';

const app = express();

app.use(bp.json());

app.use('/api/', api);

app.use(express.static(path.resolve( __dirname, './dist')));

app.listen(5000, () => console.log('Running on localhost:5000'));
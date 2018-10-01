import express    from 'express';
import api        from './api/api';
import bp         from 'body-parser';	
import path       from 'path';
import checkToken from './middleware/simpleMiddleware';
const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use(bp.json());

app.use(checkToken);
app.use('/api/', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});



app.listen(5000, () => console.log('Running on localhost:5000'));

export default app;
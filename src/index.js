import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';

// Import routes
import api from './routes/api';
import index from './routes/index';

const app = new Hono();

app.use('*', cors());
app.use('*', prettyJSON());

app.route('/api', api);
app.route('/', index);

app.fire();

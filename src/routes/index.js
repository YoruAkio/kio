import { Hono } from 'hono';

const index = new Hono();

index.get('/', c => {
    return c.json({
        message: 'Hello from Index',
    });
});

export default index;

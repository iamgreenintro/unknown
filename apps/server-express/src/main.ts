import { App } from './server';

import IndexRoute from './routes/index';

// Routes we want to be handled by our Express App:
const routes = [new IndexRoute()];

const app = new App(routes);

app.listen();

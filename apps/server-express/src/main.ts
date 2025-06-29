import { App } from './server';

import { IndexRoute } from './routes/index';
import { UserRoute } from './routes/user';
import { AuthRoute } from './routes/auth';

// Routes we want to be handled by our Express App:
const routes = [new IndexRoute(), new UserRoute(), new AuthRoute()];

const app = new App(routes);

app.listen();

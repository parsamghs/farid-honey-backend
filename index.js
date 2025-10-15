import config from './src/Config/index.js';
import app from './src/app.js';

const port = config.port;

app.listen(port, () => {
  console.log(`Server is running`);
});

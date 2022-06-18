import express from 'express';
import bodyParser from 'body-parser';
import { IndexRouter } from './controllers/v0/index.router';

(async () => {

  const app = express();

  const port = 8082;

  app.use(bodyParser.json());

  /**
   * Restricts CORS
   */
  app.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


  app.use('/api/v0', IndexRouter);

  /**
   * Root URI Call
   * Displays Available Api Versions
   */
  app.get( '/', async ( req, res ) => {
    res.send("/api/v0")
  } );

  
  /**
   * Start the Server
   */
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
import { Router } from 'express';
import certificates from './routes/certificates';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  certificates(app);

  return app;
};

import cors from 'cors';

const corsMiddleware = cors({
  origin: true,  // Reflects the requesting origin
  credentials: true, // Allow cookies/auth headers if needed
});

export default corsMiddleware;

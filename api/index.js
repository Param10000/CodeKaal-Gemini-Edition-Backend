// Import the Express app from the original location
const app = require('../src/app');

// Export the Vercel serverless function handler
module.exports = (req, res) => {
  // Vercel's serverless functions don't use the 'http' module directly,
  // so we need to handle the request/response objects appropriately
  
  // Set CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Pass the request to the Express app
  return app(req, res);
};

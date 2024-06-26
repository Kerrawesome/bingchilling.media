const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const response = await fetch(url);
    let body = await response.text();

    // Remove ads and unwanted scripts
    body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    body = body.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '');

    res.status(200).send(body);
  } catch (error) {
    res.status(500).send('Error fetching the URL');
  }
};

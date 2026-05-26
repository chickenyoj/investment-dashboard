exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Get API key from request header (sent from dashboard)
  const apiKey = event.headers['x-user-api-key'];
  if (!apiKey || !apiKey.startsWith('sk-ant-')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: { message: 'Invalid or missing API key.' } })
    };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: { message: err.message || 'Proxy error' } })
    };
  }
};

const contentful = require('contentful-management');

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    if (!data.title || !data.description || !data.ranking) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const client = contentful.createClient({
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT);

    const entry = await environment.createEntry(process.env.CONTENT_TYPE_ID, {
      fields: {
        title: { 'en-US': data.title },
        description: { 'en-US': data.description },
        ranking: { 'en-US': parseInt(data.ranking, 10) },
      },
    });
    console.log('Starting function...');
    console.log('Environment Variables:', process.env);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Content created successfully', entry }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

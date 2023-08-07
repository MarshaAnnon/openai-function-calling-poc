import { Configuration, OpenAIApi } from 'openai';
import { availableFunctions } from '../../utils/functions';
import { App } from '@slack/bolt';
import { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const functions = availableFunctions;

var history = [];

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  try {
    history.push({ role: 'user', content: req.body.text });

    let responseText = '';
    const response = await getOpenAiResponse();
    if (response.function_call) {
      responseText = await callFunction(response.function_call);
      history.push({
        role: 'function',
        name: response.function_call.name,
        content: responseText,
      });
    } else {
      responseText = response.content;
      history.push({ role: 'assistant', content: responseText });
    }

    return res.status(200).json({ result: responseText });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}

async function getOpenAiResponse() {
  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a chat assistant.',
      },
      ...history,
    ],
    functions: functions.map((func) => func.schema),
  };

  const result = await openai.createChatCompletion(payload);
  console.log('the results are --->>>', result);
  return result.data.choices.shift().message;
}

function callFunction(function_call) {
  const func = functions.find(
    (func) => func.schema.name === function_call.name
  );
  const args = JSON.parse(function_call.arguments);
  return func.function(args);
}

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Slack bot server is running!');
})();

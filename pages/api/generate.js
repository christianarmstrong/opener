import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "write me a very short and intriguing conversation opener with a girl you met on tinder that compliments her and makes her think you're smart and funny but do not mention her profile or tinder";
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: .1,
        max_tokens: 100,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `Write me a short playful conversation starter based on the information given to you about a girl you are speaking to. Don't include Example Output in results. Make sure you answer only 1 question. Use the examples below for reference.

prompt: Fuck zodiac signs, I’ll judge you based off your starter Pokémon. Also in need of a date for 2 weddings

output: my starter Pokémon is Squirtle hope u don't judge me too harshly.

prompt: Chronic deleter of this app. Brown hair is most recent but the black and green will be back soon. Enjoying time in the garden makes up my entire personality. I have two cats Daffodil and Tiger Lily and a dog named Paducah. They are my best friends. INFJ, and Environmental Plant Science Major. I'm a sad girl, that loves the earth. Thicc/ chubby 5'7" with a spicy brain. My dog and I both have anxiety, wherever I go he goes. Future homestead wife. Socialist

output: What's a spicy brain? and what do you plant in your garden?

prompt: it’s a lot a pressure to talk about myself in 500 characters

output: would you less pressured to talk about yourself over some coffee?

prompt: International Business Major, 5’10,just living life

output: How's living life and being 5'10 going?

prompt: I know nobody reads these, but it’s chill. Just out here trying not to be alone again for the holidays. I’m looking for something genuine, Not looking for hookups!

 output: I read these and I also wouldn't mind not being alone for the holidays.

prompt: Kinda funny. Kinda dumb. Very sweet 😮‍💨Make love. Make Art. Make Out 🥰Don’t yell at me. I will cry 😤Probably at work 😬Not skinny 😊

output: Do you make art?

prompt: My dad kicked me out I'm sad but not ugly. I like to smoke skate and whatever you like lol

output: Where do you like to skate?

prompt: vibing at 19 ༶•┼•༶ Rebellious Gemini ༶•┼•༶

output: So what kind of rebellious things do you like to do?

Girl:\n

`;
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n output: \n`,
        temperature: .6,
        max_tokens: 150,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
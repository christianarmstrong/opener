import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Opener</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Opener</h1>
          </div>
          <div className="header-subtitle">
            <h2>The best way to open a conversation.</h2>
          </div>
          <div className="header-subtitle">
            <h2>Describe who you want to talk to and <br class="responsive" /> get the perfect opening line.</h2>
          </div>
        </div>
        <div className="prompt-container">

          <div style={{ textAlign: 'left' }} className="prompt-headers">
            <h2>What's their name?</h2>
          </div>

          <textarea
            className="prompt-box"
            placeholder="Enter their name"
            value={userInput}
            onChange={onUserChangedText}
          />;

          <div className="prompt-headers">
            <h2>How old are they?</h2>
          </div>

          <textarea
            className="prompt-box"
            placeholder="Enter their age"
            value={userInput}
            onChange={onUserChangedText}
          />;

          <div className="prompt-headers">
            <h2>What does their bio say <br class="responsive" /> about them?</h2>
          </div>

          <textarea
            className="prompt-box"
            placeholder="Describe them"
            value={userInput}
            onChange={onUserChangedText}
          />;


          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Home;

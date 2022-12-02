import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';


const Home = () => {
  const [age_userInput, age_setUserInput] = useState('');
  const [name_userInput, name_setUserInput] = useState('');
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
    document.getElementById("enterNameText").style.display = "none";
    document.getElementById("enterNameBox").style.display = "none";
    document.getElementById("enterAgeText").style.display = "none";
    document.getElementById("enterAgeBox").style.display = "none";
    document.getElementById("enterDescriptionText").style.display = "none";
    document.getElementById("enterDescriptionBox").style.display = "none";
    document.getElementById("enterGenerateButton").style.display = "none";
    document.getElementById("subsubtitle").style.display = "none";
    document.getElementById("Try Again").style.visibility = "visible"
    document.getElementById("retryButton").style.visibility = "visible"
    document.getElementById("retryText").style.visibility = "visible"
    document.getElementById("openerHeading").style.visibility = "visible"
    document.getElementById("prompts").style.width = "50%";
  }
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const onUserChangedNameText = (event) => {
    name_setUserInput(event.target.value);
  };

  const onUserChangedAgeText = (event) => {
    age_setUserInput(event.target.value);
  };

  const onRetryClicked = () => {
    window.location.href = window.location.href
  }

  (function (h, o, t, j, a, r) {
    h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
    h._hjSettings = { hjid: 3272704, hjsv: 6 };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script'); r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');




  return (
    <div className="root">
      <Head>
        <title>Opener</title>
      </Head>
      <div className="container">
        <div className="header" id="enterHeader">
          <div className="header-title">
            <h1>Opener</h1>
          </div>
          <div className="header-subtitle">
            <h2>The best way to open a conversation.</h2>
          </div>
          <div className="header-subsubtitle" id="subsubtitle">
            <h2>Describe your match to get the perfect opening line!</h2>
          </div>
          <div className="output-header-container" id="openerHeading">
            <div className="output-header" >
              <h3>Your Perfect Opener</h3>
            </div>
          </div>
        </div>
        <div className="prompt-container" id="prompts">

          <div style={{ textAlign: 'left' }} className="prompt-headers" id="enterNameText">
            <h2>What's their name?</h2>
          </div>

          <textarea
            className="prompt-box"
            placeholder="Enter their name"
            value={name_userInput}
            onChange={onUserChangedNameText}
            id="enterNameBox"
          />

          <div className="prompt-headers" id="enterAgeText">
            <h2>How old are they?</h2>
          </div>

          <textarea
            className="prompt-box"
            placeholder="Enter their age"
            value={age_userInput}
            onChange={onUserChangedAgeText}
            id="enterAgeBox"
          />

          <div className="prompt-headers" id="enterDescriptionText">
            <h2>What does their bio say about them?</h2>
          </div>

          <textarea
            className="prompt-box"
            placeholder="Hint: Copy + Paste their bio - everything you can get"
            value={userInput}
            onChange={onUserChangedText}
            id="enterDescriptionBox"
          />


          <div className="prompt-buttons" id="enterGenerateButton">
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
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
          <div className="prompt-buttons " id="Try Again" >
            <a className='retry-button' id="retryButton" onClick={onRetryClicked}>

              <div className="retry" id="retryText">
                <p>Retry</p>
              </div>

            </a>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;

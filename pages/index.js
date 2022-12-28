import Head from 'next/head';


//import Image from 'next/image';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RedirectToSignUp, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Navbar } from '../components/Navbar';
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
    document.getElementById("openerHeadingBefore").style.display = "none";

    document.getElementById("Try Again").style.visibility = "visible"
    document.getElementById("outputBoxWhole").style.visibility = "visible"
    document.getElementById("retryText").style.visibility = "visible"
    document.getElementById("openerHeading").style.visibility = "visible"
    document.getElementById("outputBox").style.visibility = "visible"
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




  return (


    <div className="root">

      <Head>
        <title>Opener</title>

      </Head>

      <SignedOut>
        <div className="" id="landingPageContainer">

          <picture>
            <source media="(max-width: 600px)" srcSet="phoneBackground.png" />
            <source media="(max-width: 990px)" srcSet="phoneBackground.png" />
            <img src="background.png" className="backgroundImage" />
          </picture>

          <h1 className="relative leading-[4rem] mt-[-.5em] md:mt-[1] lg:mt-6 min-[484px]:text-[5em] min-[484px]:leading-[.9em] text-white text-[4em] sm:leading-[1em] sm:text-[5.5em] md:text-[6em] top-44 text-center lg:text-left lg:left-[.1em]" id="openerTitle" >
            <p className="">Welcome to</p>
            <p className=" lg:pl-56" > Opener</p>
          </h1>

          <div className="relative text-white text-[1.7em] mx-12 top-56 leading-7  font-light text-center sm:mx-40 sm:text-[2.2em] sm:leading-8 lg:text-left manrope text-opacity-80 lg:w-[18em] lg:leading-10 lg:ml-[20%]">
            The best way to start a conversation. Proven to increase your chances of
            getting a response by 60%! Sign up free today and never say hey again!
          </div>

          <div className=''>
            <a href="accounts.opener.chat/sign-in" >
              <img
                className="relative top-64 m-auto h-[4.5em] w-[18em] min-[484px]:w-[20em] min-[484px]:h-[5em] sm:w-[24em] sm:h-[6em] md:w-[28em] md:h-[7em] lg:w-[24em] lg:h-[6em] lg:top-72 lg:left-[30%]"
                alt="sum"
                src="getStartedButton.png"

              />
            </a>

          </div>

          {/* Social Media Links. Hides on md and small screens*/}

          <a href="https://www.facebook.com/profile.php?id=100088076846318" target="_blank">
            <img className="fixed right-0 w-16 h-12 invisible top-[37%] mr-5   lg:visible" alt="fb" src="facebook.png" />
          </a>
          <a href="https://twitter.com/Opener_app" target="_blank">
            <img className="fixed right-0 w-16 h-12 invisible  top-[25%] mr-5  lg:visible" alt="" src="twitter.png" />
          </a>
          <a href="https://www.instagram.com/opener_app/" target="_blank">
            <img className="fixed right-0  w-16 h-12 invisible top-[31%] mr-5  lg:visible" alt="" src="instagram.png" />
          </a>
        </div>



        <a class="fixed mx-auto bottom-0 mb-[-2em] md:mb-[-1em] lg:mb-0 lg:left-0 lg:ml-20  " href="https://www.producthunt.com/posts/opener-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-opener&#0045;2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=371804&theme=light"
          alt="" class="w-64 h-40 lg:w-80 lg:h-80" /></a>
      </SignedOut >

      <SignedIn>
        <picture>
          <source media="(max-width: 600px)" srcSet="phoneBackground.png" />
          <source media="(max-width: 990px)" srcSet="phoneBackground.png" />
          <img src="background.png" className="backgroundImage" />
        </picture>


        <div className="container ">



          <div className="text-white text-[3.5rem] sm:text-[4.5em] md:text-[5rem] mt-20 md:mt-" id="openerHeadingBefore">
            <h1 className="">Opener</h1>
          </div>

          <div className="output-header-container  invisible" id="openerHeading">
            <div className="text-white text-[3.5em] sm:text-[5em] md:text-[5em] lg:text-[6em] xl:text-[7em] mt-24" >
              <h3>Your Opener</h3>
            </div>
          </div>



          <div className="relative invisible" id="outputBoxWhole">

            <div className="" id="Try Again" >
              <a className='right-0 bottom-0' id="retryButton" onClick={onRetryClicked}>

                <div className="text-white " id="retryText">
                  <img src="genButtonNoText.png" className="h-10 w-32 md:h-16 md:w-40 mx-auto absolute right-0 bottom-0 mb-5 mr-5" />
                  <p className="absolute right-0 bottom-0 mb-6 mr-8 md:mb-9 md:mr-12 text-2xl">Try Again</p>
                </div>

              </a>
            </div>

            <a href="https://badoo.com/" target="_blank">
              <img className="absolute bottom-6 left-[1rem] h-7 w-9 sm:left-5 sm:w-10 sm:h-8" alt="fb" src="badoo.png" />
            </a>
            <a href="https://bumble.com/" target="_blank">
              <img className="absolute bottom-0 left-[2.5rem] h-8 w-10 sm:left-[3.1rem] sm:w-11 sm:h-9 mb-[1.15rem] " alt="" src="bumble.png" />
            </a>
            <a href="https://tinder.com/" target="_blank">
              <img className="absolute bottom-0 left-[4.8rem] mb-[1.27rem] h-7 w-8 sm:left-[5.8rem] sm:w-9 sm:h-8 sm:mb-[1.4rem] " alt="" src="tinder.png" />
            </a>
            <a onClick={() => navigator.clipboard.writeText({ apiOutput })} target="_blank">
              <img className="absolute bottom-0 left-[6.4rem] h-8 w-12 sm:left-[7.8rem] sm:w-14 sm:h-10 mb-[1.15rem] " alt="" src="copy.png" />
            </a>

            <textarea
              className=" h-[14em] indent-4 sm:h-[8em] md:h-[10em] lg:h-[12em] text-white/90  text-3xl w-[10em] min-[480px]:w-[10em]  sm:w-[16em] md:w-[20em] lg:w-[24em] xl:w-[28em] bg-gradient-to-br from-[#dc6945] to-[#b94834] bg-opacity- border-[1.75px] border-[#DA9C93]
                          rounded-[40px] shadow-black/60 shadow-md p-3 pt-4  placeholder-white/50  batangas invisible "

              value={apiOutput}

              id="outputBox"

            />


          </div>

          <div className="fixed w-screen h-fit mr-24 left-[0%] top-[25%] sm:top-[27%]" id="prompts">

            <div className="lg:flex lg:flex-wrap lg:w-full lg:align-middle lg:justify-between content-center" id="nameGroup">
              <div className="lg:relative lg:flex-auto lg:basis-1/2 lg:mr-[-13%] lg:ml-[5%] ">
                <div className="text-white text-left lg:text-[2.5rem] lg:text-center text-align ml-[9%] sm:ml-[13%] md:ml-[17%] lg:ml-[0] text-2xl" id="enterNameText">
                  <h2>What's their name?</h2>
                </div>

                <textarea
                  className="relative mt-1 lg:mt-3 lg:h-[5rem] placeholder:text-xs text-xs text-white mb-5 ml-[7%] w-[80%] h-[3rem]  bg-gradient-to-br from-[#dc6945] to-[#b94834] bg-opacity-10 border-[1.75px] border-[#DA9C93]
                            rounded-[30px] shadow-black/25 shadow-md shadow-opa  text-[1em] p-3 pt-4  placeholder-white/50  batangas left-[1%] sm:left-[6%] sm:w-[73%] md:left-[10%] md:w-[67%] lg:mr-[0]  "
                  placeholder="Enter their name"
                  value={name_userInput}
                  onChange={onUserChangedNameText}
                  id="enterNameBox"

                />
              </div>

              <div className="lg:relative lg:flex-auto lg:basis-1/2 lg:ml-[1%] " id="ageGroup">
                <div className="text-white text-left lg:text-[2.5rem] lg:text-center ml-[9%] sm:ml-[13%] md:ml-[17%] lg:ml-[0]  text-2xl" id="enterAgeText">
                  <h2>How old are they?</h2>

                </div>

                <textarea
                  className="relative mt-1 lg:mt-3 lg:h-[5rem] placeholder:text-xs text-xs text-white mb-5 ml-[7%] w-[80%] h-[3rem] bg-gradient-to-br from-[#dc6945] to-[#b94834] border-[1.75px]
                            border-[#DA9C93] rounded-[30px] shadow-black/25 shadow-md 
                              text-[1em] p-3 pt-4  placeholder-white/50 batangas sm:left-[6%] sm:w-[73%] md:left-[10%] md:w-[67%] left-[1%] lg:ml-[0]"
                  placeholder="Enter their age"
                  value={age_userInput}
                  onChange={onUserChangedAgeText}
                  id="enterAgeBox"

                />
              </div>

              <div className="lg:relative lg:flex-auto  lg:mt-5 lg:w-auto" id="bioGroup">
                <div className="text-white lg:text-center lg:text-[2.5rem] lg:ml-[0] ml-[9%] sm:ml-[13%] md:ml-[17%] text-2xl  " id="enterDescriptionText">
                  <h2>What's their bio?</h2>
                </div>

                <textarea
                  className="relative mt-1 lg:mt-3 placeholder:text-xs text-xs text-white mb-5 ml-[7%]  h-[8rem] bg-gradient-to-br from-[#dc6945] to-[#b94834] border-[1.75px]
                        border-[#DA9C93] rounded-[30px] shadow-black/25 shadow-md  
                        text-[1em] p-3 pt-4  placeholder-white/50 batangas left-[1%] w-[80%] sm:left-[6%] sm:w-[73%] md:left-[10%] md:w-[67%] lg:h-[10rem]  "
                  placeholder="Hint: Copy + Paste their bio here "
                  value={userInput}
                  onChange={onUserChangedText}
                  id="enterDescriptionBox"
                />

              </div>
            </div>


            <div className=" w-screen h-screen" id="enterGenerateButton">
              <a
                className=' text-white shadow-black/25'
                onClick={callGenerateEndpoint}
              >
                <img src="genButton.png" className="h-22 w-48 mt-8 mx-auto " />
              </a>
            </div>


          </div>

        </div>
      </SignedIn >

    </div >

  );
};

export default Home;

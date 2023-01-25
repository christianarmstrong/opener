import Head from 'next/head';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RedirectToSignUp, SignedIn, SignedOut, UserButton, useAuth, useUser, UserProfile } from '@clerk/nextjs';
import { Dialog } from '@headlessui/react'
import { Navbar } from '../components/Navbar';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createClient } from "@supabase/supabase-js";


const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    }
  );

  return supabase;
};


const Home = () => {
  const [age_userInput, age_setUserInput] = useState('');
  const [name_userInput, name_setUserInput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  let [isOpen, setIsOpen] = useState(false);
  let dialogFocus = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );


  const { getToken } = useAuth();
  const { user } = useUser();
  const fetchCurrentOpeners = async () => {
    const supabaseAccessToken = await getToken({ template: 'supabase' });
    const supabase = await supabaseClient(supabaseAccessToken);
    const { currentOpenerCount, error } = await supabase.from('userData').select('currentOpenerCount');

    console.log(`Current opener count is ${currentOpenerCount}`);
    console.log(`error: ${error}`)
  };

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

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
            <p className="">The Instant</p>
            <p className=" lg:pl-56" > Icebreaker</p>
          </h1>

          <div className="relative text-white text-[1.7em] mx-12 top-56 leading-7  font-light text-center sm:mx-40 sm:text-[2.2em] sm:leading-8 lg:text-left manrope text-opacity-80 lg:w-[18em] lg:leading-10 lg:ml-[20%]">
            From dating apps to DM’s. Type in their name - age and bio and get a personalized - proven to work opening line.
          </div>

          <div className=''>
            <a href="/sign-up" >
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
          <img src="background.png" className="backgroundImage" alt="background" />
        </picture>

        <Dialog autoFocus={false} className="relative z-10" open={isOpen} onClose={() => setIsOpen(false)}>

          <div className="fixed inset-0 overflow-y-auto bg-black/50">
            <div className="fixed inset-0 overflow-y-auto">


              <Dialog.Panel className="w-full relative mx-auto top-[25%] max-w-md transform overflow-hidden rounded-2xl bg-[#cd5536]  border-[1.75px]
                            border-[#DA9C93] rounded-[30px] shadow-black/25 shadow-md  text-white p-6 text-left align-middle transition-all">
                <Dialog.Title className="text-2xl text-center font-medium leading-8 text-white mb-2 ">Looks like you’re out of Openers. Choose your paid plan!</Dialog.Title>
                <form className="flex" action="/api/checkout_sessions" method="POST">
                  <button className="mx-auto focus:outline-none" type="submit" role="link">
                    <img src="chooseYourPlan.png" className="h-18 w-72 m-auto mt-4 mb-2" alt="Choose your plan" />
                  </button>
                </form>
                <Dialog.Description className="text-center text-2xl mb-5">
                  Not ready to commit?
                </Dialog.Description>
                <a
                  className=' text-white shadow-black/25'
                  href=""
                >
                  <img src="bigPopupLine.png" className="" alt="Big Line" />
                </a>
                <p className="text-2xl text-center mb-3 ">
                  Get 10 more Openers free by sharing us to any of these social apps or leaving a review!
                </p>
                <a
                  className=' text-white shadow-black/25'
                  href=""

                >
                  <img src="littlePopupLine.png" className="" alt="Little Line" />
                </a>
                <div className="mt-5 flex w-full h-full justify-evenly ">
                  <a
                    className=' text-white shadow-black/25'
                    href=""

                  >
                    <img src="facebookPopup.png" className="w-16 h-18" alt="Facebook" />
                  </a>
                  <a
                    className=' text-white shadow-black/25'
                    href=""

                  >
                    <img src="instagramPopup.png" className="w-16 h-18" alt="Instagram" />
                  </a>
                  <a
                    className=' text-white shadow-black/25'
                    href=""

                  >
                    <img src="twitterPopup.png" className="w-16 h-18" alt="Twitter" />
                  </a>
                  <a
                    className=' text-white shadow-black/25'
                    href=""

                  >
                    <img src="linkedinPopup.png" className="w-16 h-18" alt="LinkedIn" />
                  </a>
                </div>
                <a
                  className=' text-white shadow-black/25'
                  href="https://www.producthunt.com/products/opener-2/reviews/new"

                >
                  <img src="reviewButtonPopup.png" className=" mt-5" alt="Leave a Review" />
                </a>

                {/*
            You can render additional buttons to dismiss your dialog by setting
            `isOpen` to `false`.
          */}


              </Dialog.Panel>
            </div>
          </div>
        </Dialog>


        <div className="container ">



          <div className="text-white text-[3.5rem] sm:text-[4.5em] md:text-[5rem] lg:text-[6rem] lg:mt-28 mt-20 md:mt-" id="openerHeadingBefore">
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
                  <img src="genButtonNoText.png" alt="" className="h-10 w-32 md:h-16 md:w-40 mx-auto absolute right-0 bottom-0 mb-5 mr-5" />
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
            <a onClick={() => navigator.clipboard.writeText(apiOutput)} target="_blank">
              <img className="absolute bottom-0 left-[6.4rem] h-8 w-12 sm:left-[7.8rem] sm:w-14 sm:h-10 mb-[1.15rem] " alt="" src="copy.png" />
            </a>

            <textarea
              className=" h-[14em] indent-4 sm:h-[8em] md:h-[10em] lg:h-[12em] text-white/90  text-3xl w-[10em] min-[480px]:w-[10em]  sm:w-[16em] md:w-[20em] lg:w-[24em] xl:w-[28em] bg-gradient-to-br from-[#dc6945] to-[#b94834] bg-opacity- border-[1.75px] border-[#DA9C93]
                          rounded-[40px] shadow-black/60 shadow-md p-3 pt-4  batangas invisible "

              value={apiOutput}
              readOnly={true}
              id="outputBox"

            />


          </div>

          <div className="fixed w-screen h-fit mr-24 left-[0%] top-[25%] sm:top-[27%]" id="prompts">

            <div className="lg:flex lg:flex-wrap lg:w-screen lg:align-middle lg:justify-between content-center" id="nameGroup">


              <div className="lg:relative lg:flex-auto  lg:mt-5 lg:w-auto" id="bioGroup">
                <div className="text-white mb-4 lg:text-center lg:text-[2.5rem] lg:ml-[0] ml-[9%] sm:ml-[13%] md:ml-[17%] text-2xl mt-5 lg:mt-5  " id="enterDescriptionText">
                  <h2>What's their bio?</h2>
                </div>

                <div className="xl:flex xl:justify-center xl:ml-0 xl:mr-[22%]">
                  <textarea
                    className="relative  lg:mt-3 placeholder:text-xs text-xs text-white mb-5 ml-[7%]  h-[8rem] bg-gradient-to-br from-[#dc6945] to-[#ca593c] border-[1.75px]
                          border-[#DA9C93] rounded-[30px] shadow-black/25 shadow-md  
                          text-[1em] p-3 pt-4   xl:placeholder:text-xl xl:placeholder:pl-4 xl:placeholder:pt-2.5 placeholder:text-white/40 batangas left-[1%] w-[80%] sm:left-[6%] sm:w-[73%] md:left-[10%] md:w-[67%] lg:h-[12rem] max xl:w-[600px] 2xl:w-[800px] "
                    placeholder="Hint: Copy + Paste their bio here "
                    value={userInput}
                    onChange={onUserChangedText}
                    id="enterDescriptionBox"
                  />
                </div>
              </div>
            </div>


            <div className=" w-screen h-screen" id="enterGenerateButton">
              <a
                className=' text-white shadow-black/25'
                //onClick={() => { setIsOpen(true); fetchCurrentOpeners(); }}
                onClick={callGenerateEndpoint}
              >
                <img src="genButton.png" className="h-22 w-48 lg:h-24 lg:w-60 mt-8 mx-auto " alt="Generate Opener" />
              </a>
            </div>


          </div>
          <a href="https://www.producthunt.com/products/opener-2/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-opener&#0045;2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=514761&theme=light" alt="Opener - The&#0032;Best&#0032;Way&#0032;to&#0032;Start&#0032;a&#0032;Conversation | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
          <div className="invisible lg:visible">
            <div className="fixed left-4 bottom-4 text-white text-lg text-opacity-75">Made with 🧡 by Cheyenna & Christian Armstrong. Check our <a className="underline underline-offset-2" href="https://www.termsofusegenerator.net/live.php?token=JxycYwSYZJzn3E5cDHs0SZh9RAEWWtXb">terms of use.</a> </div>
            <div className="fixed right-32 bottom-3 text-white text-lg text-opacity-75 "> <a href={`mailto:customerSupport@opener.chat?subject=Inquiry&body=Hi, I have a question about your product.`}>Customersupport@opener.chat</a></div>
            <a
              className=' fixed bottom-2 right-[0] text-white shadow-black/25'
              href=""

            >
              <img src="facebookColored.png" className="w-12 h-10 " alt="Facebook" />
            </a>
            <a
              className=' fixed bottom-3 right-11 text-white shadow-black/25'
              href=""

            >
              <img src="instagramColored.png" className="w-8 h-8 " alt="Instagram" />
            </a>
            <a
              className='fixed bottom-3 right-20 text-white shadow-black/25'
              href=""

            >
              <img src="twitterColored.png" className=" w-10 h-8" alt="Twitter" />
            </a>
          </div>
        </div>
      </SignedIn >

    </div >

  );
};

export default Home;

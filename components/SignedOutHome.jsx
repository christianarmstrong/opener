/*  ./components/Navbar.jsx     */
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
export const SignedOutHome = () => {
    return (
        <div className="" id="landingPageContainer">

            <img
                className="backgroundIcon"
                alt=""
                src="background.png"
            />

            <h1 className="headerText" id="openerTitle" data-animate-on-scroll>
                <p className="welcomeTo">Welcome to</p>
                <p className="opener" > Opener</p>
            </h1>

            <div className="middleText ">
                The best way to start a conversation. Proven to increase your chances of
                getting a response. Sign up today and get 5 prompts free!
            </div>

            <Link href="/sign-up" >
                <img
                    className="getStartedButtonIcon"
                    alt="sum"
                    src="getStartedButton.png"

                />
            </Link>
            <Link href="/sign-up" >
                <b className="getStartedText">Get Started</b>
            </Link>


            <a href="https://www.facebook.com/profile.php?id=100088076846318" target="_blank">
                <img className="facebookIcon" alt="fb" src="facebook.png" />
            </a>
            <a href="https://twitter.com/Opener_app" target="_blank">
                <img className="twitterIcon" alt="" src="twitter.png" />
            </a>
            <a href="https://www.instagram.com/opener_app/" target="_blank">
                <img className="instagramIcon" alt="" src="instagram.png" />
            </a>
        </div>
    );
};
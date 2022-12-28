/*  ./components/Navbar.jsx     */
import Link from 'next/link';
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <nav className='flex w-screen fixed z-50 '>
                <Link href='/' className='inline-flex'>
                    <img
                        className="w-30 h-14 md:w-42 md:h-42 relative my-4 ml-2"
                        alt=""
                        src="logo.png"

                    />
                </Link>

                <SignedIn>
                    <UserButton class=""
                        appearance={{
                            elements: {
                                rootBox: 'fixed right-0 mr-8 mt-6 visible',
                                userButtonAvatarBox: 'w-10 h-10',
                            }
                        }}
                    />
                    { /*
                    <div className="fixed md:hidden right-0 mr-5 mt-4">
                        <button onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className=""
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >

                            {isOpen ? (
                                <svg viewBox='0 0 10 8' width='35'>
                                    <path d='M1 1h8M1 4h 8M1 7h8'
                                        stroke='#FFF'
                                        stroke-width='2'
                                        stroke-linecap='round' />
                                </svg>
                            ) : (
                                <svg viewBox='0 0 24 24' className="h-14 w-14">
                                    <path d='M6 18L18 6M6 6l12 12'
                                        stroke='#FFF'
                                        stroke-width='2'
                                        stroke-linecap='round' />
                                </svg>
                            )}


                        </button>

                    </div>
                    */ }
                </SignedIn>
                <SignedOut>
                    <div class="visible">
                        <Link href="/sign-up" >
                            <img
                                className="fixed right-0 mr-2.5"
                                alt=""
                                src="signUpButton.png"

                            />
                        </Link>
                        <a href="https://accounts.opener.chat/sign-up" >
                            <div className="fixed right-0 mr-11 mt-8 text-2xl text-white">Sign up</div>
                        </a>
                        <a href="https://accounts.opener.chat/sign-in" >
                            <div className="fixed right-0 mr-44 mt-9 text-2xl text-white invisible sm:visible  ">Log in</div>
                        </a>
                    </div>
                    { /*
                    <div className="fixed md:hidden right-0 mr-5 mt-4">
                        <button onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className=""
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >

                            {isOpen ? (
                                <svg viewBox='0 0 10 8' width='35'>
                                    <path d='M1 1h8M1 4h 8M1 7h8'
                                        stroke='#FFF'
                                        stroke-width='2'
                                        stroke-linecap='round' />
                                </svg>
                            ) : (
                                <svg viewBox='0 0 24 24' className="h-14 w-14">
                                    <path d='M6 18L18 6M6 6l12 12'
                                        stroke='#FFF'
                                        stroke-width='2'
                                        stroke-linecap='round' />
                                </svg>
                            )}


                        </button>

                    </div>
                    */ }
                </SignedOut>
            </nav>
        </>
    );
};
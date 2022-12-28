import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return <SignIn path="/sign-in" routing="path"
        appearance={{
            elements: {
                rootBox: 'relative mx-auto top-[10em] my-auto'
            },
            layout: {
                socialButtonsPlacement: 'bottom'
            }
        }}
    />
};
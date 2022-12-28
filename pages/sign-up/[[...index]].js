import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return <SignUp path="/sign-up" routing="path"
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

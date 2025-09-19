"use client"
import SignInButton from "../components/ui/sign-in-button";

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <div className='flex flex-col gap-2.5'>
        {/* <SignInButton provider={"google"} />
        <span className='text-center text-white/80'>or</span> */}
        <SignInButton provider={"github"} />
      </div>
    </div>
  )
}
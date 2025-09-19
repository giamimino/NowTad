import { login } from "@/lib/actions/auth"
import { Icon } from "@iconify/react"

type Props = {
  provider: "github" | "google"
}

export default function SignInButton(props: Props) {
  return (
    <button onClick={() => login(props.provider)}
    type='button'
    className='flex items-center cursor-pointer gap-3 px-4 py-2 rounded-md shadow-md font-medium transition
    bg-white/60 text-slate-800 border border-slate-200 hover:bg-slate-50 focus:outline-none
    focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#181818] focus:ring-slate-400'
    aria-label='Sign in with GitHub'>
      <Icon icon={`${props.provider === "github" ? "mdi:github" : "flat-color-icons:google" }`} />
      <span>{props.provider === "github" ? "Sign in with GitHub" : "Sign in with Google"}</span>
      </button>
  )
}
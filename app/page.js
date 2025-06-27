"use client"
import Image from "next/image";
// import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from "next/link";


export default function Entry() {
  // const { data: session } = useSession()

  // if (session) {
  //   const router = useRouter()
  //   router.push('/home')
  // }

  return (
    <>
      <div className="inset-0 -z-10 w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] pb-36">

        <div className="mx-4 pt-9 pb-12 space-y-4 flex flex-col justify-center items-center text-center">
          <img className="h-40 w-h-40" src="/PNG.png" alt="TipDoor" />
          <h1 className="md:text-8xl text-6xl">Welcome to TipDoor</h1>
          <p className="md:text-3xl text-xl text-slate-700">Products from the tip of your finger to your doorstep</p>
        </div>

        <div className="text-center">
          <h2 className="inline-block bg-white shadow-xs hover:bg-purple-100 hover:shadow-purple-600 md:text-3xl text-xl font-bold p-5 rounded-full">
            <Link href={'/login'}>SignUp to start Vibing!</Link>
          </h2>
        </div>

      </div>

    </>
  );
}

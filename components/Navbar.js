'use client'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import NavLink from 'next/link'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const { data: session } = useSession()
    // if (session) {
    //     return <>
    //         Signed in as {session.user.email} <br />
    //         <button onClick={() => signOut()}>Sign out</button>
    //     </>
    // }

    const pathname = usePathname()

    // Function to check if current path matches the nav item
    const isActive = (path) => {
        return pathname === path
    }

    // Base classes for nav links
    const baseClasses = 'px-3.5 py-2 text-sm md:text-base transition-colors duration-300 rounded-[4px]'

    // Function to get classes based on active state
    const getNavClasses = (path) => {
        return `${baseClasses} ${isActive(path)
            ? 'bg-[#5e17eb] text-white box-shadow-3xl' // Active state
            : 'hover:bg-[rgba(95,24,235,0.4)] hover:rounded-sm box-shadow-3xl' // Hover state
            }`
    }

    return (
        <header className='bg-white py-2.5 sticky top-0 z-50 md:shadow-sm shadow-md'>
            <nav className='flex justify-between items-center max-w-[1200px] mx-auto px-5 max-md:grid max-md:grid-cols-3 max-md:grid-rows-2'>
                <div className="logo max-md:row-start-1 max-md:">
                    <img className='md:h-12 h-10' src="/PNG.png" alt="Logo" />
                </div>

                <ul className='list-none flex flex-wrap items-center justify-center md:gap-x-4 max-md:justify-around max-md:gap-y-2 max-md:col-span-3 max-md:row-start-2'>
                    <li className='max-md:mt-4'>
                        <NavLink className={getNavClasses('/home')} href="/home">
                            Home
                        </NavLink>
                    </li>
                    <li className='max-md:mt-4'>
                        <NavLink className={getNavClasses('/myCart')} href="/myCart">
                            My Cart
                        </NavLink>
                    </li>
                    <li className='max-md:mt-4'>
                        <NavLink className={getNavClasses('/contactUs')} href="/contactUs">
                            Contact Us
                        </NavLink>
                    </li>
                    <li className='max-md:mt-4'>
                        <NavLink className={getNavClasses('/myAccount')} href="/myAccount">
                            My Account
                        </NavLink>
                    </li>
                </ul>

                <div className='flex items-center max-md:row-start-1'>
                    <input className='p-2 border-2 border-[#ccc] rounded-[4px] md:w-[250px] w-52 mr-2.5' type="text" placeholder="Search..." />
                    <button className='px-3 py-2 bg-[rgba(95,24,235,0.4)] border-none rounded-[4px] text-black cursor-pointer hover:bg-[#5e17eb] hover:text-white' type="submit">Search</button>
                </div>

                <div>
                    {session && <button className='text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ' onClick={() => { signOut() }}>Logout</button>}
                    
                    {!session && <Link href={"/login"}>
                        <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2' >Login</button></Link>}
                </div>

            </nav>
        </header>
    )
}

export default Navbar
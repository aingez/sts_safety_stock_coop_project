'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Nav() {
  const pathname = usePathname()

  return (
    <ul className='text-[20px] mb-10 flex justify-left p-3 bg-black'>
        <li className={`mx-2 text-white transition-all hover:text-yellow-700 ${pathname === "/" ? "text-yellow-500 font-bold" : ""}`}><Link href="/">M-Stock</Link></li>
        <li className={`mx-2 text-white transition-all hover:text-yellow-700 ${pathname === "/pack" ? "text-yellow-500 font-bold" : ""}`}><Link href="/pack">Pack</Link></li>
        <li className={`mx-2 text-white transition-all hover:text-yellow-700 ${pathname === "/unpack" ? "text-yellow-500 font-bold" : ""}`}><Link href="/unpack">Unpack</Link></li>
        <li className={`mx-2 text-white transition-all hover:text-yellow-700 ${pathname === "/alert" ? "text-yellow-500 font-bold" : ""}`}><Link href="/alert">Alert</Link></li>
        <li className={`mx-2 text-white transition-all hover:text-yellow-700 ${pathname === "/search" ? "text-yellow-500 font-bold" : ""}`}><Link href="/search">Search</Link></li>
        <li className={`mx-2 text-white transition-all hover:text-yellow-700 ${pathname === "/test" ? "text-yellow-500 font-bold" : ""}`}><Link href="/test">Test</Link></li>
    </ul>
  )
}

export default Nav

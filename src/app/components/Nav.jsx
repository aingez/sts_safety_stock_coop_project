'use client'

import React from 'react'
import Link from 'next/link'

function Nav() {
  return (
    <ul className='text-3xl mb-10 flex justify-left p-3 bg-black'>
        <li className='mx-2 font-bold text-white active:opacity-50'><Link href="/">M-Stock</Link></li>
        <li className='mx-2 text-white active:opacity-50'><Link href="/pack">Pack</Link></li>
        <li className='mx-2 text-white active:opacity-50'><Link href="/unpack">Unpack</Link></li>
        <li className='mx-2 text-white active:opacity-50'><Link href="/search">Search</Link></li>
    </ul>
  )
}

export default Nav

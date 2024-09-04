"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Nav() {
  const pathname = usePathname();

  return (
    <ul className="justify-left mb-10 flex bg-black p-3 text-[25px]">
      <li
        className={`mx-2 text-white transition-all hover:text-yellow-200 ${pathname === "/" ? "font-bold text-yellow-500 dark:text-fuchsia-500" : ""}`}
      >
        <Link href="/">M-Stock</Link>
      </li>
      <div className="mx-2 border-r border-white" />
      <li
        className={`mx-2 text-white transition-all hover:text-yellow-200 ${pathname === "/pack" ? "font-bold text-yellow-500 dark:text-fuchsia-500" : ""}`}
      >
        <Link href="/pack">Pack</Link>
      </li>
      <li
        className={`mx-2 text-white transition-all hover:text-yellow-200 ${pathname === "/unpack" ? "font-bold text-yellow-500 dark:text-fuchsia-500" : ""}`}
      >
        <Link href="/unpack">Unpack</Link>
      </li>
      <div className="mx-2 border-r border-white" />
      <li
        className={`mx-2 text-white transition-all hover:text-yellow-200 ${pathname === "/alert" ? "font-bold text-yellow-500 dark:text-fuchsia-500" : ""}`}
      >
        <Link href="/alert">Alert</Link>
      </li>
      <li
        className={`mx-2 text-white transition-all hover:text-yellow-200 ${pathname === "/search" ? "font-bold text-yellow-500 dark:text-fuchsia-500" : ""}`}
      >
        <Link href="/search">Search</Link>
      </li>
      <div className="mx-2 border-r border-white" />
      <li
        className={`mx-2 text-white transition-all hover:text-yellow-200 ${pathname === "/manage" ? "font-bold text-yellow-500 dark:text-fuchsia-500" : ""}`}
      >
        <Link href="/manage">Manage</Link>
      </li>
      <li
        className={`mx-2 text-white transition-all hover:text-yellow-200 ${pathname === "/editor" ? "font-bold text-yellow-500 dark:text-fuchsia-500" : ""}`}
      >
        <Link href="/editor">Edit</Link>
      </li>
    </ul>
  );
}

export default Nav;

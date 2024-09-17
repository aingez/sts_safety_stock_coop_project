// Dev: Aingthawan K.
// Component: Navigation bar

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import DxLogo from "../../public/images/dx-logo.png";
function Nav() {
  const pathname = usePathname();

  return (
    <ul className="justify-left mb-10 flex bg-black p-3 align-middle text-[35px]">
      <li
        className={`mx-2 rounded-lg text-white transition-all hover:opacity-50 ${pathname === "/" ? "shadow-lg shadow-teal-500" : ""}`}
      >
        <Link href="/">
          <div>
            <Image
              src={"/images/dx_logo.png"}
              alt="Dx Logo"
              width={50}
              height={50}
              className="p-1"
            />
          </div>
        </Link>
      </li>
      <div className="mx-2 border-r border-white" />
      <li
        className={`mx-2 text-white transition-all hover:opacity-50 ${pathname === "/pack" ? "font-bold text-yellow-500" : ""}`}
      >
        <Link href="/pack">Pack</Link>
      </li>
      <li
        className={`mx-2 text-white transition-all hover:opacity-50 ${pathname === "/unpack" ? "font-bold text-yellow-500" : ""}`}
      >
        <Link href="/unpack">Unpack</Link>
      </li>
      <div className="mx-2 border-r border-white" />
      <li
        className={`mx-2 text-white transition-all hover:opacity-50 ${pathname === "/alert" ? "font-bold text-yellow-500" : ""}`}
      >
        <Link href="/alert">Alert</Link>
      </li>
      <li
        className={`mx-2 text-white transition-all hover:opacity-50 ${pathname === "/search" ? "font-bold text-yellow-500" : ""}`}
      >
        <Link href="/search">Search</Link>
      </li>
      <div className="mx-2 border-r border-white" />
      <li
        className={`mx-2 text-white transition-all hover:opacity-50 ${pathname === "/manage" ? "font-bold text-yellow-500" : ""}`}
      >
        <Link href="/manage">Manage</Link>
      </li>
      <li
        className={`mx-2 text-white transition-all hover:opacity-50 ${pathname === "/editor" ? "font-bold text-yellow-500" : ""}`}
      >
        <Link href="/editor">Edit</Link>
      </li>
    </ul>
  );
}

export default Nav;

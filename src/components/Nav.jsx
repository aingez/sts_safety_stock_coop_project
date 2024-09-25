// Dev: Aingthawan K.
// Component: Navigation bar

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Settings,
  Package,
  PackageOpen,
  ClockAlert,
  Search,
} from "lucide-react";

function Nav() {
  const pathname = usePathname();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setDropdownVisible(false);
    }, 300); // Adjust the delay time as needed
  };

  return (
    <ul className="justify-left mb-10 flex bg-neutral-600 p-3 align-middle text-[35px] shadow-xl dark:bg-neutral-800">
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
        <Link href="/pack">
          {/* Pack */}
          <Package size={50} />
        </Link>
      </li>
      <li
        className={`mx-2 text-white transition-all hover:opacity-50 ${pathname === "/unpack" ? "font-bold text-yellow-500" : ""}`}
      >
        <Link href="/unpack">
          {/* Unpack */}
          <PackageOpen size={50} />
        </Link>
      </li>
      <div className="mx-2 border-r border-white" />
      <li
        className={`mx-2 text-white transition-all hover:opacity-50 ${pathname === "/alert" ? "font-bold text-yellow-500" : ""}`}
      >
        <Link href="/alert">
          {/* Alert */}
          <ClockAlert size={50} />
        </Link>
      </li>
      <li
        className={`mx-2 text-white transition-all hover:opacity-50 ${pathname === "/search" ? "font-bold text-yellow-500" : ""}`}
      >
        <Link href="/search">
          {/* Search */}
          <Search size={50} />
        </Link>
      </li>
      <div className="mx-2 border-r border-white" />

      <li
        className="group relative mx-2 text-white transition-all"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          className={`cursor-pointer ${pathname === "/editor" || pathname === "/manage" ? "font-bold text-yellow-500" : ""}`}
        >
          <Settings size={50} />
        </span>
        <ul
          className={`absolute left-0 mt-2 w-48 bg-neutral-600 shadow-lg ${dropdownVisible ? "block" : "hidden"}`}
        >
          <li className="px-4 py-2 hover:bg-neutral-700">
            <Link href="/manage">Manage</Link>
          </li>
          <li className="px-4 py-2 hover:bg-neutral-700">
            <Link href="/editor">Edit</Link>
          </li>
          <li className="px-4 py-2 hover:bg-neutral-700">
            <Link href="/option">Option</Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default Nav;

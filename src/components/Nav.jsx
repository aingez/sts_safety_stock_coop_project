// Dev: Aingthawan K.
// Component: Navigation bar

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Settings,
  Package,
  PackageOpen,
  ClockAlert,
  Search,
  Menu,
  X,
} from "lucide-react";

function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  let timeoutId;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false); // Close the menu on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle mobile menu
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setDropdownVisible(false);
    }, 300);
  };

  const NavItem = ({ href, icon: Icon, label }) => (
    <li
      className={`mx-2 text-white transition-all hover:opacity-50 ${pathname === href ? "font-bold text-yellow-500" : ""}`}
    >
      <Link href={href} className="flex flex-row space-x-5">
        <Icon size={30} />
        <div>{label}</div>
      </Link>
    </li>
  );

  return (
    <nav className="bg-neutral-600 p-3 shadow-xl dark:bg-neutral-800">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src={"/images/dx_logo.png"}
            alt="Dx Logo"
            width={50}
            height={50}
            className="p-1"
          />
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button className="text-white md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Menu for larger screens */}
        <ul className="hidden items-center space-x-4 text-[25px] md:flex">
          <NavItem href="/pack" icon={Package} />
          <NavItem href="/unpack" icon={PackageOpen} />
          <NavItem href="/alert" icon={ClockAlert} />
          <NavItem href="/search" icon={Search} />
          <li
            className="group relative text-white transition-all"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className={`cursor-pointer ${pathname === "/editor" || pathname === "/manage" ? "font-bold text-yellow-500" : ""}`}
            >
              <Settings size={30} />
            </span>
            <ul
              className={`absolute left-0 mt-2 w-48 bg-neutral-600 shadow-lg ${dropdownVisible ? "block" : "hidden"}`}
            >
              <li className="px-4 py-2 hover:bg-neutral-700">
                <Link href="/manage">Manage</Link>
              </li>
              <li className="px-4 py-2 hover:bg-neutral-700">
                <Link href="/creator">Create</Link>
              </li>
              <li className="px-4 py-2 hover:bg-neutral-700">
                <Link href="/option">Option</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="mt-4 flex flex-col items-start space-y-4 text-[20px] md:hidden">
          <NavItem href="/pack" icon={Package} label="Pack" />
          <NavItem href="/unpack" icon={PackageOpen} label="Unpack" />
          <NavItem href="/alert" icon={ClockAlert} label="Alert" />
          <NavItem href="/search" icon={Search} label="Search" />
          <div className="mx-2 text-white">
            <span className={`flex flex-row space-x-5`}>
              <Settings size={30} />
              <div>Settings</div>
            </span>
            <ul className={"ml-10"}>
              <li className="px-4 py-2 font-thin hover:bg-neutral-700">
                <Link href="/manage">Manage</Link>
              </li>
              <li className="px-4 py-2 font-thin hover:bg-neutral-700">
                <Link href="/creator">Create</Link>
              </li>
              <li className="px-4 py-2 font-thin hover:bg-neutral-700">
                <Link href="/option">Option</Link>
              </li>
            </ul>
          </div>
        </ul>
      )}
    </nav>
  );
}

export default Nav;

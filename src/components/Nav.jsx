// Dev: Aingthawan K.
// Component: Navigation bar

"use client";

import { User } from "lucide-react";

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
  House,
  X,
} from "lucide-react";

const UserProfileCard = ({ userEmail, userId }) => (
  <div className="flex flex-row items-center space-x-2 rounded-lg bg-neutral-300 px-2 py-1 text-xs dark:bg-neutral-700">
    <div className="rounded-full bg-neutral-400 p-2 dark:bg-neutral-500">
      <User size={30} className="text-white dark:text-white" />
    </div>
    <div className="text-black dark:text-white">
      <div className="flex gap-2">
        Email:<div className="font-light">{userEmail}</div>
      </div>
      <div className="flex gap-2">
        ID:<div className="font-light">{userId}</div>
      </div>
    </div>
  </div>
);

function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || "ToyotaSprinter@Trueno.com",
  );
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") || "$AGE20V",
  );

  let timeoutId;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
      className={`mx-2 transform text-white transition-all transition-transform duration-300 hover:scale-110 hover:opacity-50 ${pathname === href ? "font-bold text-yellow-500" : ""}`}
    >
      <Link href={href} className="flex flex-row space-x-5">
        <Icon size={40} />
        <div>{label}</div>
      </Link>
    </li>
  );

  return (
    <nav className="mb-10 bg-neutral-600 p-3 shadow-xl dark:bg-neutral-800">
      <div
        className={`flex items-center ${isMobile ? "justify-between" : "justify-start"}`}
      >
        <button className="text-white md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <X size={30} />
          ) : (
            <Image
              src={"/images/dx_logo.png"}
              alt="Dx Logo"
              width="0"
              height="0"
              sizes="8vw"
              style={{ width: "100%", height: "auto" }}
              className="mx-2 hover:opacity-50"
            />
          )}
        </button>
        {/* Menu for larger screens */}
        <ul className="mr-5 hidden items-center space-x-4 text-[25px] md:flex">
          <Link href="/" className="mr-5">
            <Image
              src={"/images/dx_logo.png"}
              alt="Dx Logo"
              width="0"
              height="0"
              sizes="2vw"
              style={{ width: "100%", height: "auto" }}
              className="mx-2 transition transition-all transition-transform duration-300 hover:scale-110 hover:opacity-50"
            />
          </Link>
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
              className={`cursor-pointer transition transition-all transition-transform duration-300 hover:scale-110`}
            >
              <Settings size={40} />
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
        <UserProfileCard userEmail={userEmail} userId={userId} />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="mt-4 flex flex-col items-start space-y-4 text-[20px] md:hidden">
          <UserProfileCard userEmail={userEmail} userId={userId} />
          <NavItem href="/" icon={House} label="Home" />
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

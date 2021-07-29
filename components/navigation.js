import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const ActiveLink = ({ children, href, className }) => {
    const router = useRouter();
    return (
      <Link href={href}>
        <a
          className={`${
            router.pathname === href
              ? "bg-gray-800 text-gray-100 rounded-md py-2 px-3 inline-flex items-center"
              : "text-gray-100 hover:bg-gray-600 hover:text-gray-200 rounded-md py-2 px-3 inline-flex items-center"
          } ${className} font-medium text-sm xl:text-base transition duration-150 ease-in-out`}
        >
          {children}
        </a>
      </Link>
    );
  };

  return (
    <div className="relative py-6 z-10 bg-gray-800">
      <nav className="mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href="/">
          <a className="flex items-center">
            <div className="flex flex-col justify-center">
              <div className="font-bold text-gray-100 leading-tight text-2xl sm:text-3xl tracking-tight">
                iPatchPR
              </div>
            </div>
          </a>
        </Link>

        <div className="hidden space-x-4 lg:py-2 lg:flex xl:space-x-8">
          <ActiveLink href="/">
              Dashboard
          </ActiveLink>
          <ActiveLink href="/new">
              New Request
          </ActiveLink>
        </div>
        <div className="justify-between">
          <div className="-mr-2 flex items-center lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <title>Menu | iPatch</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <Transition
        show={menuOpen}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden">
          <div className="rounded-lg shadow-md">
            <div className="rounded-lg bg-white shadow-xs overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <Link href="/">
                  <a className="flex items-center">
                    <div className="flex flex-col justify-center">
                      <div className="font-bold text-gray-900 leading-tight text-2xl sm:text-3xl tracking-tight">
                        iPatch
                      </div>
                      <div className="font-normal text-sm sm:text-lg leading-tight tracking-tight"></div>
                    </div>
                  </a>
                </Link>{" "}
                <div className="-mr-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-2 pt-4 pb-3">
              <Link href="/">
                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">
                    Dashboard
                  </a>
                </Link>
                <Link href="/new">
                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">
                    New Request
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Navigation;

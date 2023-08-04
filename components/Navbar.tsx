'use client';
import React, { useCallback, useEffect, useState } from 'react';
import NavbarItem from './NavbarItem';
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

interface Props {}

const TOP_OFFSET = 66;

const Navbar = (props: Props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) setShowBackground(true);
      else setShowBackground(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current: boolean) => !current);
    if (showAccountMenu) setShowAccountMenu((current: boolean) => !current);
  }, [showAccountMenu]);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current: boolean) => !current);
    if (showMobileMenu) setShowMobileMenu((current: boolean) => !current);
  }, [showMobileMenu]);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={` px-4 md:px-14 py-5 flex flex-row items-center transition duration-500 ${
          showBackground ? 'bg-zinc-900 bg-opacity-90' : ''
        } `}
      >
        <img src="images/logo.png" alt="Logo" className="h-4 lg:h-7" />

        <div
          className="
        flex-row ml-8 gap-7 hidden lg:flex"
        >
          <NavbarItem label="home" />
          <NavbarItem label="series" />
          <NavbarItem label="films" />
          <NavbarItem label="new & popular" />
          <NavbarItem label="my list" />
          <NavbarItem label="browse by languages" />
        </div>

        <div
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
          onClick={toggleMobileMenu}
        >
          <p className="text-white text-sm capitalize">Browse </p>
          <BsChevronDown
            className={`text-white transition  ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>

        <div className=" flex flex-row ml-auto gap-7 items-center">
          <div className=" text-gray-200 hover:text-gray-300 cursor-pointer transition ">
            <BsSearch />
          </div>
          <div className=" text-gray-200 hover:text-gray-300 cursor-pointer transition ">
            <BsBell />
          </div>

          <div
            className={` flex items-center gap-2 cursor-pointer relative `}
            onClick={toggleAccountMenu}
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <BsChevronDown
              className={`text-white transition  ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }  `}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

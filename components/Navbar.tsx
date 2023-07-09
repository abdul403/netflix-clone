import { useCallback, useEffect, useState } from "react";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

import MobileMenu from "./MobileMenu";
import NavbarItems from "./NavbarItem";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((currentMenu) => !currentMenu);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((currentMenu) => !currentMenu);
  }, []);
  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
        px-4
        md:px-16
        flex
        flex-row
        items-center
        transition
        duration-500
       ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}
        `}
      >
        <img
          src="/images/logo.png"
          alt="logo"
          className="
          h-4 
          lg:h-7
              "
        />
        <div
          className="
          flex-row
          ml-8
          gap-7
          hidden
          lg:flex
          "
        >
          <NavbarItems label="Home" />
          <NavbarItems label="Series" />
          <NavbarItems label="Films" />
          <NavbarItems label="New & Popular" />
          <NavbarItems label="My list" />
          <NavbarItems label="Browse by language" />
        </div>

        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex fledx-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto items-center gap-7">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src={"/images/default-blue.png"} alt="profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

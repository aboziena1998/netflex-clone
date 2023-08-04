import React from 'react';

interface MobileMenuProp {
  visible: boolean;
}

const MobileMenu: React.FC<MobileMenuProp> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex flex-col border-2 border-gray-800 ">
      <div className=" flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline capitalize">
          Home
        </div>
        <div className="px-3 text-center text-white hover:underline capitalize">
          series
        </div>
        <div className="px-3 text-center text-white hover:underline capitalize">
          films
        </div>
        <div className="px-3 text-center text-white hover:underline capitalize">
          New & Popular
        </div>
        <div className="px-3 text-center text-white hover:underline capitalize">
          My List
        </div>
        <div className="px-3 text-center text-white hover:underline capitalize">
          Browse By Languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

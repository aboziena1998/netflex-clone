'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-gray-800 ">
      <div className=" flex flex-col gap-3">
        <div className=" px-3 group/item flex gap-3 items-center w-full">
          <img
            src="/images/default-blue.png"
            alt=""
            className="w-8 rounded-md"
          />
          <p className="text-white text-sm group-hover/item:underline">
            UserName
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          className="px-3 text-center text-white text-sm hover:underline"
          onClick={() => signOut()}
        >
          Sign out of Netflex
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;

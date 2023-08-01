'use client';
import Input from '@/components/Input';
import React, { useCallback, useState } from 'react';

const AUth = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState<'login' | 'register'>('login');

  const toggleVariant = useCallback(() => {
    setVariant(current => (current === 'login' ? 'register' : 'login'));
  }, []);

  return (
    <div className="relative w-full h-full bg-hero bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50 ">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="" />
        </nav>
        <div className="flex justify-center">
          <div className=" bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:h-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign In' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant !== 'login' && (
                <Input
                  label="Username"
                  onchange={(e: any) => {
                    setUsername(e.target.value);
                  }}
                  id="username"
                  type="text"
                  value={username}
                />
              )}
              <Input
                label="Email"
                onchange={(e: any) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onchange={(e: any) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              className="
            bg-red-600 py-3 text-white text-center rounded-md w-full mt-10 hover:bg-red-700 transition active:bg-red-800  capitalize
            "
            >
              {variant}
            </button>

            <p className="text-neutral-500 mt-12">
              {variant === 'login'
                ? 'First time using netflex'
                : 'Already have an account'}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AUth;

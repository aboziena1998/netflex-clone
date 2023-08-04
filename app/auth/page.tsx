'use client';
import Input from '@/components/Input';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState<'login' | 'register'>('login');

  const toggleVariant = useCallback(() => {
    setVariant(current => (current === 'login' ? 'register' : 'login'));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/profiles',
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    console.log({ email, username, password });

    try {
      await axios.post('/api/register', {
        email,
        name: username,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, username, password, login]);

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
              onClick={variant === 'login' ? login : register}
              className="
            bg-red-600 py-3 text-white text-center rounded-md w-full mt-10 hover:bg-red-700 transition active:bg-red-800  capitalize
            "
            >
              {variant}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <button
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center  cursor-pointer hover:opacity-80 trnasition"
                onClick={() => {
                  signIn('google', { callbackUrl: '/profiles' });
                }}
              >
                <FcGoogle size={30} />
              </button>
              <button
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center  cursor-pointer hover:opacity-80 trnasition"
                onClick={() => {
                  signIn('github', { callbackUrl: '/profiles' });
                }}
              >
                <FaGithub size={30} />
              </button>
            </div>

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

export default Auth;

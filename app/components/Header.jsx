'use client';
import { useState } from 'react';

function Header() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setIsOpenDrawer((prev) => !prev);
  };

  return (
    <div className='relative block w-full'>
      <div className='flex justify-between items-center max-w-full mx-auto my-0 p-2.5'>
        <div>
          <a
            href='/'
            className='font-serif p-2.5 font-bold text-xl leading-normal flex items-center justify-center'>
            <svg
              viewBox='0 0 64 36'
              xmlns='http://www.w3.org/2000/svg'
              className='w-auto h-[1.125rem]'>
              <path
                fill='black'
                d='M41.3111 0H37.6444C30.3111 0 24.6889 4.15556 21.7556 9.28889C18.8222 3.91111 12.9556 0 5.86667 0H2.2C0.977781 0 0 0.977779 0 2.2V5.86667C0 16.1333 8.31111 24.2 18.3333 24.2H19.8V33C19.8 34.2222 20.7778 35.2 22 35.2C23.2222 35.2 24.2 34.2222 24.2 33V24.2H25.6667C35.6889 24.2 44 16.1333 44 5.86667V2.2C43.5111 0.977779 42.5333 0 41.3111 0ZM19.3111 19.5556H17.8444C10.2667 19.5556 4.15556 13.4444 4.15556 5.86667V4.4H5.62222C13.2 4.4 19.3111 10.5111 19.3111 18.0889V19.5556ZM39.1111 5.86667C39.1111 13.4444 33 19.5556 25.4222 19.5556H23.9556V18.0889C23.9556 10.5111 30.0667 4.4 37.6444 4.4H39.1111V5.86667Z'
                className='sc-49c604f9-0 btsKug'></path>
            </svg>
            PDF.ai
          </a>
        </div>
        <div className='hide-mobile'>
          <div className='flex items-center justify-center'>
            <a
              className='p-2.5 font-medium text-[15px] flex items-center hover:underline'
              href='/pricing'>
              Pricing
            </a>
            <a
              className='p-2.5 font-medium text-[15px] flex items-center hover:underline'
              href='/chrome-extension'>
              Chrome extension
            </a>
            <a
              className='p-2.5 font-medium text-[15px] flex items-center hover:underline'
              href='/use-cases'>
              Use cases
            </a>
            <a
              className='p-2.5 font-medium text-[15px] flex items-center hover:underline'
              href='/auth/sign-in'>
              Get started →
            </a>
          </div>
        </div>
        <button
          className='hide-desktop block m-0 p-2.5'
          onClick={handleOpenDrawer}>
          {isOpenDrawer ? (
            <svg
              class='w-5'
              viewBox='0 0 16 16'>
              <path d='M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z'></path>
            </svg>
          ) : (
            <svg
              className='w-5'
              viewBox='0 0 16 16'>
              <path d='M1 4h14c.55 0 1-.45 1-1s-.45-1-1-1H1c-.55 0-1 .45-1 1s.45 1 1 1zm14 8H1c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1zm0-5H1c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1z'></path>
            </svg>
          )}
        </button>
      </div>
      {isOpenDrawer && (
        <div className='hide-desktop absolute top-[59px] w-full h-auto bg-white border-t border-t-[#e5e3da] duration-100'>
          <div className='block p-2.5'>
            <a
              href='/pricing'
              className='block p-2.5 font-medium text-base'>
              Pricing
            </a>
            <a
              href='/chrome-extension'
              className='block p-2.5 font-medium text-base'>
              Chrome extension
            </a>
            <a
              href='/use-cases'
              className='block p-2.5 font-medium text-base'>
              Use cases
            </a>
            <a
              href='/auth/sign-in'
              className='block p-2.5 font-medium text-base'>
              Get started →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

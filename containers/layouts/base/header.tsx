'use client';

import { useToggleUrlState } from '@/hooks/toggle-url-state';
import { cn } from '@/utils/cn';
import { Category, CloseSquare, SearchNormal1 } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RefObject, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

export function Header() {
  return (
    <header className="absolute top-0 left-1/2 z-20 container my-6 flex -translate-x-1/2 items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image src="/images/logo.png" width={150} height={150} alt="لوگو" />
        </Link>
        <div className="hidden items-center gap-4 border-r border-gray-400 pr-3 lg:flex">
          <div className="group relative">
            <p className="text-smp flex cursor-pointer items-center gap-2 stroke-white/70 text-white/70 transition-all group-hover:stroke-white group-hover:text-white">
              <Category size={20} />
              <span>دسته بندی ها</span>
            </p>
            <DesktopCategories />
          </div>
          <Link
            href="/"
            className="text-smp text-white/70 transition-all hover:text-white"
          >
            هنرمندان
          </Link>
          <Link
            href="/"
            className="text-smp text-white/70 transition-all hover:text-white"
          >
            فیلم ها
          </Link>
          <Link
            href="/"
            className="text-smp text-white/70 transition-all hover:text-white"
          >
            سریال ها
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Search />
        <Link
          href="/"
          className="bg-pink hover:bg-pink/90 flex h-11 items-center justify-center rounded-xl px-6 transition-all"
        >
          ورود
        </Link>
      </div>
    </header>
  );
}

const Search = () => {
  const toggleUrlState = useToggleUrlState('search-normal');
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  useOnClickOutside(sectionRef as RefObject<HTMLElement>, () => {
    toggleUrlState.hide();
    setSearchValue('');
  });

  return (
    <div ref={sectionRef} className="relative">
      {/* btn */}
      <button
        onClick={() => toggleUrlState.show()}
        className={cn(
          'relative z-20 flex size-11 items-center justify-center rounded-xl bg-gray-800/50 transition-all hover:bg-gray-900',
          {
            hidden: toggleUrlState.isShow,
          },
        )}
      >
        <SearchNormal1 size={24} color="#fff" />
      </button>
      <div
        className={cn(
          'absolute -bottom-5 left-0 z-10 flex h-11 gap-1 rounded-xl bg-gray-800/50 p-2 backdrop-blur-sm',
          {
            'invisible bottom-0 left-7 w-0 opacity-0': !toggleUrlState.isShow,
            'visible -bottom-5 w-60 opacity-100': toggleUrlState.isShow,
          },
        )}
      >
        {/* search */}
        <button
          onClick={() => {
            router.push(`/explore?text=${searchValue}`);
          }}
        >
          <SearchNormal1 size={24} color="#fff" />
        </button>
        {/* input */}
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="text-smp size-full bg-transparent text-white/70 outline-none placeholder:text-sm"
          placeholder="جستجو"
        />
        {/* close */}
        <button
          onClick={() => {
            toggleUrlState.hide();
          }}
        >
          <CloseSquare
            size="28"
            className="hover:stroke-pink absolute top-2 -right-8 stroke-white transition-all"
          />
        </button>
      </div>
    </div>
  );
};

const DesktopCategories = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activedTab, setActivedTab] = useState<
    'sections' | 'movie-genres' | 'serial-genres'
  >('sections');
  const tabsData = [
    {
      key: 'sections',
      data: [
        { href: '/', text: 'لینک اول' },
        { href: '/', text: 'لینک دوم' },
        { href: '/', text: 'لینک سوم' },
      ],
    },
    {
      key: 'movie-genres',
      data: [
        { href: '/', text: 'لینک سوم' },
        { href: '/', text: 'لینک دوم' },
        { href: '/', text: 'لینک اول' },
      ],
    },
    {
      key: 'serial-genres',
      data: [
        { href: '/', text: 'لینک اول' },
        { href: '/', text: 'لینک دوم' },
        { href: '/', text: 'لینک سوم' },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="invisible absolute top-10 right-0 z-20 hidden opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 lg:flex"
    >
      <div className="h-full w-[500px] rounded-2xl bg-gray-900 p-5">
        {/* head */}
        <div className="flex">
          {[
            { key: 'sections', label: 'بخش ها' },
            { key: 'movie-genres', label: 'ژانر فیلم' },
            { key: 'serial-genres', label: 'ژانر سریال' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActivedTab(item.key as any)}
              className={cn(
                'relative top-[1px] z-20 flex items-center gap-3 rounded-t-xl border-b border-gray-700 bg-gray-900 p-4',
                {
                  'border border-b-0 border-gray-700': activedTab === item.key,
                },
              )}
            >
              <Category size={22} color="#fff" />
              <p className="text-sm">{item.label}</p>
            </button>
          ))}
        </div>
        {/* body */}
        <div>
          <div className="relative grid grid-cols-5 gap-4 rounded-b-xl border border-gray-700 p-4">
            {tabsData
              .find((item) => item.key === activedTab)
              ?.data.map((item) => (
                <Link
                  key={item.text}
                  href="/"
                  className="text-xsp hover:text-pink relative flex transition-all"
                >
                  {item.text}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

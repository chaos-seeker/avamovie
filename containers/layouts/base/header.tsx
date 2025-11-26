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
      <Link href="/">
        <Image src="/images/logo.png" width={150} height={150} alt="لوگو" />
      </Link>
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

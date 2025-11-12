import {
  ArrowDown2,
  ArrowSquareUp,
  Category,
  Home2,
  UserSquare,
  VideoSquare,
} from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RefObject, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useToggleUrlState } from '@/hooks/toggle-url-state';
import { cn } from '@/utils/cn';

export function Footer() {
  return (
    <footer>
      <MobileMenu />
      <MobileNavBottom />
      <DesktopFooter />
    </footer>
  );
}

const DesktopFooter = () => {
  return (
    <div className="container">
      <div className="flex justify-between border-t border-t-gray-600 px-2 py-4">
        <p className="text-sm text-gray-400">طراحی و توسعه توسط حمید شاهسونی</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ArrowSquareUp size={26} color="#fff" />
        </button>
      </div>
    </div>
  );
};

const MobileNavBottom = () => {
  const toggleUrlState = useToggleUrlState('mobile-menu');
  const pathname = usePathname();

  return (
    <section className="fixed bottom-0 z-20 flex w-full justify-around bg-black/80 px-7 py-3 backdrop-blur-sm lg:hidden">
      {[
        {
          href: '/',
          icon: Home2,
          text: 'خانه',
        },
        {
          href: pathname,
          onClick: () => {
            toggleUrlState.show();
            document.body.classList.add('overflow-hidden');
          },
          icon: Category,
          text: 'منو',
        },
        {
          href: '/',
          icon: VideoSquare,
          text: 'پخش آنلاین',
        },
        {
          href: '/',
          icon: UserSquare,
          text: 'ورود به حساب',
        },
      ].map((item) => (
        <Link
          key={item.text}
          href={item.href}
          onClick={item.onClick}
          className="flex flex-col items-center gap-2 stroke-white hover:stroke-pink hover:text-pink"
        >
          <item.icon size={22} />
          <p className="text-xsp">{item.text}</p>
        </Link>
      ))}
    </section>
  );
};

const MobileMenu = () => {
  const toggleUrlState = useToggleUrlState('mobile-menu');
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(sectionRef as RefObject<HTMLElement>, () => {
    toggleUrlState.hide();
    document.body.classList.remove('overflow-hidden');
  });

  return (
    <section>
      <div
        className={cn(
          'fixed top-0 left-0 w-full h-full bg-black/10 z-20 backdrop-blur-sm transition-all duration-300',
          {
            'opacity-100': toggleUrlState.isShow,
            'opacity-0 pointer-events-none': !toggleUrlState.isShow,
          },
        )}
      />
      <div
        ref={sectionRef}
        className={cn(
          'absolute right-0 flex flex-col z-20 pb-24 top-0 h-full w-60 px-6 bg-gray-900 backdrop-blur-sm lg:hidden transition-all duration-300',
          {
            'translate-x-0': toggleUrlState.isShow,
            'translate-x-60': !toggleUrlState.isShow,
          },
        )}
      >
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={150}
            height={150}
            className="mx-auto my-6"
          />
        </Link>
        <div className="flex flex-col gap-3">
          {/* categories */}
          <MobileMenuCategories />
          {/* links */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex rounded-lg bg-black p-3.5 text-xsp">
              فیلم ها
            </Link>
            <Link href="/" className="flex rounded-lg bg-black p-3.5 text-xsp">
              سریال ها
            </Link>
            <Link href="/" className="flex rounded-lg bg-black p-3.5 text-xsp">
              هنرمندان
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const MobileMenuCategories = () => {
  const [collapseList, setCollapseList] = useState<
    {
      title: string;
      isCollapsed: boolean;
      key: string;
    }[]
  >([
    {
      title: 'دسته بندی ها',
      key: 'categories',
      isCollapsed: false,
    },
    {
      title: 'بخش ها',
      key: 'sections',
      isCollapsed: false,
    },
    {
      title: 'ژانر فیلم',
      key: 'movie-genres',
      isCollapsed: false,
    },
    {
      title: 'ژانر سریال',
      key: 'serial-genres',
      isCollapsed: false,
    },
  ]);
  const handleCollapse = (
    e: 'categories' | 'sections' | 'movie-genres' | 'serial-genres',
  ) => {
    const updatedList = collapseList.map((item) => {
      if (item.key === e) {
        return {
          ...item,
          isCollapsed: !item.isCollapsed,
        };
      }
      return item;
    });
    setCollapseList(updatedList);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-black p-3.5">
      {/* head */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Category size={20} color="#fff" />
          <p className="text-xsp">دسته بندی ها</p>
        </div>
        <button onClick={() => handleCollapse('categories')}>
          <ArrowDown2
            size={20}
            color="#fff"
            className={cn(
              'transition-all',
              collapseList[0].isCollapsed ? 'rotate-180' : 'rotate-0',
            )}
          />
        </button>
      </div>
      {/* body */}
      <div
        className={cn(collapseList[0].isCollapsed ? 'block' : 'hidden', 'px-1')}
      >
        {/* sections */}
        <div>
          {/* head */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Category size={20} color="#fff" />
              <p className="text-xsp">بخش ها</p>
            </div>
            <button onClick={() => handleCollapse('sections')}>
              <ArrowDown2
                size={20}
                color="#fff"
                className={cn(
                  'transition-all my-2',
                  collapseList[1].isCollapsed ? 'rotate-180' : 'rotate-0',
                )}
              />
            </button>
          </div>
          {/* body */}
          <div className={cn(collapseList[1].isCollapsed ? 'block' : 'hidden')}>
            {[
              { href: '/', text: 'لینک اول' },
              { href: '/', text: 'لینک دوم' },
              { href: '/', text: 'لینک سوم' },
            ].map((item) => (
              <Link
                key={item.text}
                href="/"
                className="relative flex rounded-lg bg-black py-2 pr-4 text-xsp transition-all after:absolute after:right-1.5 after:top-1.5 after:h-5 after:w-0.5 after:bg-pink hover:text-pink"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
        {/* movie-genres */}
        <div>
          {/* head */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Category size={20} color="#fff" />
              <p className="text-xsp">ژانر فیلم</p>
            </div>
            <button onClick={() => handleCollapse('movie-genres')}>
              <ArrowDown2
                size={20}
                color="#fff"
                className={cn(
                  'transition-all my-2',
                  collapseList[2].isCollapsed ? 'rotate-180' : 'rotate-0',
                )}
              />
            </button>
          </div>
          {/* body */}
          <div className={cn(collapseList[2].isCollapsed ? 'block' : 'hidden')}>
            {[
              { href: '/', text: 'لینک اول' },
              { href: '/', text: 'لینک دوم' },
              { href: '/', text: 'لینک سوم' },
            ].map((item) => (
              <Link
                key={item.text}
                href="/"
                className="relative flex rounded-lg bg-black py-2 pr-4 text-xsp transition-all after:absolute after:right-1.5 after:top-1.5 after:h-5 after:w-0.5 after:bg-pink hover:text-pink"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
        {/* serial-genres */}
        <div>
          {/* head */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Category size={20} color="#fff" />
              <p className="text-xsp">ژانر سریال</p>
            </div>
            <button onClick={() => handleCollapse('serial-genres')}>
              <ArrowDown2
                size={20}
                color="#fff"
                className={cn(
                  'transition-all my-2',
                  collapseList[3].isCollapsed ? 'rotate-180' : 'rotate-0',
                )}
              />
            </button>
          </div>
          {/* body */}
          <div className={cn(collapseList[3].isCollapsed ? 'block' : 'hidden')}>
            {[
              { href: '/', text: 'لینک اول' },
              { href: '/', text: 'لینک دوم' },
              { href: '/', text: 'لینک سوم' },
            ].map((item) => (
              <Link
                key={item.text}
                href="/"
                className="relative flex rounded-lg bg-black py-2 pr-4 text-xsp transition-all after:absolute after:right-1.5 after:top-1.5 after:h-5 after:w-0.5 after:bg-pink hover:text-pink"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

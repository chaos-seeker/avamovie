'use client';

import { ReactNode } from 'react';
import { Footer } from './footer';
import { Header } from './header';

interface IProps {
  children: ReactNode;
}

export default function LayoutBase(props: IProps) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col gap-10 pb-10 lg:pb-6">
        {props.children}
      </main>
      <Footer />
    </>
  );
}

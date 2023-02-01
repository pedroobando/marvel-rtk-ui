import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import { NavbarUI } from '../ui';

interface Props extends PropsWithChildren {
  title?: string;
}

export const LayoutMain: FC<Props> = ({ title, children }) => {
  // const titleApp = title ? `${title} - ` : '';
  return (
    <>
      <Head>
        <title>{title || 'Marvel App'}</title>
        <meta name="Author" content="Pedro Obando" />
        <meta name="description" content={`Informacion sobre Marvel ${title}`} />
        <meta name="keywords" content={`${title}, Marvel, superheroes, superman, ironman, spiderman`} />
      </Head>
      {/* <Navbar /> */}
      <NavbarUI />
      <main style={{ margin: '0px 20px' }}>{children}</main>
    </>
  );
};

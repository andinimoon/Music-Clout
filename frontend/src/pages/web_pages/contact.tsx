import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Music Clout';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/portfolio_gallery',
      label: 'portfolio_gallery',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/blog',
      label: 'blog',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us | Music Platform`}</title>
        <meta
          name='description'
          content={`Get in touch with us for any inquiries, support, or feedback. Our team is here to assist you with all your needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'Music Clout'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Music Clout'}
          image={['Person holding a phone']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`Have questions or need assistance? Reach out to the ${projectName} team for support, feedback, or inquiries. We're here to help you.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Contact Us`}
        />

        <ContactFormSection
          projectName={'Music Clout'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Email icon on a screen']}
          mainText={`Reach Out to ${projectName} `}
          subTitle={`We're available to assist you with any questions or feedback. Expect a prompt response from our dedicated team at ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'Music Clout'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

"use client"
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";

import styles from './ChooseLanguage.module.scss'
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next-intl/client';
import {ChangeEvent, useTransition} from 'react';

const countries = [
  { value: "en", icon: "../../../english.jpg" },
  { value: "fr", icon: "../../../french.png" },
];

interface Country {
    value: string;
    icon: string
}

const Option = (props: any) => (
  <components.Option {...props} className={styles.country_option}>
    <img src={props.data.icon} alt="logo" className={styles.country_logo} />
  </components.Option>
);

const ChooseLanguage = () => {
  const t = useTranslations('LocaleSwitcher');
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
      const updateScreenWidth = () => {
          setScreenWidth(window.innerWidth)
      }

      updateScreenWidth()

      window.addEventListener('resize', updateScreenWidth)

      return () => {
      window.removeEventListener('resize', updateScreenWidth)
      }
  }, [])

  const isSmallScreen = screenWidth <= 768

  useEffect(() => {
    if (locale == "fr") {
      setSelectedCountry(countries[1])
    } 
    if (locale == "en") {
      setSelectedCountry(countries[0])
    } 
  }, [locale])

  const handleChange = (value: Country) => {
    setSelectedCountry(value);
    startTransition(() => {
      router.replace(pathname, {locale: value.value});
    });
  };

  // useEffect(() => {
  //   if (selectedCountry.value == "MG") {
  //       router.push('/fr');
  //     } 
  //     if (selectedCountry.value == "UE") {
  //       router.push('/en');
  //     }
  // }, [selectedCountry])
  

  const SingleValue = ({ children, ...props } : any) => (
    <components.SingleValue {...props}>
      <img src={selectedCountry.icon} alt="s-logo" className={styles.selected_logo} />
      {children}
    </components.SingleValue>
  );

  return (
    <div>
      <Select
        value={selectedCountry}
        options={countries}
        onChange={handleChange}
        className={styles.widthS}
        styles={{
          singleValue: (base) => ({
            ...base,
            display: "flex",
            alignItems: "center",
          }),
          control(base, props) {
            return {
              ...base,
              backgroundColor: 'black',
              border: 'none',
              outline: 'none',
              height: isSmallScreen ? 18 : screenWidth > 998 ? 45 : 38
            }
          },
        }}
        components={{
          Option,
          SingleValue
        }}
      />
    </div>
  );
};

export default ChooseLanguage;

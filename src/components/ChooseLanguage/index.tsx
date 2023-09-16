"use client"
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";

import styles from './ChooseLanguage.module.scss'
import { useRouter } from 'next/navigation'

const countries = [
  { value: "MG", icon: "../../../french.png" },
  { value: "UE", icon: "../../../english.jpg" }
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
    const router = useRouter()

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleChange = (value: Country) => {
    setSelectedCountry(value);

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
            alignItems: "center"
          })
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

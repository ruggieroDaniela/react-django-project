import React from "react";
import { useTranslation } from 'react-i18next';
import { useState } from "react";

import Navbar from "./Navbar";

import '../styles/Footer.scss';

const Footer = () => {

    return (
        <>
            <footer style={{ position: 'fixed', bottom: 0 }}>
                <Navbar />
            </footer>
        </>
    );
};

export default Footer;

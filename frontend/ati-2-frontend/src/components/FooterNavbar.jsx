import React, {useContext} from "react";
import { useTranslation } from 'react-i18next';
import { useState } from "react";

import AuthContext from "../context/AuthContext";

import NavbarDropdown from "./NavbarDropdown";
import Navbar from "./Navbar";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import '../styles/FooterNavbar.scss';

const FooterNavbar = () => {

    return (
        <footer>
            <Navbar/>
        </footer>
    );
};

export default FooterNavbar;

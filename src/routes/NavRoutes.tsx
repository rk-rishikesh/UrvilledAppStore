import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import FeaturedApps from "../components/FeaturedApps";
import CategoryNFT from "../components/CategoryNFT";
import CategoryGame from "../components/CategoryGame";
import CategorySocial from "../components/CategorySocial";
import CategoryDeFi from "../components/CategoryDeFi";
import AppSection from "../components/appPage/AppSection";
import Profile from "../components/Profile";

export const NavRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app/:appId" element={<AppSection />} />
            <Route path="/featuredapps" element={<FeaturedApps />} />
            <Route path="/category/nft" element={<CategoryNFT />} />
            <Route path="/category/finance" element={<CategoryDeFi />} />
            <Route path="/category/social" element={<CategorySocial />} />
            <Route path="/category/game" element={<CategoryGame />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};
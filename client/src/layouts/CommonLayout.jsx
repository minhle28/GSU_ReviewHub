import React from "react";
import { Header } from "../component/header";
import { Footer } from "../component/footer";
import { Outlet } from "react-router-dom";

export const CommonLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
import React from "react";
import { createContext, useState, useContext } from "react";

const TabContext = createContext();

export const useTab = () => useContext(TabContext);

export const TabProvider = ({ children }) => {
    const [currentTab, setCurrentTab] = useState('popular');

    const changeTab = (tab) => setCurrentTab(tab);

    return (
        <TabContext.Provider value={{ currentTab, changeTab }}>
            {children}
        </TabContext.Provider>
    );
};
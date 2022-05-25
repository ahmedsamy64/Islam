import React, { useState, useEffect, useContext } from "react";


const LanguageContext = React.createContext(undefined);


export const LanguageProvider = ({ children }) => {



    const [language, setLanguage] = useState("");

    const handleSetLanguage = async (lang) => {
        setLanguage(lang);
    };


    const data = [language, handleSetLanguage];


    return <LanguageContext.Provider value={data}>{children}  </LanguageContext.Provider>;
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useAuth can only be used inside AuthProvider");
    }
    return context;
};
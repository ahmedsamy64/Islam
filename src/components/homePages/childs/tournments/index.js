import React, { useState } from 'react'
import childLogo from "../../../../assets/الاطفال_رئيسية.png";
import inner_child_tournment from "../../../../assets/أطفال_مسابقة_داخلى.png"
import "./index.scss"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../../../context";
import LanguageModal from "../../../languageModal";

export default function ChildsTournments() {
    let history = useHistory();
    const [language, setCurrentLanguage] = useLanguage(useLanguage);
    const [languageModalOpened, setLanguageModal] = useState(false)

    const handleRestart = () => {
        setCurrentLanguage(null);
        sessionStorage.setItem('language', "");
        document.getElementById("home-container").classList.toggle("home-container__fading");
        setTimeout(() => history.replace("/"), 1000);
    }

    return (
        <div id="home-container" className='option-container' >
            <div id="div-titles" className='option-container__div-titles' onClick={() => history.replace("/childs")}>
                <div style={{ backgroundColor: "#48956f" }} >
                    {/* الأطفال */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.childs}
                </div>
            </div>
            <div className='option-container__main-div' >
                <img className='option-container__main-div__childImg__inner' src={childLogo} />
            </div>
            <div className='option-container__child_inner_tournments' >
                <img src={inner_child_tournment} style={{ animation: 'none', transform: 'none' }} />
            </div>
            <div className='option-container__child_inner_tournments__side-div' style={{ animation: 'none', zIndex: 2, left: "calc(100% - (11vw + 2px))" }}>
                {/* مسابقة */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.contest}
            </div>
            {/* fixed three buttons */}
            <div className='home-container__restart' style={{ animation: "none", left: 0 }} onClick={handleRestart}>
                {/* إبدأ من جديد */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.restart}
            </div>
            <div className='home-container__goToHome' style={{ animation: 'none', bottom: 0 }} onClick={() => history.replace("/home")}>
                {/* القائمة الرئيسية */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.main_menu}
            </div>
            <div className='home-container__goToHome' style={{ left: '33.8vw', animation: 'none', bottom: 0 }} onClick={() => setLanguageModal(true)} >
                {/* اختر لغة */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.choose_language}
            </div>
            <LanguageModal isOpened={languageModalOpened} setLanguageModal={setLanguageModal} />
        </div>
    )
}
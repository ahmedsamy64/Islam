import React, { useState } from 'react'
import childLogo from "../../../../assets/الاطفال_رئيسية.png";
import child_app from "../../../../assets/أطفال_التطبيق.png";
import tablet from "../../../../assets/tablet.png";
import mobile from "../../../../assets/mobile.png";
import googlePlay from "../../../../assets/GooglePlay.png";
import appStore from "../../../../assets/AppStore.png";
import "./index.scss"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../../../context";
import LanguageModal from "../../../languageModal";

export default function ChildsApp() {
    let history = useHistory();
    const [language, setCurrentLanguage] = useLanguage(useLanguage);
    const [deviceSelected, setDeviceSelection] = useState(false)
    const [languageModalOpened, setLanguageModal] = useState(false)

    const handleRestart = () => {
        setCurrentLanguage(null);
        sessionStorage.setItem('language', "");
        document.getElementById("home-container").classList.toggle("home-container__fading");
        setTimeout(() => history.replace("/"), 1000);
    }

    const handleDeviceClick_reset = (device) => {
        if (device === "tablet") {
            setDeviceSelection(device)
            document.getElementById("tablet").className = "option-container__child-app__tablet-main";
            document.getElementById("mobile").className = "option-container__child-app__mobile-transitioned";
            document.getElementById("device-titles").className = "option-container__child-app__mobile-tablet-titles__tablet-main"
        }
        else if (device === "mobile") {
            setDeviceSelection(device)
            document.getElementById("tablet").className = "option-container__child-app__tablet-transitioned";
            document.getElementById("mobile").className = "option-container__child-app__mobile-main";
            document.getElementById("device-titles").className = "option-container__child-app__mobile-tablet-titles__mobile-main"
        }
        else {
            setDeviceSelection(false)
            document.getElementById("tablet").className = "option-container__child-app__tablet";
            document.getElementById("mobile").className = "option-container__child-app__mobile";
            document.getElementById("device-titles").className = "option-container__child-app__mobile-tablet-titles"
        }

    }

    return (
        <div id="home-container" className='app-container' >
            <div id="div-titles" className='option-container__div-titles' onClick={() => history.replace("/childs")}>
                <div style={{ backgroundColor: "#48956f" }} >
                    {/* الأطفال */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.childs}
                </div>
            </div>
            <div className='option-container__main-div' >
                <img className='option-container__main-div__childImg__inner' src={childLogo} />
            </div>
            <div className='option-container__child-app' style={{ animation: 'none', width: "calc(100% + 4vw)", left: "-2vw", top: "24vh", height: "58vh" }}>
                <img src={child_app} className="option-container__child-app__backgroundImg" style={{ animation: 'none', height: "100%" }} />
                <img src={tablet} id="tablet" className="option-container__child-app__tablet" style={{ animation: 'none', width: "40vw" }} onClick={() => handleDeviceClick_reset("tablet")} />
                <img src={mobile} id="mobile" className="option-container__child-app__mobile" style={{ animation: 'none', width: "22vw" }} onClick={() => handleDeviceClick_reset("mobile")} />
                <div id="device-titles" className='option-container__child-app__mobile-tablet-titles' style={{ animation: 'none', opacity: 1 }}>
                    <div style={{ width: '37.5vw' }}>
                        {/* للتابلت */}
                        {JSON.parse(sessionStorage.getItem("languageData"))?.tablet}
                    </div>
                    <div style={{ width: '20vw' }}>
                        {/* للجوال */}
                        {JSON.parse(sessionStorage.getItem("languageData"))?.mobile}
                    </div>
                </div>
            </div>
            <div className="app-container__download-div" style={{ bottom: deviceSelected ? deviceSelected === 'mobile' ? '24vh' : '15vh' : '-40vh', opacity: deviceSelected ? 1 : 0 }}>
                <img src={googlePlay} className='app-container__download-div__googlePlay' />
                <span>
                    {/* حمل التطبيق */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.download_app}
                </span>
                <img src={appStore} className='app-container__download-div__appStore' />
            </div>
            <div className='option-container__child_inner_tournments__side-div' style={{ animation: 'none', left: "calc(100% - (11vw + 2px))", zIndex: 2, cursor: 'pointer' }} onClick={() => handleDeviceClick_reset()}>
                {/* التطبيق */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.application}
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
        </div >
    )
}
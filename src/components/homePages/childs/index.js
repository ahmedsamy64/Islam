import React, { useState } from 'react'
import childLogo from "../../../assets/الاطفال_رئيسية.png";
import child_app from "../../../assets/أطفال_التطبيق.png";
import child_pics from "../../../assets/أطفال_لوحات_خلفية.png";
import child_pic1 from "../../../assets/أطفال_لوحة1.png";
import child_pic2 from "../../../assets/أطفال_لوحة2.png";
import child_pic3 from "../../../assets/أطفال_لوحة3.png";
import child_tournment from "../../../assets/أطفال_مسابقة.png";
import tablet from "../../../assets/tablet.png";
import mobile from "../../../assets/mobile.png";
import inner_child_tournment from "../../../assets/أطفال_مسابقة_داخلى.png"
import "./index.scss"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../../context";

export default function Childs() {
    let history = useHistory();
    const [language, setCurrentLanguage] = useLanguage(useLanguage);
    const [selectedOption, setSelection] = useState(false);

    const handleRestart = () => {
        setCurrentLanguage(null);
        sessionStorage.setItem('language', "");
        document.getElementById("home-container").classList.toggle("home-container__fading");
        setTimeout(() => history.replace("/"), 1000);
    }

    const handleSelection = (selection) => {
        document.getElementById("home-container").classList.replace("option-container", `${selection}-container`);
        document.getElementById("div-titles").classList.replace("option-container__div-titles", `${selection}-container__div-titles`);
        setTimeout(() => {
            setSelection(selection);
        }, selection === "childPics" ? 10 : 550);
        setTimeout(() => !selectedOption && history.push(`childs/${selection}`), selection === "pics" ? 1600 : 2200);
    }

    const renderChildOption = () => {
        switch (selectedOption) {
            case "tournment": return (
                <>
                    <div className='option-container__child_inner_tournments' >
                        <img src={inner_child_tournment} />
                    </div>
                    <div className='option-container__child_inner_tournments__side-div'>{/* مسابقة */}
                        {JSON.parse(sessionStorage.getItem("languageData"))?.contest}
                    </div>
                </>)
            case "childPics": return (
                <div className='option-container__child_inner_tournments__side-div' style={{ animationDuration: "1.3s", animationDelay: 0 }}>{/* لوحات */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.pictures}
                </div>
            )
            case "app": return (
                <div className='option-container__child_inner_tournments__side-div' style={{ cursor: 'pointer', animationDuration: "1.3s", animationDelay: 0 }}>{/* التطبيق */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.application}
                </div>
            )
            default: return null
        }
    }

    return (
        <div id="home-container" className='option-container'>
            <div id="div-titles" className='option-container__div-titles' onClick={() => history.replace("/childs")}>
                <div style={{ backgroundColor: "#48956f" }} >
                    {/* الأطفال */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.childs}
                </div>
            </div>
            <div className='option-container__main-div' >
                <img className='option-container__main-div__childImg' src={childLogo} />
            </div>
            <div className='option-container__child-app' onClick={() => handleSelection("app")}>
                <img src={child_app} className="option-container__child-app__backgroundImg" />
                <img src={tablet} className="option-container__child-app__tablet" />
                <img src={mobile} className="option-container__child-app__mobile" />
                <div className='option-container__child-app__title'>
                    {/* التطبيق */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.application}
                </div>
                {selectedOption === "app" && <div className='option-container__child-app__mobile-tablet-titles'>
                    <div style={{ width: '37.5vw' }}>
                        {/* للتابلت */}
                        {JSON.parse(sessionStorage.getItem("languageData"))?.tablet}
                    </div>
                    <div style={{ width: '20vw' }}>
                        {/* للجوال */}
                        {JSON.parse(sessionStorage.getItem("languageData"))?.mobile}
                    </div>
                </div>}
            </div>
            <div className='option-container__child-pics' onClick={() => handleSelection("childPics")}>
                <div className='option-container__child-pics__backgroundDiv'>
                    <img src={child_pics} className="option-container__child-pics__backgroundPic" />
                </div>
                <img src={child_pic1} className="option-container__child-pics__mainPic" />
                <img src={child_pic2} className="option-container__child-pics__leftPic" />
                <img src={child_pic3} className="option-container__child-pics__rightPic" />
                <div className='option-container__child-pics__title'>
                    {/* اللوحات */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.pictures}
                </div>
            </div>
            <div className='option-container__child-tournment' onClick={() => handleSelection("tournment")} >
                <img src={child_tournment} />
                <div>
                    {/* مسابقة */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.contest}
                </div>
            </div>
            {selectedOption && renderChildOption()}
            {/* fixed three buttons */}
            <div className='home-container__restart' style={{ animation: "none", left: 0 }} onClick={handleRestart}>
                {/* إبدأ من جديد */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.restart}
            </div>
            <div className='home-container__goToHome' style={{ animation: 'none', bottom: 0 }} onClick={() => history.replace("/home")}>
                {/* القائمة الرئيسية */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.main_menu}
            </div>
            {selectedOption && <div className='home-container__goToHome' style={{ left: '33.8vw' }} >
                {/* اختر لغة */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.choose_language}
            </div>}
        </div>
    )
}
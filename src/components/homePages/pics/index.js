import React, { useState } from 'react'
import picsBackground from "../../../assets/لوحات_خلفية.png";
import what_they_do from "../../../assets/لوحات2.png";
import knowledge_pics from "../../../assets/لوحات_المعرفة.png";
import pic3 from "../../../assets/لوحات3.png";
import pic1 from "../../../assets/لوحات1.png";
import "./index.scss"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../../context";
import LanguageModal from "../../languageModal";

export default function Pics() {
    let history = useHistory();
    const [language, setCurrentLanguage] = useLanguage(useLanguage);
    const [languageModalOpened, setLanguageModal] = useState(false)
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
        setTimeout(() => setSelection(selection), 550);
        setTimeout(() => !selectedOption && history.push(`pics/${selection}`), 1000);
    }

    return (
        <div id="home-container" className='option-container' >
            <div id="div-titles" className='option-container__div-titles'>
                <div style={{ backgroundColor: "#c14e00", cursor: 'default' }} >
                    {/* اللوحات */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.pictures}
                </div>
            </div>
            <div className='option-container__pics-div' >
                <img src={picsBackground} className="option-container__pics-div__background" />
                <img src={what_they_do} className="option-container__pics-div__what_they_do" onClick={() => handleSelection("what_they_do")} />
                <img src={knowledge_pics} className="option-container__pics-div__knowledge_pics" /* onClick={() => handleSelection("knowledge_pics")}  */ />
            </div>
            <div className="option-container__picBlured">
                <img src={pic1} className="option-container__picBlured__rightPic" />
                <img src={pic3} className="option-container__picBlured__leftPic" />
            </div>
            <div className='option-container__main-div__whatTheyDo' style={{ animation: "none", top: "16vh" }}>
                <div className='option-container__main-div__whatTheyDo__clickMask' />
                <div className='option-container__main-div__whatTheyDo__name' onClick={() => handleSelection("what_they_do")}>
                    {/* ماذا يصنعون */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.what_they_do}
                </div>
            </div>
            <div className='option-container__main-div__knowledgePics' style={{ animation: "none", top: "16vh" }}>
                <div className='option-container__main-div__knowledgePics__clickMask' />
                <div className='option-container__main-div__knowledgePics__name' /* onClick={() => handleSelection("knowledge_pics")} */>
                    {/*   لوحات المعرفة */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.knowledge_pictures}
                </div>
            </div>
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
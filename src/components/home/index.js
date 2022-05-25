import React, { useState } from 'react'
import childLogo from "../../assets/الاطفال_رئيسية.png";
import picsLogo from "../../assets/لوحات_رئيسية.png";
import picsBackground from "../../assets/لوحات_خلفية.png";
import knowledge_pics from "../../assets/لوحات_المعرفة.png";
import what_they_do from "../../assets/لوحات2.png";
import videoLogo from "../../assets/فيديو_رئيسية.png"
import "./index.scss"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../context";

export default function Home() {
  let history = useHistory();
  const [language, setCurrentLanguage] = useLanguage(useLanguage);
  const [cardSelected, setCardSelection] = useState(false);

  const handleRestart = () => {
    setCurrentLanguage(null);
    sessionStorage.setItem('language', "");
    document.getElementById("home-container").classList.toggle("home-container__fading");
    setTimeout(() => history.replace("/"), 1000);
  }
  const handleSelection = (selection) => {
    document.getElementById("home-container").classList.replace("home-container", `${selection}-container`);
    document.getElementById("div-titles").classList.replace("home-container__div-titles", `${selection}-container__div-titles`);
    setCardSelection(selection);
    setTimeout(() => history.push(selection), 2000);
  }

  return (
    <div id="home-container" className='home-container' >
      {!cardSelected && <div className='home-container__titles'>
        <div onClick={() => handleSelection("videos")}>
          {/* فيديو */}
          {JSON.parse(sessionStorage.getItem("languageData"))?.video}
        </div>
        <div onClick={() => handleSelection("pics")}>
          {/* اللوحات */}
          {JSON.parse(sessionStorage.getItem("languageData"))?.pictures}
        </div>
        <div onClick={() => handleSelection("childs")}>
          {/* الأطفال */}
          {JSON.parse(sessionStorage.getItem("languageData"))?.childs}
        </div>
      </div>}
      <div id="div-titles" className='home-container__div-titles'>
        <div style={{ backgroundColor: "#0058b1" }} onClick={() => handleSelection("videos")}>
          {/* فيديو */}
          {JSON.parse(sessionStorage.getItem("languageData"))?.video}
        </div>
        <div style={{ backgroundColor: "#c14e00" }} onClick={() => handleSelection("pics")}>
          {/* اللوحات */}
          {JSON.parse(sessionStorage.getItem("languageData"))?.pictures}
        </div>
        <div style={{ backgroundColor: "#48956f" }} onClick={() => handleSelection("childs")}>
          {/* الأطفال */}
          {JSON.parse(sessionStorage.getItem("languageData"))?.childs}
        </div>
      </div>
      <div className='home-container__videos-div' onClick={() => !cardSelected && handleSelection("videos")}>
        <img src={videoLogo} />
      </div>
      <div className='home-container__pics-div' onClick={() => !cardSelected && handleSelection("pics")}>
        {/* <img src={picsLogo}  /> */}
        <img src={picsBackground} className="home-container__pics-div__background" />
        <img src={what_they_do} className="home-container__pics-div__what_they_do" />
        <img src={knowledge_pics} className="home-container__pics-div__knowledge_pics" />
      </div>
      <div className='home-container__childs-div' onClick={() => !cardSelected && handleSelection("childs")}>
        <img src={childLogo} />
      </div>

      {/* pics animation */}
      {cardSelected === "pics" && <>
        <div className='option-container__main-div__whatTheyDo'>
          <div className='option-container__main-div__whatTheyDo__clickMask' />
          <div className='option-container__main-div__whatTheyDo__name' >
            {/* ماذا يصنعون */}
            {JSON.parse(sessionStorage.getItem("languageData"))?.what_they_do}
          </div>
        </div>
        <div className='option-container__main-div__knowledgePics' >
          <div className='option-container__main-div__knowledgePics__clickMask' />
          <div className='option-container__main-div__knowledgePics__name' >
            {/* لوحات المعرفة */}
            {JSON.parse(sessionStorage.getItem("languageData"))?.knowledge_pictures}
          </div>
        </div>
      </>}

      <div className='home-container__restart' onClick={handleRestart}>
        {/* إبدأ من جديد */}
        {JSON.parse(sessionStorage.getItem("languageData"))?.restart}
      </div>
      {cardSelected && <div className='home-container__goToHome' onClick={() => history.replace("/home")}>
        {/* القائمة الرئيسية */}
        {JSON.parse(sessionStorage.getItem("languageData"))?.main_menu}
      </div>}
      {(cardSelected === "videos" || cardSelected === "pics") && <div className='home-container__goToHome' style={{ left: '33.8vw' }} >
        {/* اختر لغة */}
        {JSON.parse(sessionStorage.getItem("languageData"))?.choose_language}
      </div>}
    </div>
  )
}

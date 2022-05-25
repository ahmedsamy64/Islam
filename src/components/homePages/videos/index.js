import React, { useState } from 'react'
import videoLogo from "../../../assets/فيديو_رئيسية.png";
import "./index.scss"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../../context";
import img1 from "../../../assets/video_img1.png";
import img2 from "../../../assets/video_img2.png";
import img3 from "../../../assets/video_img3.png";
import img4 from "../../../assets/video_img4.png";
import img5 from "../../../assets/video_img5.png";
import img6 from "../../../assets/video_img6.png";
import img7 from "../../../assets/video_img7.png";
import LanguageModal from "../../languageModal";


export default function Videos() {
    let history = useHistory();
    const [language, setCurrentLanguage] = useLanguage(useLanguage);
    const [cardSelected, setCardSelection] = useState(false);
    const [languageModalOpened, setLanguageModal] = useState(false)
    const videos = [{ url: img7 }, { url: img6 }, { url: img5 }, { url: img4 }, { url: img3 }, { url: img2 }, { url: img1 }]

    const handleRestart = () => {
        setCurrentLanguage(null);
        sessionStorage.setItem('language', "");
        document.getElementById("home-container").classList.toggle("home-container__fading");
        setTimeout(() => history.replace("/"), 1000);
    }

    //   const handleSelection = (selection) => {
    //     document.getElementById("home-container").classList.replace("home-container", `${selection}-container`);
    //     document.getElementById("div-titles").classList.replace("home-container__div-titles", `${selection}-container__div-titles`);
    //     setCardSelection(true);
    //     setTimeout(() => history.push(selection), 1500);
    //   }
    return (
        <div id="home-container" className='option-container' >
            <div id="div-titles" className='option-container__div-titles'>
                <div style={{ backgroundColor: "#0058b1" }} /* onClick={() => handleSelection("videos")} */>
                    {/* فيديو */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.video}
                </div>
            </div>
            <div className='option-container__main-div' /* onClick={() => handleSelection("childs")} */>
                <img className='option-container__main-div__videosImg' src={videoLogo} />
            </div>
            {
                videos.map((vid, i) => {
                    return (
                        <div className='option-container__single-video' style={{ "--number": i, left: i === 0 && "1.5vw" }}>
                            <img src={vid.url} />
                        </div>
                    )
                })
            }

            <div className='home-container__restart' style={{ animation: "none", left: 0 }} onClick={handleRestart}>
                {/* إبدأ من جديد */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.restart}
            </div>
            <div className='home-container__goToHome' style={{ animation: 'none', bottom: 0 }} onClick={() => history.replace("/home")}>
                {/* القائمة الرئيسية */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.main_menu}
            </div>
            <div className='home-container__chooseLanguage' style={{ animation: 'none', left: '33.8vw' }} onClick={() => setLanguageModal(true)}>
                {/* اختر لغة */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.choose_language}
            </div>
            <LanguageModal isOpened={languageModalOpened} setLanguageModal={setLanguageModal} />
        </div>
    )
}
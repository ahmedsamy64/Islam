import React, { useEffect, useState, } from 'react'
// import childLogo from "../../../../assets/الاطفال_رئيسية.png";
// import child_pics from "../../../../assets/أطفال_لوحات_خلفية.png";
// import child_pic1 from "../../../../assets/أطفال_لوحة1.png";
// import child_pic2 from "../../../../assets/أطفال_لوحة2.png";
// import child_pic3 from "../../../../assets/أطفال_لوحة3.png";
import picsLogo from "../../../../assets/لوحات_خلفية.png";
import pic1 from "../../../../assets/لوحات1.png";
import pic2 from "../../../../assets/لوحات2.png";
import pic3 from "../../../../assets/لوحات3.png";
import "./index.scss"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../../../context";
import axios from 'axios';
import LanguageModal from "../../../languageModal";

var xDownWhat = null;
var yDownWhat = null;
var loaddWhat = null;

export default function WhatTheyDo() {

    let history = useHistory();
    const [language, setCurrentLanguage] = useLanguage(useLanguage);
    const [loading, setLoading] = useState(false);
    const [imgModalOpened, setImgModalOpened] = useState(false);
    const [downloadChangeLangModal, setDownloadChangeLangModal] = useState(false)
    const [currentImgURL, setCurrentImgURL] = useState("")
    const [languageModalOpened, setLanguageModal] = useState(false)



    const handleRestart = () => {
        setCurrentLanguage(null);
        sessionStorage.setItem('language', "");
        document.getElementById("home-container").classList.toggle("home-container__fading");
        setTimeout(() => history.replace("/"), 1000);
    }

    const handleClickOutside = (eve) => {
        if (downloadChangeLangModal && !(eve?.target?.className?.startsWith("modalBackdropStyle__downloadChangeLang"))) {
            setDownloadChangeLangModal(false)
        }
    }

    document.addEventListener("mousedown", handleClickOutside)




    const handleTouchStart = (evt) => {
        xDownWhat = evt.type == "dragstart" ? evt.clientX : evt.touches[0].clientX;
        yDownWhat = evt.type == "dragstart" ? evt.clientY : evt.touches[0].clientY;
    };

    const handleTouchEnd = (evt) => {
        let xUp = evt.type == "dragend" ? evt.clientX : evt.changedTouches[0].clientX;
        let yUp = evt.type == "dragend" ? evt.clientY : evt.changedTouches[0].clientY;
        let xDiff = xDownWhat - xUp;
        let yDiff = yDownWhat - yUp;
        if (!loaddWhat && !loading && (Math.abs(xDiff) > Math.abs(yDiff)) && (Math.abs(xDiff) > 100)) {
            if (xDiff > 0) {
                /* right swipe */
                handlePicTransition("whatTheyDoPage__rightPic")
            }
            else {
                /* left swipe */
                handlePicTransition("whatTheyDoPage__leftPic")
            }
        }
    }

    useEffect(() => {
        xDownWhat = null;
        yDownWhat = null;
        loaddWhat = null;
        document.addEventListener("touchstart", (event) => handleTouchStart(event));
        document.addEventListener("touchend", (event) => handleTouchEnd(event));
        document.addEventListener("dragstart", (event) => handleTouchStart(event), false);
        document.addEventListener("dragend", (event) => handleTouchEnd(event), false);
    }, [history.location.pathname])


    const handlePicTransition = (element) => {
        loaddWhat = true;
        setLoading(true)
        if (element === "whatTheyDoPage__rightPic") {
            document.getElementsByClassName("whatTheyDoPage__leftPic")[0].className = "whatTheyDoPage__leftPicFaded";
            document.getElementsByClassName("whatTheyDoPage__mainPic")[0].className = "whatTheyDoPage__leftPic";
            document.getElementsByClassName("whatTheyDoPage__rightPic")[0].className = "whatTheyDoPage__mainPic";
            document.getElementsByClassName("whatTheyDoPage__rightPicFaded")[0].className = "whatTheyDoPage__rightPic";
            setTimeout(() => document.getElementsByClassName("whatTheyDoPage__leftPicFaded")[0].className = "whatTheyDoPage__rightPicFaded", 1100);
            setTimeout(() => (loaddWhat = false, setLoading(false)), 1700);
        }
        else if (element === "whatTheyDoPage__leftPic") {
            document.getElementsByClassName("whatTheyDoPage__rightPic")[0].className = "whatTheyDoPage__rightPicFaded";
            document.getElementsByClassName("whatTheyDoPage__mainPic")[0].className = "whatTheyDoPage__rightPic";
            document.getElementsByClassName("whatTheyDoPage__leftPic")[0].className = "whatTheyDoPage__mainPic";
            document.getElementsByClassName("whatTheyDoPage__leftPicFaded")[0].className = "whatTheyDoPage__leftPic";
            setTimeout(() => document.getElementsByClassName("whatTheyDoPage__rightPicFaded")[0].className = "whatTheyDoPage__leftPicFaded", 1100);
            setTimeout(() => (loaddWhat = false, setLoading(false)), 1700);
        }
        else if (element === "whatTheyDoPage__mainPic") {
            setCurrentImgURL(document.getElementsByClassName(element)[0].src)
            setImgModalOpened(true)
            setTimeout(() => (loaddWhat = false, setLoading(false)), 100);
        }
        else {
            setLoading(false);
            loaddWhat = false
        }
    }
    const download = (url) => {
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob'
        }).then((res) => {
            const newUrl = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = newUrl;
            link.setAttribute("download", "photo.jpg");
            document.body.appendChild(link);
            link.click();
        })
    }
    return (
        <div id="home-container" className='childPics-container'>
            <div id="div-titles" className='option-container__div-titles' onClick={() => history.replace("/pics")}>
                <div style={{ backgroundColor: "#c14e00" }} >
                    {/* الصور */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.pictures}
                </div>
            </div>
            <div className='option-container__main-div' >
                <img className='option-container__main-div__childImg__inner' src={picsLogo} style={{ opacity: 1 }} />
            </div>

            <div className='option-container__child-pics' style={{ animation: 'none', top: "7vh", zIndex: 50 }}>
                <img src={pic1} className="whatTheyDoPage__rightPicFaded" style={{ objectFit: 'contain' }} onClick={(elem) => !loading && !loaddWhat && handlePicTransition(elem.target.className)} />
                <img src={pic3} className="whatTheyDoPage__rightPic" style={{ objectFit: 'contain' }} onClick={(elem) => !loading && !loaddWhat && handlePicTransition(elem.target.className)} />
                <img src={pic2} className="whatTheyDoPage__mainPic" style={{ objectFit: 'contain' }} onClick={(elem) => !loading && !loaddWhat && handlePicTransition(elem.target.className)} />
                <img src={pic1} className="whatTheyDoPage__leftPic" style={{ objectFit: 'contain' }} onClick={(elem) => !loading && !loaddWhat && handlePicTransition(elem.target.className)} />
                <img src={pic2} className="whatTheyDoPage__leftPicFaded" style={{ objectFit: 'contain' }} onClick={(elem) => !loading && !loaddWhat && handlePicTransition(elem.target.className)} />
            </div>

            <div className='option-container__main-div__whatTheyDo' style={{ animation: "none", top: "16vh" }}>
                <div className='option-container__main-div__whatTheyDo__clickMask' />
                <div className='option-container__main-div__whatTheyDo__name' style={{ cursor: 'default', top: "-5vh", marginRight: "-42vw" }} >
                    {/* ماذا يصنعون */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.what_they_do}
                </div>
            </div>
            {imgModalOpened &&
                <div className="modalBackdropStyle" >
                    <img id='backdropImg' src={currentImgURL} />
                    <div style={{ position: 'absolute', top: document.getElementById("backdropImg")?.offsetTop, right: document.getElementById("backdropImg")?.offsetLeft }}>
                        <div className='childCloseIcon' onClick={() => setImgModalOpened(false)} />
                        <div className='childInfoIcon' onClick={() => setDownloadChangeLangModal(true)}>
                            i
                        </div>
                    </div>
                </div>
            }
            {downloadChangeLangModal &&
                <div className="modalBackdropStyle" >
                    <div className='modalBackdropStyle__downloadChangeLang'>
                        <div className='modalBackdropStyle__downloadChangeLang__lang' onClick={() => setLanguageModal(true)}>
                            {/*  اختر اللغة */}
                            {JSON.parse(sessionStorage.getItem("languageData"))?.choose_language}
                        </div>
                        <div className='modalBackdropStyle__downloadChangeLang__modalBackdropDivder' />
                        <div className='modalBackdropStyle__downloadChangeLang__download' onClick={() => download(currentImgURL)}>
                            {/* حمل الصورة */}
                            {JSON.parse(sessionStorage.getItem("languageData"))?.download_picture}
                        </div>
                    </div>
                </div>
            }
            {/* fixed three buttons */}
            <div className='home-container__restart' style={{ animation: "none", left: 0 }} onClick={handleRestart}>
                {/* إبدأ من جديد */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.restart}
            </div>
            <div className='home-container__goToHome' style={{ animation: 'none', bottom: 0 }} onClick={() => history.replace("/home")}>
                {/* القائمة الرئيسية */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.main_menu}
            </div>
            <div className='home-container__goToHome' style={{ left: '33.8vw', animation: 'none', bottom: 0 }} onClick={() => setLanguageModal(true)}>
                {/* اختر لغة */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.choose_language}
            </div>
            <LanguageModal isOpened={languageModalOpened} setLanguageModal={setLanguageModal} />
        </div >
    )
}
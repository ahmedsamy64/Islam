import React, { useState, useEffect } from 'react'
import childLogo from "../../../../assets/الاطفال_رئيسية.png";
import child_pics from "../../../../assets/أطفال_لوحات_خلفية.png";
import child_pic1 from "../../../../assets/أطفال_لوحة1.png";
import child_pic2 from "../../../../assets/أطفال_لوحة2.png";
import child_pic3 from "../../../../assets/أطفال_لوحة3.png";
import "./index.scss"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../../../context";
import axios from 'axios';
import LanguageModal from "../../../languageModal";


var xDown = null;
var yDown = null;
var loadd = null;


export default function ChildsPics() {

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
        xDown = evt.type == "dragstart" ? evt.clientX : evt.touches[0].clientX;
        yDown = evt.type == "dragstart" ? evt.clientY : evt.touches[0].clientY;
    };

    const handleTouchEnd = (evt) => {
        let xUp = evt.type == "dragend" ? evt.clientX : evt.changedTouches[0].clientX;
        let yUp = evt.type == "dragend" ? evt.clientY : evt.changedTouches[0].clientY;
        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if (!loadd && (Math.abs(xDiff) > Math.abs(yDiff)) && (Math.abs(xDiff) > 100)) {
            if (xDiff > 0) {
                /* right swipe */
                handlePicTransition("childPicsPage__rightPic")
            }
            else {
                /* left swipe */
                handlePicTransition("childPicsPage__leftPic")
            }
        }
    }


    useEffect(() => {
        xDown = null;
        yDown = null;
        loadd = null;
        document.addEventListener("touchstart", (event) => handleTouchStart(event));
        document.addEventListener("touchend", (event) => handleTouchEnd(event));
        document.addEventListener("dragstart", (event) => handleTouchStart(event), false);
        document.addEventListener("dragend", (event) => handleTouchEnd(event), false);
    }, [history.location.pathname])


    const handlePicTransition = (element) => {
        loadd = true
        setLoading(true)
        if (element === "childPicsPage__rightPic") {
            document.getElementsByClassName("childPicsPage__leftPic")[0].className = "childPicsPage__leftPicFaded";
            document.getElementsByClassName("childPicsPage__mainPic")[0].className = "childPicsPage__leftPic";
            document.getElementsByClassName("childPicsPage__rightPic")[0].className = "childPicsPage__mainPic";
            document.getElementsByClassName("childPicsPage__rightPicFaded")[0].className = "childPicsPage__rightPic";
            setTimeout(() => document.getElementsByClassName("childPicsPage__leftPicFaded")[0].className = "childPicsPage__rightPicFaded", 1100);
            setTimeout(() => (loadd = false, setLoading(false)), 1700);
        }
        else if (element === "childPicsPage__leftPic") {
            document.getElementsByClassName("childPicsPage__rightPic")[0].className = "childPicsPage__rightPicFaded";
            document.getElementsByClassName("childPicsPage__mainPic")[0].className = "childPicsPage__rightPic";
            document.getElementsByClassName("childPicsPage__leftPic")[0].className = "childPicsPage__mainPic";
            document.getElementsByClassName("childPicsPage__leftPicFaded")[0].className = "childPicsPage__leftPic";
            setTimeout(() => document.getElementsByClassName("childPicsPage__rightPicFaded")[0].className = "childPicsPage__leftPicFaded", 1100);
            setTimeout(() => (loadd = false, setLoading(false)), 1700);
        }
        else if (element === "childPicsPage__mainPic") {
            setCurrentImgURL(document.getElementsByClassName(element)[0].src)
            setImgModalOpened(true)
            setTimeout(() => (loadd = false, setLoading(false)), 100);
        }
        else {
            setLoading(false);
            loadd = false;
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
        <div id="home-container" className='childPics-container' >
            <div id="div-titles" className='option-container__div-titles' onClick={() => history.replace("/childs")}>
                <div style={{ backgroundColor: "#48956f" }} >
                    {/* الأطفال */}
                    {JSON.parse(sessionStorage.getItem("languageData"))?.childs}
                </div>
            </div>
            <div className='option-container__main-div' >
                <img className='option-container__main-div__childImg__inner' src={childLogo} />
            </div>
            <div className='option-container__child_inner_tournments__side-div' style={{ animation: 'none', left: "calc(100% - (11vw + 2px))", zIndex: 2 }}>
                {/* اللوحات */}
                {JSON.parse(sessionStorage.getItem("languageData"))?.pictures}
            </div>

            <div className='option-container__child-pics' style={{ animation: 'none', top: "7vh" }}>
                <div className='option-container__child-pics__backgroundDiv' style={{ animation: 'none', width: "calc(96vw - 4px)", height: "80vh" }} >
                    <img src={child_pics} className="option-container__child-pics__backgroundPic"
                        style={{ animation: 'none', transform: "scale(1.5)", objectPosition: "0% 30%" }} />
                </div>
                <div style={{ height: "80vh", marginTop: "10vh", width: "96vw" }}>
                    <img src={child_pic3} className="childPicsPage__rightPicFaded" onClick={(elem) => !loading && !loadd && handlePicTransition(elem.target.className)} />
                    <img src={child_pic2} className="childPicsPage__rightPic" onClick={(elem) => !loading && !loadd && handlePicTransition(elem.target.className)} />
                    <img src={child_pic1} className="childPicsPage__mainPic" onClick={(elem) => !loading && !loadd && handlePicTransition(elem.target.className)} />
                    <img src={child_pic3} className="childPicsPage__leftPic" onClick={(elem) => !loading && !loadd && handlePicTransition(elem.target.className)} />
                    <img src={child_pic2} className="childPicsPage__leftPicFaded" onClick={(elem) => !loading && !loadd && handlePicTransition(elem.target.className)} />
                </div>
            </div>
            {imgModalOpened &&
                <div className="modalBackdropStyle" >
                    <img id="backdropImg" src={currentImgURL} />
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
        </div>
    )
}
import React, { useState, createContext, useContext } from 'react'
import "./index.scss"
import logo from "../../assets/logo.png"
import cover from "../../assets/cover.png"
import { Link, useHistory } from 'react-router-dom';
import { useLanguage } from "../../context";
import { languages } from '../../constants/languages';
import { getFirestore, getDoc, doc } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import localLanguages from '../../assets/languages.json';

const firebaseConfig = {
    apiKey: "AIzaSyB8-hVs-EWFtnCfinvEsj7ANinAkASjXic",
    authDomain: "touch-screen-project.firebaseapp.com",
    databaseURL: "https://touch-screen-project-default-rtdb.firebaseio.com",
    projectId: "touch-screen-project",
    storageBucket: "touch-screen-project.appspot.com",
    messagingSenderId: "689791426724",
    appId: "1:689791426724:web:8553c8bfa48aa33e7d0631",
    measurementId: "G-JFH14Q66RF"
};

var local = true;

export default function Landing(props) {

    const app = initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase());

    // const [language, setCurrentLanguage] = useLanguage(useLanguage);
    let history = useHistory();

    const [entered, setEntered] = useState(false);
    const [selectedLanguage, setLanguage] = useState(null);


    const LoadingComponent = () => (<div className='landing-container__loading-btn' onClick={() => setEntered(true)} >
        <div className='landing-container__loading-btn__2'>
            <div className='landing-container__loading-btn__3'>
                <div className='landing-container__loading-btn__4' />
            </div>
        </div>
    </div >)


    const selectLanguage = async (lang, i) => {
        let languageData = local ?
            Object.keys(localLanguages).includes(lang) ? localLanguages[lang] : alert("Sorry, this Language isnt supported yet🙁")
            :
            await get(child(dbRef, lang)).then((snapshot) => {
                if (snapshot.exists()) { return snapshot.val() }
                else { alert("Sorry, this Language isnt supported yet🙁") }
            }).catch((error) => {
                console.error(error);
            })
        if (languageData) {
            setLanguage(lang);
            sessionStorage.setItem('language', lang);
            sessionStorage.setItem('languageData', JSON.stringify(languageData))
            document.getElementById(`selected-Language-${i}`).classList.toggle("language-selected");
            document.getElementById('language-table').classList.toggle("landing-container__with-border__table__faded");
            setTimeout(() => {
                languageData && history.push("/home")
            }, 3200);
        }
    }
    return (
        <>
            <div className={entered ? `landing-container__with-border` : `landing-container`}>
                {/* the initial start btn */}
                {entered &&
                    <div id="language-table" className='landing-container__with-border__table'>
                        {languages.map((elm, i) => {
                            return (
                                <span id={`selected-Language-${i}`} key={i} onClick={(element) => !selectedLanguage && selectLanguage(element.target.innerHTML, i)}>
                                    {elm}
                                </span>
                            )
                        })}
                    </div>}
                {!entered && <LoadingComponent />}
                {/* custom border */}
                {entered &&
                    <>
                        <div className="bottomBorder" />
                        <div className="rightBorder" />
                    </>}
                {/* welcome div */}
                {selectedLanguage &&
                    < div className='landing-container__with-border__welcome-div' >
                        {/* مرحبا */}
                        {sessionStorage.getItem("languageData") !== "undefined" && JSON.parse(sessionStorage.getItem("languageData"))?.welcome}
                    </div>}
            </div>
            {/* app logo */}
            {<img className={entered ? "landing-container__with-border__app-logo" : "landing-container__app-logo"} src={logo} />}
        </>
    )
}

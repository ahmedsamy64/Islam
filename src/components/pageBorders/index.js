import React from 'react'
import logo from "../../assets/logo.png"
import "./index.scss"

export default function PageBorders() {
    return (
        <div className='pageBorders-Container' >
            <div className="bottomBorder" />
            <div className="rightBorder" />
            <img className={"pageBorders-Container__app-logo"} style={{ animationName: 'none' }} src={logo} />
        </div>

    )
}

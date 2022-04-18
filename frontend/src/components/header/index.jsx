import React from "react";
import { useNavigate } from "react-router-dom";
import style from './header.module.css'

import { AiOutlineLine, AiOutlineHome } from 'react-icons/ai'

export default function Header(props) {

    const navigate = useNavigate()

    return (

        <div className={style.header}>
            <div className={style.container}>
                <AiOutlineHome color='#f4f4f4' size={33} style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
                <AiOutlineLine color='#f4f4f4' size={40} style={{ transform: "rotate(90deg)", margin: '-0.5rem' }} />
               
            </div>
        </div>
    )
}
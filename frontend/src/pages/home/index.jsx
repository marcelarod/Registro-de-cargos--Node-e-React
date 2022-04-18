import React from "react";
import Header from '../../components/header'
import { useNavigate } from "react-router-dom";

import style from './home.module.css'

import {GiArchiveRegister} from 'react-icons/gi'

import { TiBusinessCard , TiDocumentText} from "react-icons/ti";

export default function Home() {
    const navigate = useNavigate()

    return (        
        <>  
        <Header/>
            <div className={style.containerHome}>
                    <div className={style.containerButtons}>
                        <button onClick={() => navigate('/positions')} >
                            <TiDocumentText size={20} color="#fff"/> Cadastrar cargos 
                        </button>
                        <button onClick={() => navigate('/register')} >
                            <GiArchiveRegister size={20} color="#fff"/> Cadastrar funcionário
                        </button>
                        <button onClick={() => navigate('/employee')} >
                            <TiBusinessCard size={20}  color="#fff"/> Funcionários 
                        </button>
                    </div>
            </div>
        </>
    )
}
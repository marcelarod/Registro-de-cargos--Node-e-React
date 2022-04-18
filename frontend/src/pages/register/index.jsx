import React, { useEffect, useState } from "react";
import Header from '../../components/header'
import Spinner from '../../components/spinner';

import Swal from 'sweetalert2';

import style from './register.module.css'
import { api } from "../../services/api";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 2000,
    width: "22rem",
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


export default function Register() {
    const [name, setName] = useState([])
    const [birth, setBirth] = useState([])
    const [address, setAddress] = useState([])
    const [email, setEmail] = useState([])
    const [selectPositions, setSeletcPositions] = useState([])

    const [loading, setLoading] = useState([])
    const [positions, setPositions] = useState([])

    const [errorName, setErrorName] = useState('')
    const [errorBith, setErrorBirth] = useState('')
    const [errorAddress, setErrorAddress] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPositions, setErrorPositions] = useState('')

    async function getPositons() {
        let positions = await api.get('/positions')
        setPositions(positions.data)
    }
    useEffect( () => {
        getPositons()
        
    }, [])

    let validated = []

    function validation() {

        validated = true

        if (name.length == 0) {
            setErrorName('Insira o nome para adicionar um funcionário.')
            validated = false
            return false
        }

        if (birth.length == 0) {
            setErrorBirth('Insira a data de nascimento para adicionar um funcionário.')
            validated = false
            return false
        }

        if (address.length == 0) {
            setErrorAddress('Insira o endereço para adicionar um funcionário.')
            validated = false
            return false
        }

        if (email.length == 0) {
            setErrorEmail('Insira o email para adicionar um funcionário.')
            validated = false
            return false
        }

        if (selectPositions.length == 0) {
            setErrorPositions('Selecione o cargo para adicionar um funcionário.')
            validated = false
            return false
        }
    }

    async function submitEmployee() {
        validation()
        if (validated == false) {
            return false
        }

        try {
            setLoading(true)
            let response = await api.post('/employees',
                {
                    "name": name,
                    "birth": birth,
                    "address":address,
                    "email":email,
                    "positionId":selectPositions
                }
            )

            if (response.status == 200) {
                Swal.fire({
                    title: "Sucesso",
                    text: "O registro foi incluído com sucesso!",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#4EBDEF",
                    confirmButtonText: "Ok"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        setName([])
                        setBirth([])
                        setAddress([])
                        setEmail([])
                        setSeletcPositions([])
                    }
                })
            } 
        } catch (e) {
            let erros = e.response.data.errors.map(x => {
                return {
                    erro: x.msg
                }
            })
            Toast.fire({
                icon: 'error',
                title: `${erros.map(x => x.erro).toString()}`
            })
        }
        setLoading(false)
    }
    return (
        <>
         {loading == true ? (
                    <div className="spinner">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <div></div>
                )}
            <Header />
            <div className={style.main}>
                <div className={style.container}>
                   <div className={style.register}>
                        <label>Nome:</label>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value); setErrorName([]) }} />
                        {errorName ? (
                            <div className="Error">{errorName}</div>
                        ) : null}
                        <label>Data de nascimento:</label>
                        <input type="date" value={birth} onChange={(e) => { setBirth(e.target.value); setErrorBirth([]) }}/>
                        {errorBith ? (
                            <div className="Error">{errorBith}</div>
                        ) : null}
                        <label>Endereço:</label>
                        <input type="text" value={address} onChange={(e) => { setAddress(e.target.value); setErrorAddress([]) }}/>
                        {errorAddress ? (
                            <div className="Error">{errorAddress}</div>
                        ) : null}
                        <label>Email:</label>
                        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); setErrorEmail([]) }}/>
                        {errorEmail ? (
                            <div className="Error">{errorEmail}</div>
                        ) : null}
                        <label>Cargo:</label>
                        <select value={selectPositions} onChange={(e) => { setSeletcPositions(e.target.value); setErrorPositions([])}}>
                            <option value=""></option>
                            {positions.map(x => <option value={x.id}>{x.name}</option>)}
                        </select>
                        {errorPositions ? (
                            <div className="Error">{errorPositions}</div>
                        ) : null}
                    </div>
                    <div className={style.buttonregister}>
                       <button onClick={submitEmployee} >Concluir</button>
                </div>
                </div>
               
            </div>
        </>
    )
}
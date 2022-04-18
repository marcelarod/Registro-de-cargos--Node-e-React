import React, { useEffect, useState } from "react";
import Header from '../../components/header'
import Spinner from '../../components/spinner';

import Swal from 'sweetalert2';
import { BsPlusLg , BsFillTrashFill} from 'react-icons/bs'
import Table from 'rc-table'


import style from './positions.module.css'
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

    const [loading, setLoading] = useState([])
    const [positions, setPositions] = useState([])

    const [errorName, setErrorName] = useState('')

    async function getPositons() {
        let positions = await api.get('/positions')
        setPositions(positions.data)
    }
    useEffect(() => {
        getPositons()

    }, [])

    const columnsAdmins = [
        {
            title: "",
            dataIndex: "name",
            key: "file",
            align: "left",
            width: 1000,
        },
        {
            title: "",
            dataIndex: "",
            key: "file",
            align: "left",
            width: 50,
            render: (value, row, id) => {
                return (<BsFillTrashFill onClick={() => handleRemovePositions(row.id)} style={{ display: 'flex', cursor: 'pointer' }}/>)
            }
        },
    ]

    function handleRemovePositions(id) {
        try {
            Swal.fire({
                title: 'Deseja deletar esse cargo?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#009EBE",
                cancelButtonColor: "#636e72",
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let response = await api.delete(`/positions/${id}`)
                    if (response.status == 200) {
                        Toast.fire({
                            title: "Sucesso",
                            title: "O registro foi excluido com sucesso!",
                        })
                        getPositons()

                    }
                }
            })
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: `${error.response.data.errors[0].msg}`
            })
        }
    }

    let validated = []

    function validation() {

        validated = true

        if (name.length == 0) {
            setErrorName('Insira o nome para adicionar um cargo.')
            validated = false
            return false
        }

    }

    async function submitPositions() {
        validation()
        if (validated == false) {
            return false
        }

        try {
            setLoading(true)
            let response = await api.post('/positions',
                {
                    "name": name,
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
                        getPositons()
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
                    <div className={style.positions}>
                        <label>Cargo: </label>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value); setErrorName([]) }} />
                        {errorName ? (
                            <div className="Error">{errorName}</div>
                        ) : null}
                        <BsPlusLg size={20} onClick={() => submitPositions()} />
                    </div>
                    <div className={style.positionsTable}>
                    {positions.length !== 0 ?
                        <Table
                            sticky={true}
                            columns={columnsAdmins}
                            data={positions}
                            showHeader={false}
                        />
                        :
                        <div>
                            Nenhum cargo está cadastrado.
                        </div>
                    }
                    </div>
                </div>

            </div>
        </>
    )
}
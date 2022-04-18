import React, { useEffect, useState } from "react";
import Header from '../../components/header'
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';
import { BsFillTrashFill} from 'react-icons/bs'
import Table from 'rc-table'
import {GiArchiveRegister} from 'react-icons/gi'

import style from './employee.module.css'
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
    const navigate = useNavigate()

    const [employees, setEmployees] = useState([])

    async function getEmployees() {
        let employees = await api.get('/employees')
        setEmployees(employees.data)
    }
    useEffect(() => {
        getEmployees()
    }, [])

    const columns = [
        {
            title: "Nome",
            dataIndex: "name",
            key: "file",
            align: "left",
            width: 1000,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "file",
            align: "left",
            width: 1000,
        },
        {
            title: "Cargo",
            dataIndex: "",
            key: "file",
            align: "left",
            width: 1000,
            render: (row) => (<div>{row.Positions.name}</div>)

        },
        {
            title: "",
            headerName: "Nome", 
            dataIndex: "",
            key: "file",
            align: "left",
            width: 50,
            render: (value, row, id) => {
                return (<BsFillTrashFill onClick={() => handleRemoveEmployee(row.id)} style={{ display: 'flex', cursor: 'pointer' }}/>)
            }
        },
    ]

    function handleRemoveEmployee(id) {
        try {
            Swal.fire({
                title: 'Deseja deletar esse funcionário?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#009EBE",
                cancelButtonColor: "#636e72",
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let response = await api.delete(`/employees/${id}`)
                    if (response.status == 200) {
                        Toast.fire({
                            icon: 'success',
                            title: "O registro foi excluido com sucesso!",
                        })
                        getEmployees()

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


    return (
        <>
            <Header />
            <div className={style.main}>
                <div className={style.container}>
                    <div className={style.containerButtons}>
                    <button onClick={() => navigate('/register')} >
                            <GiArchiveRegister size={20} color="#fff"/> Cadastrar funcionário
                        </button>
                    </div>
                    <div className={style.employeeTable}>
                    {employees.length !== 0 ?
                        <Table
                            sticky={true}
                            columns={columns}
                            data={employees}
                            showHeader={true}
                        />
                        :
                        <div>
                            Nenhum funcionário está cadastrado.
                        </div>
                    }
                    </div>
                </div>

            </div>
        </>
    )
}
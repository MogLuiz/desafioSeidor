import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import api from '../../services/api'

import moment from 'moment'

interface IContributors {
    
    id: number;
    nome: string;
    cpf: string;
    salBruto: number;
    descPrevidencia: number;
    numDependentes: number;
    created_at: Date;
    updated_at: Date;
}

const Contributors: React.FC = () => {

    const [contributors, setContributors] = useState<IContributors[]>([])

    useEffect(() => { 
        loadContributors()
    }, [])

    async function loadContributors() {
        const response = await api.get('/contributors')
        console.log(response)
        setContributors(response.data)
    }

    function formateDate(date: Date){
        return moment(date).format("DD/MM/YYYY")
    }

    return (
        <div className="container">
            <br/>
            <h1>Contributors Page</h1>
            <br/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Salário</th>
                    <th>Desconto</th>
                    <th>Dependentes</th>
                    <th>Desconto IRPF</th>
                    <th>ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        contributors.map(contributors => (
                            <tr key={contributors.id}>
                            <td>{contributors.nome}</td>
                            <td>{contributors.cpf}</td>
                            <td>{contributors.salBruto}</td>
                            <td></td>
                            <td>{contributors.numDependentes}</td>
                            <td></td>
                            <td></td>
                            </tr>
                        ))
                    }
                   
                </tbody>
            </Table>
        </div>
    )
}

export default Contributors 
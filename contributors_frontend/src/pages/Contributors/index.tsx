import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

import moment from 'moment'
import './index.css'

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
    const history = useHistory()

    useEffect(() => { 
        loadContributors()
    }, [])

    async function loadContributors() {
        const response = await api.get('/contributors')
        console.log(response)
        setContributors(response.data)
    }

    async function deleteCollaborator(id: number){
        await api.delete(`/collaborator/${id}`)
    }

    function formateDate(date: Date){
        return moment(date).format("DD/MM/YYYY")
    }

    function newCollaborator () {
        history.push('/colaboradores_cadastro')
    }

    function viewCollaborator(id: number){
        history.push(`/colaboradores/${id}`)
    }

    function editCollaborator(id: number){
        history.push(`/colaboradores_cadastro/${id}`)
    }

    function calcDiscount(contributors: IContributors){
            const descPorDependente = contributors.numDependentes * 164
            var salBase = contributors.salBruto - contributors.descPrevidencia - descPorDependente
            
            if(salBase < 1903){
                salBase  = 0
            }
            if(salBase >= 1903 && salBase < 2826) {
                salBase  = salBase * 0.075 
                    
            } 
            if(salBase > 2826 && salBase < 3752){
                salBase  = salBase * 0.15 
                
            }
            if(salBase > 3752 && salBase < 4664){
                 salBase  = salBase * 0.225 
                
            }
            if(salBase > 4664){
                 salBase = salBase * 0.275
                
            }

            
            
            return salBase
            
    }

    return (
        <div className="container">
            <br/>
            <div className="contributors-header">
                <h1>Contributors Page</h1>
                <Button variant="dark" size="sm" onClick={newCollaborator} >Novo Colaborador</Button>
            </div>
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
                            <td>{calcDiscount(contributors)}</td>
                            <td>
                                <Button size="sm" onClick={ () => editCollaborator(contributors.id)}>Editar</Button>{' '}
                                <Button size="sm" variant="info" onClick={ () => viewCollaborator(contributors.id)}>Visualizar</Button>{' '}
                                <Button size="sm" variant="danger" onClick={ () => deleteCollaborator(contributors.id)}>Remover</Button>{' '}
                            </td>
                            </tr>
                        ))
                    }
                   
                </tbody>
            </Table>
        </div>
    )
}

export default Contributors 
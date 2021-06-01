import React, { useState, useEffect, ChangeEvent } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {  Button, Form } from 'react-bootstrap'
import api from '../../../services/api'


import '../index.css'

interface IContributors {
    
    nome: string;
    cpf: string;
    salBruto: number;
    descPrevidencia: number;
    numDependentes: number;
    
}

interface IParamsProps {
    id: string;
}

const Contributors: React.FC = () => {

    const history = useHistory()
    const { id } = useParams<IParamsProps>();
    const [model, setModel] = useState<IContributors>({
        nome: '',
        cpf: '',
        salBruto: 0,
        descPrevidencia: 0,
        numDependentes:0 ,
    })

    useEffect(() => {
        if(id !== undefined){
            findCollaborator(id)
        }
    }, [id])

    function updatedModel (e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()

        if(id !== undefined){
            const response = await api.put(`/collaborator/${id}`, model)
        } else {
            const response = await api.post('/collaborator', model)
        }
        back()
    }

    async function findCollaborator (id: string) {
        const response = await api.get(`collaborator/${id}`)
        setModel({
            nome: response.data.nome,
            cpf: response.data.cpf,
            salBruto: response.data.salBruto,
            descPrevidencia: response.data.descPrevidencia,
            numDependentes: response.data.numDependentes,
        })
    }

    function back() {
        history.goBack()
    }

    return (
        <div className="container">
            <br/>
            <div className="contributors-header">
                <h1>new Contributors</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br/>
            <div className="container">
            <Form onSubmit={onSubmit}>
                <Form.Group >
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="nome"
                        value={model.nome} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Label>CPF</Form.Label>
                    <Form.Control 
                        type="text"
                        name="cpf" 
                        value={model.cpf} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Salário Bruto</Form.Label>
                    <Form.Control 
                        type="number"
                        name="salBruto" 
                        value={model.salBruto} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}  
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Desconto da Previdência</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="descPrevidencia" 
                        value={model.descPrevidencia} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Número de dependentes</Form.Label>
                    <Form.Control 
                        type="number"
                        name="numDependentes" 
                        value={model.numDependentes} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}  
                    />
                </Form.Group>
                <br/>
                <Button variant="dark" type="submit">
                    Salvar
                </Button>
                </Form>
            </div>
            
        </div>
    )
}

export default Contributors 
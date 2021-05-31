import React, { useState, useEffect, ChangeEvent } from 'react'
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

const Contributors: React.FC = () => {

    const [model, setModel] = useState<IContributors>({
        nome: '',
        cpf: '',
        salBruto: 0,
        descPrevidencia: 0,
        numDependentes:0 ,
    })

    function updatedModel (e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })

    }

    return (
        <div className="container">
            <br/>
            <div className="contributors-header">
                <h1>new Contributors</h1>
                <Button variant="dark" size="sm">Voltar</Button>
            </div>
            <br/>
            <div className="container">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Salário Bruto</Form.Label>
                    <Form.Control type="number"  />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Desconto da Previdência</Form.Label>
                    <Form.Control type="number"  />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Número de dependentes</Form.Label>
                    <Form.Control type="number"  />
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
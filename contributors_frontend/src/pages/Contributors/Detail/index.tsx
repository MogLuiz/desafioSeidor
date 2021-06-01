import React, {useState, useEffect} from 'react'
import { useHistory , useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import api from '../../../services/api'
import moment from 'moment'

interface IParamsProps {
    id: string;
}

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


const Detail: React.FC = () => {

    const { id } = useParams<IParamsProps>();
    const history = useHistory()
    const [contributors, setContributors] = useState<IContributors>()

    useEffect( () => {
        findCollaborator()
    }, [id])

    function back() {
        history.goBack()
    }

    async function findCollaborator() {
        const response = await api.get<IContributors>(`/collaborator/${id}`)
        setContributors(response.data)
    }

    function formateDate(date: Date){
        return moment(date).format("DD/MM/YYYY")
    }

    return(
        <div className="container">
            <br/>
            <div className="contributors-header">
                <h1>Detalhes do colaborador</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br/>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{ contributors?.nome }</Card.Title>
                    <Card.Text>
                        CPF : {contributors?.cpf}
                    </Card.Text>
                    <Card.Text>
                        Salário Bruto : {contributors?.salBruto}
                    </Card.Text>
                    <Card.Text>
                        Número de dependentes : {contributors?.numDependentes}
                    </Card.Text>
                    <Card.Text>
                        Desconto da previdência : {contributors?.descPrevidencia}
                    </Card.Text>
                    <strong>Data de ingresso na seidor : { contributors?.created_at != undefined ? formateDate(contributors.created_at) : ''} </strong>
                    <br/>
                    <strong>Data de atualização : { contributors?.updated_at ? formateDate(contributors.updated_at) : ''} </strong>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Detail
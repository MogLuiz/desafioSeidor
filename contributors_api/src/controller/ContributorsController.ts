import { getRepository } from 'typeorm';
import { Contributors } from '../entity/Contributors'
import { Request, Response } from 'express'

export const getContributors = async (request: Request, response: Response) => {
    
    const contributors = await getRepository(Contributors).find()
    return response.json(contributors)
}

export const getCollaborator = async (request: Request, response: Response) => {

    const { id } = request.params
    const collaborator = await getRepository(Contributors).findOne(id)
    response.json(collaborator)
}

export const saveCollaborator = async (request: Request, response: Response) => {
    
    const collaborator = await getRepository(Contributors).save(request.body)
    response.json(collaborator)
}

export const updateCollaborator = async (request: Request, response: Response) => {
    
    const { id } = request.params
    const collaborator = await getRepository(Contributors).update(id, request.body)

    if(collaborator.affected === 1){
        const collaboratorUpdated = await getRepository(Contributors).findOne(id)
        return response.json(collaboratorUpdated)
    }
    
    return response.status(404).json({ message: 'Collaborator not found!'})
}

export const removeCollaborator = async (request: Request, response: Response) => {
    
    const { id } = request.params
    const collaborator = await getRepository(Contributors).delete(id)

    if(collaborator.affected){
        const collaboratorDelete = await getRepository(Contributors).findOne(id)
        return response.json({ message: 'Collaborator removed!' })
    }

    return response.status(404).json({ message: 'Collaborator not found!'})

}
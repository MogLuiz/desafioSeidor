import { getRepository } from 'typeorm'
import { Contributors } from '../entity/Contributors'
import { Request, Response } from 'express'

export const getContributors = async (request: Request, response: Response) => {
    
    const contributors = await getRepository(Contributors).find()
    return response.json(contributors)
}

export const saveContributors = async (request: Request, response: Response) => {
    
    const collaborator = await getRepository(Contributors).save(request.body)
    response.json(collaborator)
}
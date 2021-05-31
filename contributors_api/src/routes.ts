import { Router, Request, Response } from 'express'
import { getContributors, saveCollaborator, getCollaborator, updateCollaborator, removeCollaborator } from './controller/ContributorsController'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World 2'})
})

routes.get('/contributors', getContributors)
routes.get('/collaborator/:id', getCollaborator)
routes.post('/collaborator', saveCollaborator)
routes.put('/collaborator/:id', updateCollaborator)
routes.delete('/collaborator/:id', removeCollaborator)

export default routes
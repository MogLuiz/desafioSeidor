import { Router, Request, Response } from 'express'
import { getContributors, saveContributors } from './controller/ContributorsController'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World 2'})
})

routes.get('/contributors', getContributors)
routes.post('/contributors', saveContributors)

export default routes
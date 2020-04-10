import { Router } from './router'
import { newUser } from './functions/newUser'
import { getUser } from './functions/getUser'

const router = new Router()
router.post('/newUser', newUser)
router.get('/getUser/.*', getUser)

export async function handleRequest(request: Request): Promise<Response> {
  return router.route(request)
}

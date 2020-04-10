import { User, userRepository } from '../models/User'

export const newUser = async (req: Request) => {
  const data = await req.json()
  const user = new User(data.emailAddress)
  user.firstName = data.firstName
  user.lastName = data.lastName
  await userRepository.save(user)
  return new Response(JSON.stringify({ success: 'true' }), {
    headers: { 'Content-Type': 'application/json' },
  })
}

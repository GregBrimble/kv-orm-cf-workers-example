import { User, userRepository } from '../models/User'

export const getUser = async (req: Request) => {
  console.log(new URL(req.url).pathname)
  const emailAddress = new URL(req.url).pathname.split('/').pop()
  const user = await userRepository.load(emailAddress)
  return new Response(
    JSON.stringify({
      emailAddress: await user.emailAddress,
      firstName: await user.firstName,
      lastName: await user.lastName,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
}

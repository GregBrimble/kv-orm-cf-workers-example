import { Entity, Column, getRepository } from '@kv-orm/core'
import { CloudflareWorkersKVDatastore } from '@kv-orm/cf-workers'

const datastore = new CloudflareWorkersKVDatastore(myKVNamespace)

@Entity({ datastore, key: 'User' })
class User {
  @Column({ key: 'givenName' })
  public firstName?: string

  @Column({ key: 'familyName' })
  public lastName?: string

  @Column({ key: 'emailAddress', isPrimary: true })
  public emailAddress: string

  constructor(emailAddress: string) {
    this.emailAddress = emailAddress
  }
}

const userRepository = getRepository(User)

export async function handleRequest(request: Request): Promise<Response> {
  const aNewUser = new User('abc@xyz.com')
  aNewUser.firstName = 'John'
  aNewUser.lastName = 'Smith'

  await userRepository.save(aNewUser)

  const loadedUser = await userRepository.load('abc@xyz.com')

  return new Response(
    `You've created, saved and loaded a User!
    Email Address: ${await aNewUser.emailAddress},
    First (Given) Name: ${await loadedUser.firstName}
    Last (Family) Name: ${await loadedUser.lastName}`,
  )
}

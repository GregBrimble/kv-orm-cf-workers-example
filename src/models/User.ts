import { Entity, Column, getRepository } from '@kv-orm/core'
import { datastore } from '../datastore'

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

export { User, userRepository }

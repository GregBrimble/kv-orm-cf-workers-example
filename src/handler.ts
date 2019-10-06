import { Entity, Column, getRepository } from '@kv-orm/core'
import { CloudflareWorkersKVDatastore } from '@kv-orm/cf-workers'

const datastore = new CloudflareWorkersKVDatastore(myKVNamespace)

@Entity({ datastore, key: 'XClass' })
class X {
  @Column({ key: 'myProperty' })
  public myProp = 'greg'

  @Column({ key: 'identifier', isPrimary: true })
  public id: number

  constructor(id: number) {
    this.id = id
  }
}

const XRepo = getRepository(X)

export async function handleRequest(request: Request): Promise<Response> {
  const instance = new X(12345)
  instance.myProp = 'tim'

  return new Response(
    `request method: ${
      request.method
    } & ${await instance.myProp} & ${await XRepo.save(
      instance,
    )} & ${await XRepo.save(instance)} & ${await (await XRepo.load(12345))
      .myProp}`,
  )
}

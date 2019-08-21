import { BaseEntity, Column, Entity, OneToMany } from 'kv-orm'
import { workersExampleDatastore } from '../datastores/workersExampleDatastore'
import { Address } from './Address'

@Entity(workersExampleDatastore)
export class User extends BaseEntity {

  @Column()
  public firstName: string = 'John';

  @Column()
  public lastName: string = 'Doe';

  @OneToMany(Address)
  public addresses: Address[] = [];
}

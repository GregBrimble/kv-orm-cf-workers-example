import { BaseEntity, Column, Entity } from 'kv-orm'
import { workersExampleDatastore } from '../datastores/workersExampleDatastore'

@Entity(workersExampleDatastore)
export class Address extends BaseEntity {

  @Column()
  public firstLine: string

  @Column()
  public secondLine: string

  @Column()
  public country: string

  @Column()
  public zipCode: string

  constructor(firstLine: string, secondLine: string, country: string, zipCode: string) {
    super();
    this.firstLine = firstLine;
    this.secondLine = secondLine;
    this.country = country;
    this.zipCode = zipCode;
  }
}

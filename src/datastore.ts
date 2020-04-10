import { CloudflareWorkersKVDatastore } from '@kv-orm/cf-workers'

export const datastore = new CloudflareWorkersKVDatastore(CFKVNamespace)

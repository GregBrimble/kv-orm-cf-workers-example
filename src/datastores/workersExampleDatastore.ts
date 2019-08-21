import { CloudflareWorkersKVDatastore, CloudflareWorkersKVNamespace } from 'kv-orm-cf-workers'

export const workersExampleDatastore = new CloudflareWorkersKVDatastore(KVORMCFWORKERSEXAMPLE as unknown as CloudflareWorkersKVNamespace)

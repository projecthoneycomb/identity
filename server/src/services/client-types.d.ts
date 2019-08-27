import { TableUtilities } from 'azure-storage';

export interface AzureResultEntity {
  '_': string,
  type: string
}

export interface AzureInputEntity {
  [key: string]: TableUtilities.entityGenerator.EntityProperty<unknown>
}

export interface AzureEntry {
  [key: string]: AzureResultEntity
}

export interface QueryResponse {
  entries: AzureEntry[]
}

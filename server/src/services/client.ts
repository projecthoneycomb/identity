import { TableService, TableUtilities, TableQuery } from 'azure-storage';
import DatabaseError from '../errors/database-error';

interface AzureResultEntity {
  '_': string,
  type: string
}

interface AzureInputEntity {
  [key: string]: TableUtilities.entityGenerator.EntityProperty<unknown>
}

interface AzureEntry {
  [key: string]: AzureResultEntity
}

interface QueryResponse {
  entries: AzureEntry[]
}




export default class TableStorageClient {
  az: TableService;
  tableName: string;

  constructor(azureTableClient: TableService, tableName: string) {
    this.az = azureTableClient;
    this.tableName = tableName;

    this.az.createTableIfNotExists(this.tableName, (error) => {
      console.log(error);
    });
  }

  private mapEntityToObject(entity: AzureEntry) {
    const object: {[key: string]: string} = {};
    for (let key in entity) {
      object[key] = entity[key]['_'];
    }
    return object;
  }

  private mapEntitiesToObjects(entities: AzureEntry[]) {
    return entities.map(((entity: AzureEntry) => this.mapEntityToObject(entity)));
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const query = new TableQuery();
      // @ts-ignore
      this.az.queryEntities(this.tableName, query, null, (error, result: QueryResponse) => {
        resolve(this.mapEntitiesToObjects(result.entries)); 
      })
    });
  }

  getByPartition() {

  }

  getById() {

  }

  getByPartitionAndId() {

  }

  createOrUpdateByPartitionAndId(entity: AzureInputEntity) {
    return new Promise((resolve, reject) => {
      this.az.insertOrReplaceEntity(this.tableName, entity, (error, result) => {
        if (error) reject(new DatabaseError(error));
        resolve(result);
      })
    });
  }
}
import { TableService, TableUtilities, TableQuery } from 'azure-storage';

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

  private mapEntityToObject(entity: {[key: string]: { '_': string }}) {
    const object: {[key: string]: string} = {};
    for (let key in entity) {
      object[key] = entity[key]['_'];
    }
    return object;
  }

  private mapEntitiesToObjects(entities: Array<{[key: string]: { '_': string }}>) {
    return entities.map(((entity: {[key: string]: { '_': string }}) => this.mapEntityToObject(entity)));
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const query = new TableQuery();
      // @ts-ignore
      this.az.queryEntities(this.tableName, query, null, (error, result) => {
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

  createOrUpdateByPartitionAndId(entity: {[key: string]: TableUtilities.entityGenerator.EntityProperty<unknown>}) {
    return new Promise((resolve, reject) => {
      this.az.insertOrReplaceEntity(this.tableName, entity, (error, result) => {
        resolve(result);
      })
    });
  }
}
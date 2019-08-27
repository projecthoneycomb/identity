import { TableService, TableUtilities, TableQuery } from 'azure-storage';
import DatabaseError from '../errors/database-error';
import GenericError from '../errors/generic-error';
import { AzureEntry, AzureInputEntity, QueryResponse } from './client-types';

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

  getById(id: string) {
    return new Promise((resolve, reject) => {
      const query = new TableQuery();
      query.where('RowKey == ?', id);
      // @ts-ignore
      this.az.queryEntities(this.tableName, query, null, (error, result: QueryResponse) => {
        let results = this.mapEntitiesToObjects(result.entries);
        if(results.length > 1) {
          throw new GenericError('Something has gone wonky here.');
        }

        const [doc] = results;
        resolve(doc); 
      })
    });
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
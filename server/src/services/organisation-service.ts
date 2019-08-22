import TableStorageClient from "./client";
import { TableUtilities, TableService } from 'azure-storage';
import { v4 } from 'uuid';


export default class OrganisationService {

  client: TableStorageClient;

  constructor(client: TableStorageClient) {
    this.client = client;
  }

  async createOrganisation(name?: string) {

    if(!name) {
      throw { msg: 'No name bitch' };
    }

    const entity = {
      PartitionKey: TableUtilities.entityGenerator.String('organisation'),
      RowKey: TableUtilities.entityGenerator.Guid(v4()),
      name: TableUtilities.entityGenerator.String(name)
    }

    let results = await this.client.createOrUpdateByPartitionAndId(entity);
    return results;
  }

  async getOrganisations() {
    return this.client.getAll()
  }
}
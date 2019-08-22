import { TableService } from 'azure-storage';

export default class TableStorageClient {
  az: TableService;
  tableName: string;

  constructor(azureTableClient: TableService, tableName: string) {
    // Automagically pulls the creds from env (AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_ACCESS_KEY)
    this.az = azureTableClient;
    this.tableName = tableName;
  }

  getAll() {

  }

  getByPartition() {

  }

  getById() {

  }

  getByPartitionAndId() {

  }

  createOrUpdateByPartitionAndId() {

  }
}
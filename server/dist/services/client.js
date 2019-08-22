"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TableStorageClient {
    constructor(azureTableClient, tableName) {
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
exports.default = TableStorageClient;
//# sourceMappingURL=client.js.map
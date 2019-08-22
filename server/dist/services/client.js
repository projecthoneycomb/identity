"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const azure_storage_1 = require("azure-storage");
class TableStorageClient {
    constructor(azureTableClient, tableName) {
        this.az = azureTableClient;
        this.tableName = tableName;
        this.az.createTableIfNotExists(this.tableName, (error) => {
            console.log(error);
        });
    }
    mapEntityToObject(entity) {
        const object = {};
        for (let key in entity) {
            object[key] = entity[key]['_'];
        }
        return object;
    }
    mapEntitiesToObjects(entities) {
        return entities.map(((entity) => this.mapEntityToObject(entity)));
    }
    getAll() {
        return new Promise((resolve, reject) => {
            const query = new azure_storage_1.TableQuery();
            // @ts-ignore
            this.az.queryEntities(this.tableName, query, null, (error, result) => {
                resolve(this.mapEntitiesToObjects(result.entries));
            });
        });
    }
    getByPartition() {
    }
    getById() {
    }
    getByPartitionAndId() {
    }
    createOrUpdateByPartitionAndId(entity) {
        return new Promise((resolve, reject) => {
            this.az.insertOrReplaceEntity(this.tableName, entity, (error, result) => {
                resolve(result);
            });
        });
    }
}
exports.default = TableStorageClient;
//# sourceMappingURL=client.js.map
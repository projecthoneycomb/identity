import { TableService } from 'azure-storage';
import TableStorageClient from './client';
import OrganisationService from './organisation-service';
import UserService from './user-service';

const client = new TableService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);

const organisationClient = new TableStorageClient(client, 'organisation');
export const organisationService = new OrganisationService(organisationClient);

const userClient = new TableStorageClient(client, 'user');
export const userService = new UserService(userClient);
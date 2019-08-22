import { TableService } from 'azure-storage';
import TableStorageClient from './client';
import OrganisationService from './organisation-service';

const client = new TableService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);

const organisationClient = new TableStorageClient(client, 'organisation');
export const organisationService = new OrganisationService(organisationClient);
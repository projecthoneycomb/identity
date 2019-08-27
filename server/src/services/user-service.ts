import TableStorageClient from "./client";
import { TableUtilities, TableService } from 'azure-storage';
import { v4 } from 'uuid';
import MissingParameterError from "../errors/missing-parameter-error";
import NotFoundError from "../errors/not-found-error";
import { AzureInputEntity } from './client-types';


interface IUser {
  PartitionKey: string;
  RowKey: string;
  firstName?: string;
  lastName?: string;
  superadmin?: boolean;
  organisations?: Array<string>;
}


export default class UserService {

  client: TableStorageClient;

  constructor(client: TableStorageClient) {
    this.client = client;
  }

  async createUser(email?: string) {

    if(!email) {
      throw new MissingParameterError('email');
    }

    const entity = {
      PartitionKey: TableUtilities.entityGenerator.String('user'),
      RowKey: TableUtilities.entityGenerator.String(email)
    }

    let results = await this.client.createOrUpdateByPartitionAndId(entity) as any;
    return results;
  }

  async updateUser(user: IUser) {
    const entity: AzureInputEntity = {
      PartitionKey: TableUtilities.entityGenerator.String(user.PartitionKey),
      RowKey: TableUtilities.entityGenerator.String(user.RowKey)
    }

    if (user.firstName) {
      entity.firstName = TableUtilities.entityGenerator.String(user.firstName);
    }

    if (user.lastName) {
      entity.lastName = TableUtilities.entityGenerator.String(user.lastName);
    }

    if (user.organisations) {
      entity.organisations = TableUtilities.entityGenerator.String(user.organisations.toString());
    }

    if (user.superadmin) {
      entity.superadmin = TableUtilities.entityGenerator.Boolean(user.superadmin);
    }

    let results = await this.client.createOrUpdateByPartitionAndId(entity);
    return results;
  }

  async getUserByEmail(email: string) {
    const user = await this.client.getById(email) as any;

    if(!user) {
      throw new NotFoundError('That user is not found.');
    }

    if(user.organisations) {
      user.organisations = user.organisations.split(',')
    }

    return user;
  }

  async addUserToOrganisation(email: string, orgId: string) {
    const user = await this.getUserByEmail(email) as IUser;
    let orgs = user.organisations || [];
    orgs.push(orgId);
    user.organisations = orgs;
    return await this.updateUser(user);
  }

  async inviteUserToOrganisation(email?: string, orgId?: string) {

    if(!email) {
      throw new MissingParameterError('email');
    }

    if(!orgId) {
      throw new MissingParameterError('orgId');
    }

    try {
      await this.getUserByEmail(email);
    } catch (e) {
      // We're catching a specific not found error. If it's not that, rethrow.
      if (!(e instanceof NotFoundError)) {
        throw e;
      }

      await this.createUser(email);
    }

    await this.addUserToOrganisation(email, orgId);
  }

  async getUsersForOrganisation(organisationId: string) {
    
  }
}
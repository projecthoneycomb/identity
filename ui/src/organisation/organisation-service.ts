export default class OrganisationService {

  api: string;

  constructor() {
    this.api = process.env.REACT_APP_API || '';
  }

  async createOrganisation(name: string, profile: string) {
    await fetch(`${this.api}/organisation`, {
      method: 'POST',
      headers: {}
    });
  }
}

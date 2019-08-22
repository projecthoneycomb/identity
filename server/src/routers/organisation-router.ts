import { Router } from 'express';
import { organisationService } from '../services/';
const organisationRouter = Router();

organisationRouter.post('/', async (req, res, next) => {
  const { name } = req.body;
  let results = await organisationService.createOrganisation(name);
  res.send(results);
});

organisationRouter.get('/', async (req, res, next) => {
  let results = await organisationService.getOrganisations();
  res.send(results);
});

export default organisationRouter;
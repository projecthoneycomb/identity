import { Router } from 'express';
import { organisationService } from '../services/';
import { logError } from '../helpers/logging';
const organisationRouter = Router();

organisationRouter.post('/', async (req, res, next) => {
  const { name } = req.body;
  try {
    let results = await organisationService.createOrganisation(name);
    res.send(results);
  } catch (e) {
    logError(e);
    res.status(e.code);
    res.send(e.toJSON());
  }
  
});

organisationRouter.get('/', async (req, res, next) => {
  let results = await organisationService.getOrganisations();
  res.send(results);
});

export default organisationRouter;
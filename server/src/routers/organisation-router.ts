import { Router } from 'express';
import { organisationService, userService } from '../services/';
import { verifyAuth, verifyProfile, verifyOrganisation } from '../middleware';
const organisationRouter = Router();

organisationRouter.post('/', verifyAuth, verifyProfile, async (req: any, res, next) => {
  const { name } = req.body;

  try {
    let results = await organisationService.createOrganisation(name);
    res.send(results);
  } catch (e) {
    next(e);
  }
});

organisationRouter.post('/:organisationId/invite', verifyAuth, verifyProfile, verifyOrganisation, async (req, res, next) => {
  const { email } = req.body;
  const id = req.params.organisationId;

  try {
    let results = await userService.inviteUserToOrganisation(email, id);
    res.send(results);
  } catch (e) {
    next(e);
  }
});

organisationRouter.get('/', async (req, res, next) => {
  let results = await organisationService.getOrganisations();
  res.send(results);
});

export default organisationRouter;
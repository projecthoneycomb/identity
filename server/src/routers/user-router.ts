import { Router } from 'express';
import { organisationService } from '../services/';
import { verifyAuth, verifyProfile } from '../middleware';
const userRouter = Router();

userRouter.post('/', verifyAuth, verifyProfile, async (req: any, res, next) => {
  const { name } = req.body;

  try {
    let results = await organisationService.createOrganisation(name);
    res.send(results);
  } catch (e) {
    next(e);
  }

});

userRouter.get('/', verifyAuth, async (req, res, next) => {
  let results = await organisationService.getOrganisations();
  res.send(results);
});

export default userRouter;
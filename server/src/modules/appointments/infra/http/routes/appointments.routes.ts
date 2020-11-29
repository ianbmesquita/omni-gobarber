import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentcated';

import AppointmentsController from '../controllers/AppointmentsController';
// import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
// const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;

import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockAppontmentsRepository from '../repositories/mocks/MockAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment.', async () => {
    const mockAppointmentsRepository = new MockAppontmentsRepository();

    const createAppointment = new CreateAppointmentService(
      mockAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments on the same time.', async () => {
    const mockAppointmentsRepository = new MockAppontmentsRepository();

    const createAppointment = new CreateAppointmentService(
      mockAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
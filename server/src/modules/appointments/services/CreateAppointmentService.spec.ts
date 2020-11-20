import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockAppontmentsRepository from '../repositories/mocks/MockAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let mockAppointmentsRepository: MockAppontmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppontmentsRepository();

    createAppointment = new CreateAppointmentService(
      mockAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment.', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments on the same time.', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

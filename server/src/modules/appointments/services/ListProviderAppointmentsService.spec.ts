import 'reflect-metadata';

import MockAppointmentsRepository from '../repositories/mocks/MockAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let mockAppointmentsRepository: MockAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      mockAppointmentsRepository,
    );
  });

  it('should be able to list the appointments by specific day.', async () => {
    const appointment1 = await mockAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 10, 29, 14, 0, 0),
    });

    const appointment2 = await mockAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 10, 29, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 11,
      day: 29,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});

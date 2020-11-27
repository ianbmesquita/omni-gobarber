import 'reflect-metadata';

import MockAppointmentsRepository from '../repositories/mocks/MockAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let mockAppointmentsRepository: MockAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      mockAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider.', async () => {
    await mockAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await mockAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: '1',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});

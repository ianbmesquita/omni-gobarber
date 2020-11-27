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
      user_id: '2',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await mockAppointmentsRepository.create({
      provider_id: '1',
      user_id: '2',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 20, 11).getTime();
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
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});

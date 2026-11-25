import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateAppointmentForm,
  getBahrainClinicStatus,
  getVisibleServices,
  buildAppointmentSummaryText,
  type ServiceItemConfig,
} from './appointmentLogic';

test('validateAppointmentForm rejects empty required fields', () => {
  const errors = validateAppointmentForm(
    {
      fullName: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      serviceId: '',
      message: '',
    },
    'en',
    new Date('2026-11-25T10:00:00Z')
  );

  assert.ok(errors.fullName);
  assert.ok(errors.phone);
  assert.ok(errors.preferredDate);
  assert.ok(errors.preferredTime);
  assert.ok(errors.serviceId);
});

test('validateAppointmentForm rejects Friday bookings and past dates', () => {
  const fridayErrors = validateAppointmentForm(
    {
      fullName: 'Amina Hasan',
      phone: '+973 3311 2233',
      preferredDate: '2026-11-27', // Friday
      preferredTime: 'Morning (9:00 AM – 1:00 PM)',
      serviceId: 'general',
      message: '',
    },
    'en',
    new Date('2026-11-25T10:00:00Z')
  );
  assert.match(fridayErrors.preferredDate ?? '', /Friday/i);

  const pastErrors = validateAppointmentForm(
    {
      fullName: 'Amina Hasan',
      phone: '+973 3311 2233',
      preferredDate: '2026-11-20',
      preferredTime: 'Morning (9:00 AM – 1:00 PM)',
      serviceId: 'general',
      message: '',
    },
    'ar',
    new Date('2026-11-25T10:00:00Z')
  );
  assert.ok(pastErrors.preferredDate);
});

test('validateAppointmentForm passes for valid Saturday–Thursday request', () => {
  const errors = validateAppointmentForm(
    {
      fullName: 'Ali Al Khalifa',
      phone: '+973 1733 1999',
      preferredDate: '2026-11-26', // Thursday
      preferredTime: 'Afternoon (1:00 PM – 5:00 PM)',
      serviceId: 'cosmetic',
      message: 'Consultation inquiry',
    },
    'en',
    new Date('2026-11-25T10:00:00Z')
  );
  assert.deepEqual(errors, {});
});

test('getBahrainClinicStatus checks Friday closure and Saturday–Thursday hours', () => {
  // Wednesday 10:00 UTC -> 13:00 Bahrain (Open)
  const wedOpen = getBahrainClinicStatus(new Date('2026-11-25T10:00:00Z'));
  assert.equal(wedOpen.isOpen, true);
  assert.equal(wedOpen.dayNameEn, 'Wednesday');

  // Friday 10:00 UTC -> 13:00 Bahrain (Closed all day)
  const friClosed = getBahrainClinicStatus(new Date('2026-11-27T10:00:00Z'));
  assert.equal(friClosed.isOpen, false);
  assert.equal(friClosed.dayNameEn, 'Friday');

  // Saturday 19:00 UTC -> 22:00 Bahrain (After 9 PM closing)
  const satLate = getBahrainClinicStatus(new Date('2026-11-28T19:00:00Z'));
  assert.equal(satLate.isOpen, false);
});

test('getVisibleServices filters out hidden or toggled-off services', () => {
  const sample: ServiceItemConfig[] = [
    {
      id: 's1',
      visible: true,
      image: '/a.jpg',
      iconKey: 'shield',
      en: { title: 'S1', shortDesc: '', detailDesc: '', note: '' },
      ar: { title: 'خ1', shortDesc: '', detailDesc: '', note: '' },
    },
    {
      id: 's2',
      visible: false,
      image: '/b.jpg',
      iconKey: 'heart',
      en: { title: 'S2', shortDesc: '', detailDesc: '', note: '' },
      ar: { title: 'خ2', shortDesc: '', detailDesc: '', note: '' },
    },
    {
      id: 's3',
      visible: true,
      image: '/c.jpg',
      iconKey: 'users',
      en: { title: 'S3', shortDesc: '', detailDesc: '', note: '' },
      ar: { title: 'خ3', shortDesc: '', detailDesc: '', note: '' },
    },
  ];
  const result = getVisibleServices(sample, ['s3']);
  assert.deepEqual(
    result.map((s) => s.id),
    ['s1']
  );
});

test('buildAppointmentSummaryText produces structured summary in EN and AR', () => {
  const text = buildAppointmentSummaryText(
    {
      fullName: 'Sara',
      phone: '+973 3300 1122',
      preferredDate: '2026-11-26',
      preferredTime: 'Morning',
      serviceId: 'general',
      message: '',
    },
    'General Dentistry',
    'en'
  );
  assert.match(text, /Tooth Hub Speciality Dental Centre/);
  assert.match(text, /General Dentistry/);
});

import express from 'express';
import { getAppointments, createAppointment, acceptAppointment, rejectAppointment, delAppointment, updateAppointmentStatusByToken, searchAppointmentByCustomer } from '../controllers/appointments.js';
import { isAdminMiddleware } from '../services/utils/auth.js';

const router = express.Router();

router.post('/api/appointments', createAppointment);

router.get('/api/appointments', isAdminMiddleware, getAppointments);

router.post('/api/appointments/search', isAdminMiddleware, searchAppointmentByCustomer);

router.get('/api/appointments/accept', acceptAppointment);
router.get('/api/appointments/reject', rejectAppointment);

router.patch('/api/appointments/status-update', isAdminMiddleware, updateAppointmentStatusByToken);

router.delete('/api/appointments/:id', isAdminMiddleware, delAppointment);

export default router;

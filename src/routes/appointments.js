import express from 'express';
import { getAppointments, createAppointment, acceptAppointment, rejectAppointment, delAppointment, updateAppointmentStatusByToken } from '../controllers/appointments.js';
import { isAdminMiddleware } from '../services/utils/auth.js';

const router = express.Router();

router.post('/api/appointments', isAdminMiddleware, createAppointment);

router.get('/api/appointments', isAdminMiddleware, getAppointments);

router.get('/api/appointments/accept', acceptAppointment);
router.get('/api/appointments/reject', rejectAppointment);

router.patch('/api/appointments/status-update', isAdminMiddleware, updateAppointmentStatusByToken);

router.delete('/api/appointments/:id', isAdminMiddleware, delAppointment);

export default router;

import express from 'express';
import { getAppointments, createAppointment, acceptAppointment, rejectAppointment } from '../controllers/appointments.js';
import { isAdminMiddleware } from '../services/middlewares/auth.js';

const router = express.Router();

router.post('/api/appointments', isAdminMiddleware, createAppointment);

router.get('/api/appointments', isAdminMiddleware, getAppointments);

router.get('/api/appointments/accept', acceptAppointment);
router.get('/api/appointments/reject', rejectAppointment);



export default router;

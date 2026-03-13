import express from 'express';
import { getAppointments, createAppointment, acceptAppointment, rejectAppointment } from '../controllers/appointments.js';

const router = express.Router();

router.post('/api/appointments', createAppointment);

router.get('/api/appointments', getAppointments);

router.get('/api/appointments/accept', acceptAppointment);
router.get('/api/appointments/reject', rejectAppointment);



export default router;

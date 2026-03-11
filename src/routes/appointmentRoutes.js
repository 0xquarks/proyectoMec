import express from 'express';
import { handleCreateAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/appointment', handleCreateAppointment);

export default router;

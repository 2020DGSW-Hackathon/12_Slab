import { Router } from 'express';
import auth from './auth';
import user from './user';
import upload from './upload';
import laboratory from './laboratory';
import major from './major';
const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/upload', upload);
router.use('/laboratory', laboratory);
router.use('/major', major);

export default router;

import { Router } from 'express';
import multer from 'multer';
import { videoController } from '../controllers/video.controller';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/videos', videoController.getVideos);
router.post('/upload', upload.single('video'), videoController.uploadVideo);

export default router;
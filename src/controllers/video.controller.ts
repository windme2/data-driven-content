import { Request, Response } from 'express';
import { videoService } from '../services/video.service';

export const videoController = {
  uploadVideo: (req: Request, res: Response) => {
    const { title, userId } = req.body;
    
    // Create via service
    const video = videoService.createVideo(title, userId, req.file?.filename);

    res.status(201).json(video);
  },

  getVideos: (req: Request, res: Response) => {
    const videos = videoService.getAllVideos();
    
    res.json({
      success: true,
      data: videos
    });
  }
};

import { Request, Response } from 'express';
import { actionService } from '../services/action.service';

export const actionController = {
  logAction: (req: Request, res: Response) => {
    const { userId, videoId, type } = req.body;
    
    // Log via service
    const action = actionService.logAction(userId, videoId, type);

    res.status(201).json({ message: 'Action logged', data: action });
  }
};

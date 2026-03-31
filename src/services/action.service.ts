import { mockActions } from '../data/mockDb';
import fs from 'fs';

export const actionService = {
  logAction: (userId: string | undefined, videoId: string, type: string) => {
    const action = {
      id: mockActions.length + 1,
      userId: userId || 'anonymous',
      videoId,
      type,
      timestamp: new Date()
    };

    mockActions.push(action);

    // Simulate sending data to a Data Lake/Stream
    const logData = JSON.stringify(action) + '\\n';
    fs.appendFileSync('interaction_logs.json', logData);

    return action;
  }
};

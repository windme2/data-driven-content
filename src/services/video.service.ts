import { mockVideos } from '../data/mockDb';

export const videoService = {
  createVideo: (title: string | undefined, userId: string | undefined, filename: string | undefined) => {
    const video = {
      id: String(mockVideos.length + 1),
      title: title || 'Untitled Video',
      url: filename ? `/uploads/${filename}` : '',
      authorId: userId || 'user_1',
      createdAt: new Date()
    };
    
    mockVideos.push(video);
    return video;
  },

  getAllVideos: () => {
    return mockVideos;
  }
};

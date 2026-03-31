import request from 'supertest';
import app from '../index';
import fs from 'fs';
import path from 'path';

// Clean up mock files after tests if needed
afterAll(() => {
  const logFile = path.resolve(__dirname, '../../interaction_logs.json');
  if (fs.existsSync(logFile)) {
    // Optionally clean up log file so tested logs don't persist
    // fs.unlinkSync(logFile);
  }
});

describe('Data-Driven Content API', () => {
  it('GET /videos - should return a list of testing videos', async () => {
    const res = await request(app).get('/videos');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /upload - should upload a mock video and return metadata', async () => {
    const res = await request(app)
      .post('/upload')
      .field('title', 'My Test Video')
      .field('userId', 'user_test_123');
      // No file attached here as we just want to test logic without mocking storage deeply
      
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('My Test Video');
    expect(res.body.authorId).toBe('user_test_123');
  });

  it('POST /action - should log user interaction properly', async () => {
    const payload = {
      userId: 'user_test_123',
      videoId: '1',
      type: 'LIKE',
    };

    const res = await request(app).post('/action').send(payload);
    
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Action logged');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.type).toBe('LIKE');
    expect(res.body.data.userId).toBe('user_test_123');
  });

  it('POST /action - should return 400 when sending invalid type', async () => {
    const payload = {
      userId: 'user_test_123',
      videoId: '1',
      type: 'INVALID_TYPE',
    };
    const res = await request(app).post('/action').send(payload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

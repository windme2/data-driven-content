# 🎬 Data-Driven Content API

A prototype API for a Data-Driven Video Content system (similar to TikTok/Reels), designed to support data ingestion for future Data Analytics and AI Recommender Systems.

## ✨ Features

- **Video Upload**: Upload videos via `multipart/form-data`.
- **Video Feed**: Fetch a list of videos to display on the feed, complete with built-in static file serving for video playback.
- **User Actions Tracking**: Log user interactions (e.g., VIEW, LIKE, SHARE) into a log file (`interaction_logs.json`) for Big Data Pipelines (e.g., streaming to Kafka/Spark).
- **Automated Testing**: Includes API tests using Jest and Supertest to ensure endpoints work as expected.
- **CORS Enabled**: Ready to be integrated with frontend applications (React, Vue, etc.) running on different ports.

*Note: Currently, the system runs with a Mock Database (in-memory array) to allow immediate frontend prototyping without requiring Prisma/PostgreSQL setup.*

## 💻 Tech Stack

- Node.js (Runtime)
- Express.js (Framework)
- TypeScript (Language)
- Prisma (ORM - Configured & ready for DB integration)
- Multer (File Uploads)
- Jest & Supertest (Testing)

## 📋 Prerequisites

- Node.js (v18+)
- npm or yarn

## 🛠️ Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Create a `.env` file from the example:
```bash
cp .env.example .env
```
*(If you are only using mock data, you can run the app without connecting to a database)*

## 🏃 Run the Application

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```
The API will be available at `http://localhost:3000`

### Running Tests
The project includes automated API testing using Jest.
```bash
npm test
```

## 📡 API Endpoints

### 1. Get Video Feed
- **Endpoint**: `GET /videos`
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "My first video",
      "url": "/uploads/filename.mp4",
      "authorId": "user_1",
      "createdAt": "2023-10-30T10:00:00.000Z"
    }
  ]
}
```

### 2. Upload a New Video
- **Endpoint**: `POST /upload`
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `title` (String) - Video title
  - `userId` (String) - Author ID (Optional)
  - `video` (File) - The video file

### 3. Log User Action (Data Logging for Analytics)
- **Endpoint**: `POST /action`
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "userId": "user_1",
  "videoId": "1",
  "type": "LIKE" // "VIEW", "LIKE", "SHARE"
}
```

## 🗃️ Project Structure
```text
.
├── .env.example        // Example configuration file
├── .gitignore          // Ignored files for Git
├── README.md           // Project documentation
├── package.json        // Dependencies and scripts
├── tsconfig.json       // TypeScript configuration
├── jest.config.js      // Jest testing configuration
├── uploads/            // (Hidden) Directory for storing uploaded videos
├── prisma/             
│   └── schema.prisma   // Proposed database schema for future use
└── src/
    ├── __tests__/      // Automated test files
    │   └── api.test.ts // API testing logic
    └── index.ts        // Main application code (Routing & Logic)
```

## 🔧 Configuration
| File | Description |
| ---- | ----------- |
| `tsconfig.json` | 📘 TypeScript compiler options |
| `jest.config.js` | 🧪 Jest testing framework configuration |
| `package.json` | 📦 Dependencies, scripts, and project metadata |
| `.env.example` | 🔐 Template for environment variables |

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

**Development Workflow**
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License
This project is licensed under the MIT License.

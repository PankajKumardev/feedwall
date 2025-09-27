# Feed-Wall

A modern feedback collection tool that allows users to create projects and collect valuable feedback from their customers through an embeddable widget.

## Features

- 🔐 **Authentication**: Secure login with email/password and Google OAuth
- 📊 **Project Management**: Create and manage multiple projects
- 💬 **Feedback Collection**: Embeddable widget for collecting customer feedback
- 🤖 **AI-Powered Insights**: Generate AI summaries of feedback using Google's Gemini
- 📈 **Analytics**: View, search, and export feedback data
- 🎨 **Modern UI**: Clean, responsive design with dark mode support
- ⚡ **Rate Limiting**: Built-in protection against abuse

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Google Generative AI (Gemini)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google OAuth credentials (optional)
- Google AI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd feedwall
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/feedwall"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # Google OAuth (optional)
   GOOGLE_ID="your-google-client-id"
   GOOGLE_SECRET="your-google-client-secret"

   # Google AI
   GOOGLE_API_KEY="your-google-ai-api-key"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
feedwall/
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions
│   │   ├── Ai.ts         # AI summary functionality
│   │   ├── createProject.ts
│   │   ├── deleteFeedback.ts
│   │   ├── deleteProject.ts
│   │   ├── getFeedback.ts
│   │   └── getProject.ts
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── feedback/     # Feedback submission
│   │   └── user/         # User data
│   ├── docs/             # Documentation pages
│   ├── feedbacks/        # Feedback management
│   ├── projects/         # Project management
│   └── signin/           # Authentication pages
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   └── ...              # Feature components
├── lib/                 # Utility libraries
│   ├── auth.ts         # Authentication configuration
│   ├── db.ts           # Database connection
│   ├── rate-limit.ts   # Rate limiting utility
│   └── utils.ts        # General utilities
├── prisma/             # Database schema and migrations
└── middleware.ts       # Next.js middleware
```

## Rate Limiting

The application includes built-in rate limiting to prevent abuse:

- **Feedback Submission**: 20 requests per minute per IP
- **Authentication**: 30 requests per minute per IP
- **AI Summaries**: 10 requests per hour per user
- **Project Creation**: 15 requests per hour per user

Rate limits are enforced at the middleware level for API routes and in server actions for user-specific operations.

## API Documentation

### Authentication

#### POST `/api/auth/signin`

Sign in with email/password or Google OAuth.

**Rate Limit**: 10 requests/minute per IP

### Feedback

#### POST `/api/feedback`

Submit feedback for a project.

**Request Body**:

```json
{
  "name": "string",
  "email": "string",
  "feedback": "string",
  "rating": 1-5,
  "projectid": number
}
```

**Rate Limit**: 5 requests/minute per IP

### User

#### GET `/api/user`

Get current user information.

**Rate Limit**: 10 requests/minute per IP

## Widget Integration

### HTML Integration

```html
<body>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { darkMode: 'class' };
  </script>
  <script
    type="module"
    src="https://your-domain.com/feedback-widget.js"
  ></script>
  <feedback-widget projectId="123" websiteName="Your Site"></feedback-widget>
</body>
```

### React Integration

```tsx
import { useEffect } from 'react';

function FeedbackWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://your-domain.com/feedback-widget.js';
    script.type = 'module';
    document.body.appendChild(script);
  }, []);

  return <feedback-widget projectId="123" websiteName="Your Site" />;
}
```

## Database Schema

### Users

- `id`: Primary key
- `email`: Unique email address
- `password`: Hashed password (for email auth)

### Projects

- `id`: Primary key
- `name`: Project name
- `description`: Project description
- `url`: Project URL
- `userId`: Foreign key to Users
- `createdAt`: Creation timestamp

### Feedback

- `id`: Primary key
- `name`: Submitter name
- `email`: Submitter email
- `rating`: 1-5 star rating
- `feedback`: Feedback text
- `projectid`: Foreign key to Projects
- `createdAt`: Submission timestamp

## Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in the Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Start the production server**:

   ```bash
   npm start
   ```

3. **Set up your database** and configure environment variables

## Environment Variables

| Variable          | Description                  | Required |
| ----------------- | ---------------------------- | -------- |
| `DATABASE_URL`    | PostgreSQL connection string | Yes      |
| `NEXTAUTH_SECRET` | Secret for JWT signing       | Yes      |
| `NEXTAUTH_URL`    | Application URL              | Yes      |
| `GOOGLE_ID`       | Google OAuth client ID       | No       |
| `GOOGLE_SECRET`   | Google OAuth client secret   | No       |
| `GOOGLE_API_KEY`  | Google AI API key            | Yes      |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Security

- Rate limiting prevents abuse
- Input validation with Zod schemas
- Secure password hashing with bcrypt
- CORS headers properly configured
- Environment variables for sensitive data

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@feedwall.com or create an issue in the repository.

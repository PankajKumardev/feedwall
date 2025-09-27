# API Documentation

## Overview

Feed-Wall provides a RESTful API for managing projects and collecting feedback. All API endpoints are rate-limited and require proper authentication where applicable.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication

Most endpoints require authentication via NextAuth.js. Include the session cookie in your requests.

## Rate Limiting

All endpoints are protected by rate limiting:

| Endpoint        | Rate Limit  | Window   |
| --------------- | ----------- | -------- |
| `/api/feedback` | 20 requests | 1 minute |
| `/api/auth/*`   | 30 requests | 1 minute |
| `/api/user`     | 30 requests | 1 minute |

Rate limit headers are included in responses:

- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: When the rate limit resets (ISO timestamp)
- `Retry-After`: Seconds to wait before retrying (429 responses)

## Endpoints

### Authentication

#### POST `/api/auth/signin`

Sign in with email/password or initiate OAuth flow.

**Request Body** (Credentials):

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:

```json
{
  "user": {
    "id": "123",
    "email": "user@example.com"
  }
}
```

**Rate Limit**: 30 requests/minute per IP

---

#### POST `/api/auth/signout`

Sign out the current user.

**Response**: `200 OK`

**Rate Limit**: 30 requests/minute per IP

---

### Feedback

#### POST `/api/feedback`

Submit feedback for a project.

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "feedback": "Great product!",
  "rating": 5,
  "projectid": 123
}
```

**Response** (Success):

```json
{
  "message": "Feedback submitted successfully"
}
```

**Response** (Error):

```json
{
  "error": "Invalid feedback data"
}
```

**Status Codes**:

- `200`: Success
- `400`: Invalid data
- `429`: Rate limit exceeded
- `500`: Server error

**Rate Limit**: 20 requests/minute per IP

---

#### OPTIONS `/api/feedback`

Handle CORS preflight requests.

**Response**: `204 No Content`

---

### User

#### GET `/api/user`

Get current user information.

**Headers**:

- `Cookie`: Session cookie (automatic with browser)

**Response** (Success):

```json
{
  "user": {
    "id": "123",
    "email": "user@example.com"
  }
}
```

**Response** (Unauthorized):

```json
{
  "message": "You are not logged in"
}
```

**Status Codes**:

- `200`: Success
- `401`: Unauthorized
- `500`: Server error

**Rate Limit**: 30 requests/minute per IP

---

## Error Responses

### Rate Limit Exceeded (429)

```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 60
}
```

### Validation Error (400)

```json
{
  "error": "Invalid feedback data"
}
```

### Server Error (500)

```json
{
  "error": "Failed to submit feedback"
}
```

## CORS

The API supports CORS for cross-origin requests:

- **Allowed Origins**: `*` (all origins)
- **Allowed Methods**: `GET`, `POST`, `OPTIONS`
- **Allowed Headers**: `Content-Type`, `Authorization`

## Examples

### Submit Feedback (JavaScript)

```javascript
const response = await fetch('/api/feedback', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    feedback: 'Great product!',
    rating: 5,
    projectid: 123,
  }),
});

const data = await response.json();

if (response.status === 429) {
  console.log(`Rate limited. Retry after ${data.retryAfter} seconds`);
} else if (response.ok) {
  console.log('Feedback submitted successfully');
} else {
  console.error('Error:', data.error);
}
```

### Check Rate Limit Status

```javascript
const response = await fetch('/api/feedback', {
  method: 'POST',
  // ... request body
});

const remaining = response.headers.get('X-RateLimit-Remaining');
const resetTime = response.headers.get('X-RateLimit-Reset');

console.log(`Requests remaining: ${remaining}`);
console.log(`Rate limit resets at: ${new Date(resetTime)}`);
```

## Webhooks

Currently, webhooks are not supported. This feature may be added in future versions.

## SDKs

Official SDKs are not yet available. Use the REST API directly or create your own wrapper.

## Support

For API support or questions:

- Create an issue in the repository
- Email: api-support@feedwall.com

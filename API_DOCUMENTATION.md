# API Documentation

## Overview

The application uses Next.js API routes to handle all server-side operations, providing a clean separation between client and server code. All API endpoints are RESTful and return JSON responses.

## Base URL

All API endpoints are prefixed with `/api`

## Authentication

Currently, the API does not require authentication. In production, you would implement proper authentication middleware.

## API Endpoints

### Audiences

#### GET /api/audiences
Get all audiences

**Response:**
```json
{
  "audiences": [
    {
      "id": "uuid",
      "name": "string",
      "ageRange": "string",
      "gender": "string",
      "income": "string",
      "interests": ["string"],
      "location": "string",
      "education": "string",
      "lifestyle": "string",
      "createdAt": "ISO 8601 date"
    }
  ]
}
```

#### POST /api/audiences
Create a new audience

**Request Body:**
```json
{
  "name": "string",
  "ageRange": "string",
  "gender": "string",
  "income": "string",
  "interests": ["string"],
  "location": "string",
  "education": "string",
  "lifestyle": "string"
}
```

**Response:**
```json
{
  "audience": {
    "id": "uuid",
    "name": "string",
    "ageRange": "string",
    "gender": "string",
    "income": "string",
    "interests": ["string"],
    "location": "string",
    "education": "string",
    "lifestyle": "string",
    "createdAt": "ISO 8601 date"
  }
}
```

### Concepts

#### GET /api/concepts
Get all concepts with their associated audiences

**Response:**
```json
{
  "concepts": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "audienceId": "uuid",
      "audience": {
        "id": "uuid",
        "name": "string",
        "ageRange": "string",
        "gender": "string",
        "income": "string",
        "interests": ["string"],
        "location": "string",
        "education": "string",
        "lifestyle": "string",
        "createdAt": "ISO 8601 date"
      },
      "createdAt": "ISO 8601 date",
    }
  ]
}
```

#### POST /api/concepts
Create a new concept

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "audienceId": "uuid",
}
```

**Response:**
```json
{
  "concept": {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "audienceId": "uuid",
    "audience": {
      "id": "uuid",
      "name": "string",
      "ageRange": "string",
      "gender": "string",
      "income": "string",
      "interests": ["string"],
      "location": "string",
      "education": "string",
      "lifestyle": "string",
      "createdAt": "ISO 8601 date"
    },
    "createdAt": "ISO 8601 date",
  }
}
```

### AI Generation

#### POST /api/generate-concept
Generate a marketing concept using AI

**Request Body:**
```json
{
  "audience": {
    "id": "uuid",
    "name": "string",
    "ageRange": "string",
    "gender": "string",
    "income": "string",
    "interests": ["string"],
    "location": "string",
    "education": "string",
    "lifestyle": "string",
    "createdAt": "ISO 8601 date"
  },
}
```

**Response:**
```json
{
  "title": "string",
  "description": "string",
  "isMock": "boolean (optional)"
}
```

## Error Handling

All API endpoints return appropriate HTTP status codes and error messages:

- **200**: Success
- **400**: Bad Request
- **500**: Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message describing what went wrong"
}
```

## Fallback Behavior

When external services (Supabase, OpenAI) are not configured or unavailable:

1. **Database Operations**: Return mock data or empty arrays
2. **AI Generation**: Use pre-generated concept templates
3. **Error Handling**: Graceful degradation with user-friendly messages

## Client-Side API Service

The application includes a client-side API service (`lib/api.ts`) that provides:

- **Type Safety**: Full TypeScript support
- **Error Handling**: Consistent error handling across all endpoints
- **Abstraction**: Clean interface for components to interact with APIs

### Usage Example

```typescript
import { ApiService } from '../lib/api'

// Create an audience
const audience = await ApiService.createAudience({
  name: "Young Professionals",
  ageRange: "25-34",
  // ... other fields
})

// Generate a concept
const conceptData = await ApiService.generateConcept(audience)

// Save the concept
const concept = await ApiService.createConcept({
  ...conceptData,
  audienceId: audience.id,
  audience: audience
})
```

## Database Schema

The API works with the following Supabase tables:

### audiences
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `age_range` (VARCHAR)
- `gender` (VARCHAR)
- `income` (VARCHAR)
- `interests` (TEXT[])
- `location` (VARCHAR)
- `education` (VARCHAR)
- `lifestyle` (VARCHAR)
- `created_at` (TIMESTAMP)

### concepts
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `description` (TEXT)
- `audience_id` (UUID, Foreign Key)
- `created_at` (TIMESTAMP)

## Security Considerations

1. **Environment Variables**: Sensitive data stored in environment variables
2. **Input Validation**: All inputs are validated before processing
3. **SQL Injection**: Protected by Supabase's parameterized queries
4. **CORS**: Configured for same-origin requests only
5. **Rate Limiting**: Should be implemented in production

## Performance Optimizations

1. **Database Indexes**: Proper indexing on frequently queried fields
2. **Connection Pooling**: Handled by Supabase
3. **Caching**: Could be implemented for frequently accessed data
4. **Pagination**: Could be added for large datasets

## Monitoring and Logging

- All API calls are logged to the console
- Error tracking should be implemented in production
- Performance metrics should be monitored

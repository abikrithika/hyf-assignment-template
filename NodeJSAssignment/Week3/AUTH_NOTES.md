# AUTH NOTES

## JWT Authentication

### Login

POST `/api/auth/login`

Request body:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Returns:

```json
{
  "token": "JWT_TOKEN"
}
```

### Usage

Add header:

Authorization: Bearer JWT_TOKEN

Used for:

- DELETE /api/snippets/:id

---

## Database Token Authentication

### Login

POST `/api/auth/login-token`

Request body:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Returns:

```json
{
  "token": "DATABASE_TOKEN"
}
```

### Usage

Add header:

Authorization: Bearer DATABASE_TOKEN

Used for:

- POST /api/snippets

---

## API Key Authentication

### Endpoint

GET `/health`

### Usage

Add header:

x-api-key: myapikey123

Returns:

```json
{
  "status": "ok"
}
```

---

# Reflection

## Which auth mechanism would you choose for a SPA web app with many users?

I would choose JWT authentication because it is scalable and works well with frontend applications and APIs.

## Which auth mechanism would you choose for microservice-to-microservice communication?

I would choose API keys or tokens because machine communication usually does not require user sessions.

## Which auth mechanism would you choose for an internal admin tool?

I would choose session authentication because it is simple and secure for smaller internal systems.

## Why not use the other mechanisms?

Sessions are harder to scale for large frontend applications.  
JWTs are more complex for simple internal tools.  
API keys are not ideal for user authentication because they do not identify individual users securely.

## One security improvement I would make next

I would add token expiration handling, refresh tokens, and rate limiting to improve security.

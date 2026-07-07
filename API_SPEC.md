# Backend API

## Backend

The backend is already implemented using n8n.

Never recreate backend functionality.

---

## Endpoint

POST

http://localhost:5678/webhook/business-agent

---

## Request

```json
{
    "chatInput":"User message"
}
```

---

## Response

```json
{
    "output":"AI response"
}
```

---

Authentication

None

---

Timeout

60 seconds

---

Errors

Handle

400

404

500

Network timeout

Connection refused

Gracefully display friendly messages.

Never crash the application.
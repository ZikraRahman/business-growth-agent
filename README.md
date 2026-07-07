# Business Growth Agent

An AI-powered multi-agent business assistant built using **n8n**, **Next.js**, and **LLMs**. The system helps business owners make better decisions by delegating tasks to specialized AI agents for market research, marketing strategy, and creative content generation.

---

## Features

- Multi-agent AI architecture
- Business query orchestration through a Main Agent
- Market research with live web search
- Marketing strategy generation
- Creative brief and AI image prompt generation
- Conversation memory for improved interactions
- Clean web interface built with Next.js

---

## Architecture

```
User
   │
   ▼
Next.js Frontend
   │
   ▼
Webhook
   │
   ▼
Main Agent
   │
   ├────────────► Market Research Agent
   │                  │
   │                  ▼
   │            SearchAPI + LLM
   │
   └────────────► Marketing Agent
                      │
                      ▼
              Creative Generator
```

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- n8n Workflows
- Webhooks

### AI Models
- Groq (GPT-OSS 120B)

### External Services
- SearchAPI
- Hugging Face FLUX (for image generation)

---

## Project Structure

```
app/
components/
services/
hooks/
lib/
utils/

n8n-workflows/
├── Main Agent.json
├── Marketing Agent.json
├── Market Research Agent.json
└── Creative Generator.json
```

---

## How It Works

1. User submits a business query through the web application.
2. The request is sent to the n8n webhook.
3. The Main Agent understands the request.
4. The appropriate specialist agent is selected.
5. Results are returned to the Main Agent.
6. A final response is sent back to the user.

---

## Running the Project

### 1. Clone the repository

```bash
git clone https://github.com/ZikraRahman/business-growth-agent
cd business-growth-agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5678/webhook/business-agent
```

### 4. Start the frontend

```bash
npm run dev
```

### 5. Configure n8n

Import the workflows from the `n8n-workflows` folder into n8n.

Configure the required credentials:

- Groq API
- SearchAPI
- Hugging Face API (for image generation)

Start n8n and activate the workflows.

---

## Demo

A demonstration video is included with the project submission showing:

- User interaction
- Agent routing
- Market research
- Marketing recommendations
- End-to-end workflow

---

## Notes

This repository contains the application code and exported n8n workflows.

API keys and credentials are **not included** and must be configured locally before running the project.

---

## Author

**Zikra Rahman**

Google x Kaggle AI Agent Capstone Project

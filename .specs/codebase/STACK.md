# Tech Stack

**Analyzed:** 2026-03-31

## Core

- Language: TypeScript ~6.0 (frontend) / ^5.x (backend)
- Package manager: npm (both apps)
- Runtime: Node.js

## Frontend (manager-front — Vite/React, será migrado para Next.js)

- Framework: React 19.2 + Vite 6
- Styling: TailwindCSS v4 (via @tailwindcss/vite plugin)
- State Management: Zustand ^5.0
- Data Fetching: @tanstack/react-query ^5.96
- HTTP Client: Axios ^1.14
- Routing: react-router-dom ^7.13
- Icons: lucide-react ^1.7
- Build: Vite + tsc

## Backend (manager-api — NestJS, mantido)

- Framework: NestJS ^11 (Express adapter)
- Database: DynamoDB (AWS SDK v3 — `@aws-sdk/client-dynamodb`, `@aws-sdk/lib-dynamodb`)
- ORM: Nenhum — interação direta com DynamoDB via DocumentClient
- Deploy: Serverless Framework v4 + AWS Lambda (`@vendia/serverless-express`)
- API Docs: @nestjs/swagger ^11 + swagger-ui-express
- HTTP Client: @nestjs/axios ^4

## Testing

- Unit: Jest ^30 (ambos os projetos)
- E2E: Jest e2e (backend, `test/jest-e2e.json`)
- Frontend: sem framework de teste configurado atualmente

## External Services (estado atual)

- Cloud: AWS (Lambda, DynamoDB, API Gateway via Serverless)
- IaC: serverless.yml (Serverless Framework)

## Development Tools

- Linter: ESLint ^9 (flat config)
- Formatter: Prettier ^3
- Compiler (backend): @swc/core para builds rápidos
- CLI: @nestjs/cli ^11

# Roadmap

**Current Milestone:** M1 — Monorepo Foundation
**Status:** Planning

---

## M1 — Monorepo Foundation

**Goal:** Repositório reestruturado como Turborepo com apps e packages configurados, buildando corretamente.
**Target:** Apps existentes migrados para estrutura `apps/`, packages compartilhados criados, `turbo build` funcional.

### Features

**Turborepo Setup** — PLANNED
- Configurar `turbo.json` com pipelines (build, dev, lint, test)
- Configurar root `package.json` com workspaces
- Criar `packages/tsconfig` com configs base
- Criar `packages/domain` com tipos compartilhados

**Migrar manager-api → apps/api** — PLANNED
- Mover código para `apps/api/`
- Adaptar `package.json` para workspace
- Remover dependências AWS/Serverless

**Migrar manager-front → apps/web (Next.js)** — PLANNED
- Criar novo app Next.js em `apps/web/`
- Migrar componentes e lógica existentes

---

## M2 — Backend Clean Architecture + PostgreSQL

**Goal:** API com Clean Architecture completa, PostgreSQL via TypeORM, rodando no Railway.
**Target:** Todos os endpoints de serviços funcionando com nova arquitetura + banco PostgreSQL.

### Features

**Domain Layer** — PLANNED
- Entidades puras (User, Service)
- Interfaces de repositório (portas)
- Domain exceptions

**Application Layer** — PLANNED
- Use cases para User (CRUD)
- Use cases para Service (CRUD)
- Auth port interface

**Infrastructure Layer** — PLANNED
- TypeORM entities (ORM-entities separadas do domínio)
- TypeORM repositories (implementam portas do domínio)
- NestJS modules conectando tudo
- Controllers + DTOs

**Auth Backend** — PLANNED
- Endpoint POST /auth/login
- Endpoint POST /auth/register
- JWT strategy + AuthGuard
- Proteção dos endpoints existentes

**Migrations & Seeds** — PLANNED
- Migration inicial (users + services tables)
- Seed de dados de exemplo

---

## M3 — Frontend Clean Architecture (Next.js)

**Goal:** App Next.js com Clean Architecture, conectado ao backend, com auth e CRUD completo.
**Target:** Usuário consegue fazer login, gerenciar serviços e usuários.

### Features

**Domain Layer (Frontend)** — PLANNED
- Entidades e repositórios (interfaces)
- Value objects (Email)

**Application Layer (Frontend)** — PLANNED
- Use cases de User e Auth
- Use cases de Service

**Infrastructure Layer (Frontend)** — PLANNED
- HTTP repositories (fetch/axios)
- LocalStorage token adapter
- DI container

**Presentation Layer** — PLANNED
- Páginas: Login, Register
- Páginas: Users (list, create, edit, delete)
- Páginas: Services (list, create, edit, delete)
- Components UI reutilizáveis
- Hooks como cola entre use cases e componentes
- Auth context

---

## M4 — CI/CD & Deploy

**Goal:** Pipeline automatizado com deploy contínuo em Railway e Vercel.
**Target:** Push para main faz deploy automático de api e web.

### Features

**GitHub Actions — API (Railway)** — PLANNED
- Workflow de CI (lint, test, build)
- Workflow de CD (deploy para Railway)
- Execução de migrations pós-deploy

**GitHub Actions — Web (Vercel)** — PLANNED
- Workflow de CI (lint, type-check, build)
- Deploy automático via Vercel CLI ou integração nativa

---

## Future Considerations

- packages/ui — design system compartilhado com Storybook
- RBAC — sistema de roles e permissões
- Refresh token rotation
- Rate limiting na API
- Observabilidade (OpenTelemetry)

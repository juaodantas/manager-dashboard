# Manager Dashboard

Boilerplate production-ready para gerenciamento interno com autenticação JWT, CRUD de usuários e serviços. Base reutilizável com Clean Architecture, monorepo Turborepo e infraestrutura de deploy configurada.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Monorepo | Turborepo + npm workspaces |
| Backend | NestJS 11, TypeORM, PostgreSQL |
| Frontend | Next.js 15 (App Router), TailwindCSS v4, TanStack Query |
| Auth | JWT (passport-jwt) |
| Deploy | Railway (API + Postgres) · Vercel (Web) |
| CI/CD | GitHub Actions |

## Estrutura

```
manager-dashboard/
├── apps/
│   ├── api/          # NestJS — Clean Architecture (domain / application / infrastructure)
│   └── web/          # Next.js — App Router + Clean Architecture
├── packages/
│   ├── domain/       # Entidades e interfaces compartilhadas
│   └── tsconfig/     # Configurações TypeScript base
├── scripts/
│   └── dev-api.sh    # Bootstrap local: Docker → migrations → seed → nest watch
└── docker-compose.yml
```

## Rodando localmente

**Pré-requisitos:** Node 20+, Docker

```bash
# Instalar dependências
npm install

# Subir tudo (Postgres via Docker + API + Web)
npm run dev
```

O script `dev` da API automaticamente:
1. Sobe o container Postgres via Docker Compose
2. Aguarda o banco estar pronto
3. Roda as migrations
4. Roda o seed (admin@example.com / admin123)
5. Inicia o NestJS em modo watch

| App | URL |
|-----|-----|
| Web | http://localhost:3000 |
| API | http://localhost:3001 |
| Swagger | http://localhost:3001/api |

## Scripts disponíveis

```bash
npm run dev      # Desenvolvimento (ambos os apps)
npm run build    # Build de produção
npm run lint     # Lint em todos os workspaces
npm run test     # Testes em todos os workspaces
```

Dentro de `apps/api`:

```bash
npm run migration:generate -- src/migrations/NomeDaMigration
npm run migration:run
npm run migration:revert
npm run seed
```

## Variáveis de ambiente

Copie o exemplo e ajuste conforme necessário:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

O `.env` da API já vem preenchido para o Docker Compose local. Para produção, configure as variáveis no Railway e Vercel.

## Deploy

- **API:** push para `main` dispara o workflow `.github/workflows/deploy-api.yml` (Railway)
- **Web:** push para `main` dispara o workflow `.github/workflows/deploy-web.yml` (Vercel)

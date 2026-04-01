# State

**Last Updated:** 2026-03-31
**Current Phase:** ✅ Concluído — Todas as 4 fases implementadas

---

## Decisions

| Date       | Decision                                          | Rationale                                                                 |
|------------|---------------------------------------------------|---------------------------------------------------------------------------|
| 2026-03-31 | Usar Turborepo para monorepo                      | Tooling padrão para monorepos TypeScript, cache de build, pipelines claras |
| 2026-03-31 | Migrar DynamoDB → PostgreSQL (Railway)            | Simplifica queries relacionais, Railway Postgres elimina AWS overhead      |
| 2026-03-31 | Migrar Serverless/Lambda → Railway                | Deploy mais simples, sem cold start, adequado para boilerplate             |
| 2026-03-31 | Migrar Vite/React → Next.js (App Router)          | SSR, App Router, convenção de roteamento por pasta, ecossistema robusto    |
| 2026-03-31 | Clean Architecture em ambos os apps               | Domínio isolado, testável, fácil de trocar infra                          |
| 2026-03-31 | packages/ui fora do escopo v1                     | Complexidade desnecessária para boilerplate inicial                        |
| 2026-03-31 | JWT stateless (sem refresh token rotation em v1)  | Simplicidade no boilerplate; rotation pode ser adicionada depois           |
| 2026-03-31 | TypeORM entities separadas do domínio             | Princípio de Clean Arch — domínio não conhece o ORM                       |
| 2026-03-31 | Migrations rodam no start da aplicação (não no CI) | CI apenas gera o arquivo de migration para garantir que nenhum PR suba sem a migration correspondente; a execução é feita pelo próprio processo de start via `TypeORM runMigrations()` |
| 2026-03-31 | packages/domain exporta classes com lógica pura   | O critério não é interface vs classe, mas ausência de dependências externas: se um arquivo importa algo fora do próprio pacote, não pertence ao domain. Classes com lógica pura (ex: validação, transformação) são bem-vindas |

---

## Blockers

_Nenhum no momento._

---

## Lessons Learned

| Date       | Lesson                                                                                      |
|------------|---------------------------------------------------------------------------------------------|
| 2026-03-31 | main.ts acoplado ao Lambda impediu desenvolvimento local fácil — separar adapters desde o início |

---

## Todos

- [ ] Confirmar versão do Node.js target para Railway (usar Node 20 LTS)
- [ ] Definir strategy de secrets (Railway env vars + Vercel env vars)
- [ ] Configurar secrets no GitHub Actions: `RAILWAY_TOKEN`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `DATABASE_URL_CI`
- [ ] Executar `npm install --workspaces` após configurar o ambiente

---

## Deferred Ideas

- RBAC (roles e permissões granulares) — pós v1
- packages/ui com Storybook — pós v1
- Refresh token rotation — pós v1
- Rate limiting com @nestjs/throttler — pós v1
- Soft delete para usuários e serviços — pós v1
- OpenTelemetry / observabilidade — pós v1

---

## Preferences

- Respostas concisas, sem sumários desnecessários ao final

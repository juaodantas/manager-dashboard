# Codebase Concerns

**Analyzed:** 2026-03-31

---

## 🔴 CRÍTICO

### C01 — Ausência total de autenticação no backend

**Evidência:** `manager-api/src/main.ts` — sem guards, sem JWT, sem middleware de auth. Todos os endpoints públicos.
**Impacto:** Qualquer pessoa com a URL da API pode criar, editar e deletar serviços.
**Fix:** Implementar JWT guard no NestJS + endpoint de login. Cobrir todos os módulos com `AuthGuard`.

### C02 — main.ts acoplado ao Lambda (sem bootstrap local)

**Evidência:** `manager-api/src/main.ts` — exporta apenas `handler` para Lambda. Sem `bootstrap()` para rodar localmente com `app.listen()`.
**Impacto:** Desenvolver localmente exige `serverless-offline`, adicionando fricção. Migração para Railway requer refactor completo do entry point.
**Fix:** Separar lógica de app bootstrap do adapter Lambda. Criar `main.ts` padrão NestJS e `lambda.ts` como adapter.

---

## 🟡 MODERADO

### C03 — DynamoDB com Scan para todas as queries

**Evidência:** `servicos.repository.ts` linhas 52-99 — `findAll()`, `findByStatus()`, `findByClienteId()` usam `ScanCommand` (full table scan).
**Impacto:** Performance degradará linearmente com crescimento da tabela. Custo AWS aumenta proporcionalmente.
**Fix:** Migração planejada para PostgreSQL elimina este concern.

### C04 — Frontend sem arquitetura de camadas

**Evidência:** `manager-front/src/services/api.ts` — lógica HTTP misturada; hooks como `useServices.ts` contêm lógica de negócio, estado e side-effects juntos.
**Impacto:** Dificulta testes unitários, reuso de lógica e manutenção à medida que o app cresce.
**Fix:** Migração planejada para Clean Architecture no frontend com casos de uso separados.

### C05 — Domínio duplicado entre frontend e backend

**Evidência:** `manager-api/src/servicos/entities/servico.entity.ts` e `manager-front/src/types/service.ts` definem tipos similares independentemente.
**Impacto:** Alterações na entidade precisam ser feitas em dois lugares. Risk de divergência.
**Fix:** Pacote `packages/domain` compartilhado no monorepo Turborepo.

### C06 — Ausência de módulo de usuários

**Evidência:** Nenhum arquivo de user no backend ou frontend.
**Impacto:** Sem gerenciamento de usuários, auth não tem base para funcionar corretamente.
**Fix:** Implementar módulo `users` como parte desta refatoração.

---

## 🟢 BAIXO

### C07 — Vite/React no frontend (target é Next.js)

**Evidência:** `manager-front/package.json` — Vite 6 + React Router.
**Impacto:** SSR, SEO e App Router do Next.js não disponíveis. Migração necessária.
**Fix:** Recriar o frontend como app Next.js na pasta `apps/web/`.

### C08 — Sem configuração de CI/CD

**Evidência:** Sem `.github/workflows/` no repositório.
**Impacto:** Deploy manual, sem validação automatizada em PRs.
**Fix:** GitHub Actions para deploy automático na Vercel (web) e Railway (api).

### C09 — Sem testes no frontend

**Evidência:** `manager-front/package.json` — sem vitest, jest ou testing-library.
**Impacto:** Regressões sem detecção automática.
**Fix:** Configurar Vitest + Testing Library no app Next.js.

### C10 — DTOs agrupados num arquivo único

**Evidência:** `manager-api/src/servicos/dto/dto.ts` — CreateServicoDto e UpdateServicoDto no mesmo arquivo.
**Impacto:** Arquivo crescerá com mais DTOs. Convençao difere do padrão NestJS.
**Fix:** Separar em arquivos individuais na refatoração.

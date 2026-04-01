# Architecture

**Analyzed:** 2026-03-31

## Padrão Atual

Monorepo manual (dois apps sem tooling de monorepo). Cada app segue arquitetura própria sem separação formal de camadas.

---

## Backend (manager-api)

**Padrão:** Modular NestJS flat — Controller → Service → Repository (sem Clean Architecture)

### Camadas Atuais

```
Controller (HTTP) → Service (lógica) → Repository (DynamoDB)
```

- `servicos.controller.ts` — recebe HTTP, delega ao service
- `servicos.service.ts` — lógica de negócio misturada com orquestração
- `servicos.repository.ts` — acessa DynamoDB diretamente (Injectable NestJS)
- `servicos.entity.ts` — interfaces e enums TypeScript puros (sem ORM decorators)

### Entry Point

`main.ts` exporta `handler` (AWS Lambda handler via `@vendia/serverless-express`). Não há `listen()` local — o app só roda como Lambda.

### Módulo

`ServicosModule` registra Controller, Service e Repository no mesmo módulo.

---

## Frontend (manager-front)

**Padrão:** Flat React — Pages → Hooks → Services/API

```
Page Component → Custom Hook → Axios Service → API
```

- `pages/` — componentes de página (Dashboard, Services)
- `hooks/` — lógica de estado e side-effects (useServices, useDashboard)
- `services/` — chamadas HTTP com Axios (api.ts, serviceApi.ts, dashboardApi.ts)
- `components/` — componentes visuais (ui/, shared, ServiceTable, etc.)
- `store/` — Zustand store (serviceStore.ts)
- `types/` — interfaces TypeScript (service.ts, dashboard.ts)
- `utils/` — dados mock (mockData.ts)

### Auth (atual)

Apenas preparação no `api.ts`: interceptor lê `localStorage.getItem('token')` e redireciona para `/login` em 401. Nenhuma página ou lógica de auth implementada.

---

## Fluxo de Dados (atual)

```
Browser → React Router → Page → Hook → Axios → (AWS Lambda) NestJS Controller → Service → DynamoDB
```

---

## Separação de Responsabilidades (lacunas atuais)

| Camada           | Backend (atual)        | Frontend (atual)      |
|------------------|------------------------|-----------------------|
| Domínio          | Interfaces TypeScript  | Types em `types/`     |
| Casos de Uso     | Misturado no Service   | Lógica nos Hooks      |
| Infra/HTTP       | Repository (DynamoDB)  | `services/api.ts`     |
| Apresentação     | Controller NestJS      | Pages + Components    |
| Auth             | Ausente                | Apenas interceptor    |
| Users            | Ausente                | Ausente               |

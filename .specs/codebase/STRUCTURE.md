# Project Structure

**Analyzed:** 2026-03-31
**Root:** `/home/joao/Documentos/personal/manager-dashboard/`

## Directory Tree (atual)

```
manager-dashboard/
├── manager-api/                 ← NestJS backend
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── main.ts              ← Lambda handler
│   │   └── servicos/
│   │       ├── dto/dto.ts
│   │       ├── entities/servico.entity.ts
│   │       ├── servicos.controller.ts
│   │       ├── servicos.module.ts
│   │       ├── servicos.repository.ts
│   │       └── servicos.service.ts
│   ├── test/
│   ├── serverless.yml           ← deploy AWS Lambda
│   ├── nest-cli.json
│   └── package.json
│
└── manager-front/               ← React/Vite frontend
    ├── src/
    │   ├── components/
    │   │   ├── ui/              ← Button, Input, Modal, Select
    │   │   ├── layout/Layout.tsx
    │   │   ├── DashboardStats.tsx
    │   │   ├── ServiceFilters.tsx
    │   │   ├── ServiceForm.tsx
    │   │   └── ServiceTable.tsx
    │   ├── hooks/
    │   │   ├── useDashboard.ts
    │   │   └── useServices.ts
    │   ├── pages/
    │   │   ├── Dashboard.tsx
    │   │   └── Services.tsx
    │   ├── services/
    │   │   ├── api.ts           ← Axios instance + interceptors
    │   │   ├── dashboardApi.ts
    │   │   └── serviceApi.ts
    │   ├── store/
    │   │   └── serviceStore.ts  ← Zustand
    │   ├── types/
    │   │   ├── dashboard.ts
    │   │   └── service.ts
    │   └── utils/
    │       └── mockData.ts
    └── package.json
```

## Onde as Coisas Vivem (atual)

**Entidade Servico:**
- Domínio: `manager-api/src/servicos/entities/servico.entity.ts`
- HTTP: `manager-api/src/servicos/servicos.controller.ts`
- Lógica: `manager-api/src/servicos/servicos.service.ts`
- Persistência: `manager-api/src/servicos/servicos.repository.ts`
- Tipos frontend: `manager-front/src/types/service.ts`
- API client: `manager-front/src/services/serviceApi.ts`

**Auth:**
- Backend: inexistente
- Frontend: interceptor em `manager-front/src/services/api.ts`

**Users:**
- Backend: inexistente
- Frontend: inexistente

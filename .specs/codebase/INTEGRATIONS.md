# External Integrations

**Analyzed:** 2026-03-31

## Cloud / Infraestrutura

**Service:** AWS
**Purpose:** Hosting do backend como serverless function
**Implementation:** `serverless.yml` + `main.ts` (Lambda handler)
**Configuration:** `serverless.yml` define funções, IAM roles, API Gateway
**Authentication:** AWS credentials via ambiente (IAM)

## Banco de Dados

**Service:** AWS DynamoDB
**Purpose:** Persistência dos serviços (tabela `servicos`)
**Implementation:** `manager-api/src/servicos/servicos.repository.ts`
**Configuration:** Env vars `DYNAMO_SERVICOS_TABLE_NAME`, `AWS_REGION`
**Authentication:** AWS SDK credentials implícitas via IAM role Lambda

**Operações usadas:**
- `PutCommand` — criar item
- `GetCommand` — buscar por ID
- `ScanCommand` — listar todos / filtrar
- `UpdateCommand` — atualizar campos
- `DeleteCommand` — deletar item

## API Documentation

**Service:** Swagger UI (swagger-ui-express)
**Purpose:** Documentação interativa da API
**Implementation:** `main.ts` via `SwaggerModule`
**Endpoint:** `/api-docs`

## Deploy (atual)

**Service:** Serverless Framework v4
**Purpose:** Empacotamento e deploy para AWS Lambda
**Config:** `manager-api/serverless.yml`
**Plugins:** `serverless-offline`, `serverless-iam-roles-per-function`

## Frontend → Backend

**HTTP Client:** Axios ^1.14 (instância em `services/api.ts`)
**Base URL:** `VITE_API_URL` (default: `http://localhost:3001/api`)
**Auth:** Bearer token do localStorage em cada request
**Error handling:** Redirect para `/login` em respostas 401

## Integrações Ausentes (target)

- PostgreSQL via TypeORM (substituirá DynamoDB)
- JWT para autenticação
- Railway (substituirá AWS Lambda + DynamoDB)
- Vercel (substituirá deploy manual do frontend)
- GitHub Actions (CI/CD)

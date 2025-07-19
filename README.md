# API de Gerenciamento de Produtos

Uma API REST completa para gerenciamento de produtos, construída com **NestJS**, **Prisma ORM** e **PostgreSQL**, seguindo os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**.

## 🚀 Sobre a Aplicação

Esta aplicação implementa um sistema CRUD completo para produtos, seguindo as melhores práticas de arquitetura de software:

- **Clean Architecture**: Separação clara entre camadas de domínio, aplicação e infraestrutura
- **Domain-Driven Design (DDD)**: Modelagem centrada no domínio de negócio
- **Either Pattern**: Tratamento funcional de erros para cases de uso
- **Repository Pattern**: Abstração da camada de dados
- **Use Cases**: Casos de uso bem definidos para cada operação de negócio
- **Entity-Aggregate Pattern**: Entidades ricas em comportamento

### Principais Tecnologias

- **NestJS** - Framework Node.js para APIs escaláveis e modulares
- **Prisma** - ORM moderno e type-safe para TypeScript
- **PostgreSQL** - Banco de dados relacional robusto
- **TypeScript** - Tipagem estática para maior segurança
- **Zod** - Validação de schemas e dados de entrada
- **Docker Compose** - Containerização para desenvolvimento

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **pnpm** (gerenciador de pacotes)
- **PostgreSQL** (ou Docker para executar via container)
- **Git** (para clonar o repositório)

## ⚙️ Configuração e Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositório>
cd app-api
```

### 2. Instale as dependências
```bash
pnpm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/produtos_db"

# Server
PORT=3333
```

### 4. Inicie o banco de dados (Docker)
```bash
# Inicia o PostgreSQL via Docker Compose
docker-compose up -d
```

### 5. Configure o banco de dados
```bash
# Gerar o Prisma Client
pnpm prisma generate

# Executar migrações
pnpm prisma migrate dev

### 6. Execute a aplicação

#### Desenvolvimento (com hot reload)
```bash
pnpm start:dev
```

#### Produção
```bash
# Compilar o projeto
pnpm build

# Executar versão compilada
pnpm start:prod
```

A API estará disponível em: **http://localhost:3333**

## 📚 APIs Disponíveis

### Base URL
```
http://localhost:3333
```

### 🛍️ **Produtos**

#### 1. **Criar Produto**
- **Método:** `POST`
- **Endpoint:** `/products`
- **Descrição:** Cria um novo produto no sistema com validação de dados

**Body (JSON):**
```json
{
  "name": "Smartphone Samsung Galaxy",
  "price": 1299.99,
  "sku": "SAMSUNG-S24-128GB",
  "description": "Smartphone premium com 128GB de armazenamento"
}
```

**Validações:**
- `name`: String obrigatória (mínimo 1 caractere)
- `price`: Número obrigatório (deve ser positivo)
- `sku`: String obrigatória e única no sistema
- `description`: String opcional

**Resposta de Sucesso (201):**
```json
{
  "success": true
}
```

---

#### 2. **Listar Todos os Produtos**
- **Método:** `GET`
- **Endpoint:** `/products`
- **Descrição:** Retorna todos os produtos cadastrados, ordenados alfabeticamente por nome

**Resposta de Sucesso (200):**
```json
{
  "products": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "iPhone 15 Pro",
      "price": 2499.99,
      "sku": "APPLE-IP15-PRO-256",
      "description": "iPhone 15 Pro com 256GB",
      "createdAt": "2025-07-19T10:30:00.000Z",
      "updatedAt": "2025-07-19T10:30:00.000Z"
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Samsung Galaxy S24",
      "price": 1899.99,
      "sku": "SAMSUNG-S24-128GB",
      "description": "Galaxy S24 com 128GB",
      "createdAt": "2025-07-19T10:35:00.000Z",
      "updatedAt": null
    }
  ]
}
```

---

#### 3. **Buscar Produto por ID**
- **Método:** `GET`
- **Endpoint:** `/products/:id`
- **Descrição:** Retorna um produto específico pelo seu ID único

**Parâmetros:**
- `id` (string): UUID do produto

**Exemplo de URL:**
```
GET /products/550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "product": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "iPhone 15 Pro",
    "price": 2499.99,
    "sku": "APPLE-IP15-PRO-256",
    "description": "iPhone 15 Pro com 256GB",
    "createdAt": "2025-07-19T10:30:00.000Z",
    "updatedAt": "2025-07-19T10:30:00.000Z"
  }
}
```

---

#### 4. **Atualizar Produto**
- **Método:** `PUT`
- **Endpoint:** `/products/:id`
- **Descrição:** Atualiza completamente um produto existente (substitui todos os campos)

**Parâmetros:**
- `id` (string): UUID do produto

**Body (JSON):**
```json
{
  "name": "iPhone 15 Pro Max Atualizado",
  "price": 2699.99,
  "sku": "APPLE-IP15-PRO-MAX-512",
  "description": "iPhone 15 Pro Max com 512GB - Edição Limitada"
}
```

**Exemplo de URL:**
```
PUT /products/550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "success": true
}
```

---

#### 5. **Deletar Produto**
- **Método:** `DELETE`
- **Endpoint:** `/products/:id`
- **Descrição:** Remove um produto do sistema permanentemente

**Parâmetros:**
- `id` (string): UUID do produto

**Exemplo de URL:**
```
DELETE /products/550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "success": true
}
```

---

## 🔍 Validações e Tratamento de Erros

### Campos e Regras de Validação

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| `name` | String | ✅ | Mínimo 1 caractere |
| `price` | Number | ✅ | Deve ser um número válido |
| `sku` | String | ✅ | Mínimo 1 caractere, único no sistema |
| `description` | String | ❌ | Opcional |

### Respostas de Erro

**400 - Bad Request (Validação de Dados):**
```json
{
  "message": "Validation failed",
  "statusCode": 400,
  "errors": [
    {
      "field": "name",
      "message": "String must contain at least 1 character(s)",
      "received": ""
    },
    {
      "field": "price",
      "message": "Expected number, received string",
      "received": "invalid_price"
    }
  ]
}
```

**400 - Bad Request (Recurso não encontrado):**
```json
{
  "message": "Bad Request",
  "statusCode": 400
}
```

**500 - Internal Server Error:**
```json
{
  "message": "Internal server error",
  "statusCode": 500
}
```

## 🧪 Testando a API

### Usando REST Client (VS Code)
A aplicação já inclui um arquivo de testes em `requests/products.http`:

```http
@baseUrl = http://localhost:3333

### Criar produto
POST {{baseUrl}}/products
Content-Type: application/json

{
  "name": "Notebook Dell Inspiron",
  "price": 2899.99,
  "sku": "DELL-INSP-15-512",
  "description": "Notebook Dell Inspiron 15 com 512GB SSD"
}

### Listar todos os produtos
GET {{baseUrl}}/products

### Buscar produto por ID (substitua :id pelo ID real)
GET {{baseUrl}}/products/550e8400-e29b-41d4-a716-446655440000

### Atualizar produto
PUT {{baseUrl}}/products/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "name": "Notebook Dell Inspiron Atualizado",
  "price": 3199.99,
  "sku": "DELL-INSP-15-1TB",
  "description": "Notebook Dell Inspiron 15 com 1TB SSD"
}

### Deletar produto
DELETE {{baseUrl}}/products/550e8400-e29b-41d4-a716-446655440000
```

### Usando cURL

```bash
# Criar produto
curl -X POST http://localhost:3333/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produto Teste",
    "price": 99.99,
    "sku": "TESTE-001",
    "description": "Produto para teste da API"
  }'

# Listar produtos
curl http://localhost:3333/products

# Buscar por ID (substitua pelo ID real)
curl http://localhost:3333/products/550e8400-e29b-41d4-a716-446655440000

# Atualizar produto
curl -X PUT http://localhost:3333/products/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produto Atualizado",
    "price": 149.99,
    "sku": "TESTE-001-UPD",
    "description": "Produto atualizado via cURL"
  }'

# Deletar produto
curl -X DELETE http://localhost:3333/products/550e8400-e29b-41d4-a716-446655440000
```

### Usando Postman ou Insomnia

1. Importe a collection do arquivo `requests/products.http`
2. Configure a variável `baseUrl` como `http://localhost:3333`
3. Execute os testes na ordem: Criar → Listar → Buscar → Atualizar → Deletar

## 🏗️ Arquitetura do Projeto

```
src/
├── core/                           # Funcionalidades base e utilitários
│   ├── entities/                   # Entidades base (Entity, UniqueEntityID)
│   ├── errors/                     # Classes de erro customizadas
│   └── types/                      # Tipos utilitários (Optional, etc.)
├── domain/                         # Camada de domínio (regras de negócio)
│   └── products/
│       ├── application/            # Casos de uso e contratos
│       │   ├── repositories/       # Interfaces dos repositórios
│       │   └── use-cases/          # Casos de uso (Create, Update, etc.)
│       └── enterprise/             # Entidades de negócio
│           └── entities/           # Product entity
└── infra/                          # Camada de infraestrutura
    ├── database/                   # Configuração do banco e repositórios
    │   └── prisma/                 # Implementações Prisma
    ├── env/                        # Configuração de variáveis de ambiente
    ├── http/                       # Controllers e apresentação
    │   ├── controllers/            # Controllers da API
    │   └── presenter/              # Formatação de resposta
    ├── pipes/                      # Pipes de validação (Zod)
    └── main.ts                     # Ponto de entrada da aplicação
```

### Padrões Implementados

- **Entity Pattern**: Entidades ricas com comportamento
- **Repository Pattern**: Abstração da camada de dados
- **Use Case Pattern**: Lógica de negócio isolada
- **Either Pattern**: Tratamento funcional de erros
- **Presenter Pattern**: Formatação de dados para resposta
- **Dependency Injection**: Inversão de dependências via NestJS

## 🛠️ Comandos Úteis

### Desenvolvimento
```bash
# Iniciar em modo desenvolvimento
pnpm start:dev

# Visualizar banco de dados
pnpm prisma studio

# Resetar banco de dados
pnpm prisma migrate reset

# Gerar nova migração
pnpm prisma migrate dev --name nome-da-migracao
```

### Produção
```bash
# Build da aplicação
pnpm build

# Executar em produção
pnpm start:prod
```

### Docker
```bash
# Iniciar serviços (PostgreSQL)
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs do banco
docker-compose logs postgres
```

## 🚀 Próximos Passos

- [ ] **Paginação**: Implementar paginação na listagem de produtos
- [ ] **Filtros**: Adicionar filtros por nome, preço, SKU
- [ ] **Busca**: Sistema de busca textual
- [ ] **Autenticação**: JWT para proteção de rotas
- [ ] **Rate Limiting**: Proteção contra spam
- [ ] **Swagger**: Documentação automática da API
- [ ] **Testes**: Testes unitários e de integração
- [ ] **Logs**: Sistema de logs estruturado
- [ ] **Cache**: Cache Redis para performance
- [ ] **Seed**: Dados iniciais para desenvolvimento

## 🐛 Troubleshooting

### Problemas Comuns

**1. Erro de conexão com banco:**
```bash
# Verifique se o PostgreSQL está rodando
docker-compose ps

# Verifique a URL de conexão no .env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/produtos_db"
```

**2. Prisma Client não gerado:**
```bash
# Regenere o cliente
pnpm prisma generate
```

**3. Porta já em uso:**
```bash
# Mude a porta no .env
PORT=3334
```

## 📄 Licença

Este projeto está sob a licença **UNLICENSED**.

---

**Desenvolvido com ❤️ usando NestJS, Prisma e Clean Architecture**

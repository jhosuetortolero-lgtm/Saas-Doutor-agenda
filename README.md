# 🩺 SaaS Doutor Agenda

Plataforma **SaaS de gestão para clínicas e consultórios**: cadastro de médicos e pacientes, agendamento de consultas, dashboard com métricas e faturamento, autenticação e planos de assinatura.

🔗 **Página do projeto:** https://jhosuetortolero-lgtm.github.io/Saas-Doutor-agenda/

---

## ✨ Funcionalidades

- 🔐 **Autenticação** com e-mail/senha e login social com Google (via [Better Auth](https://www.better-auth.com/))
- 🏥 **Clínicas** — cada usuário cria e gerencia a sua clínica
- 👨‍⚕️ **Médicos** — cadastro, edição e exclusão, com especialidade, dias/horários de atendimento e valor da consulta
- 🧑‍🤝‍🧑 **Pacientes** — cadastro completo (nome, e-mail, telefone, sexo)
- 📅 **Agendamentos** — criação com validação de disponibilidade do médico e listagem em tabela
- 📊 **Dashboard** — faturamento total, número de agendamentos/pacientes/médicos, gráfico diário, top médicos e top especialidades
- 💳 **Assinaturas** — integração com Stripe (planos e portal do cliente)
- 🌗 Interface moderna e responsiva com **shadcn/ui** + **Tailwind CSS**

---

## 🛠️ Tecnologias

| Camada | Stack |
|--------|-------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) + React 19 |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS 4, shadcn/ui, lucide-react |
| Banco de dados | PostgreSQL + [Drizzle ORM](https://orm.drizzle.team/) |
| Autenticação | Better Auth |
| Server Actions | next-safe-action |
| Formulários | react-hook-form + Zod |
| Pagamentos | Stripe |
| Gráficos | Recharts |

---

## 🚀 Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) 20+
- Um banco **PostgreSQL** (Docker, Neon, Supabase, ou o banco embutido PGlite — veja abaixo)

### 1. Instalar dependências

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` é necessário por causa do `react-day-picker@8` com React 19.

### 2. Configurar variáveis de ambiente

Copie o template e preencha os valores:

```bash
cp .env.example .env
```

No mínimo, defina `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` e `NEXT_PUBLIC_APP_URL`.
Google e Stripe são **opcionais** — deixe em branco para usar apenas e-mail/senha.

### 3. Subir um banco de dados

**Opção A — PostgreSQL normal** (ex.: Docker):

```bash
docker run --name doutor-agenda-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

**Opção B — Banco embutido (PGlite), sem Docker:**

```bash
npm install -D @electric-sql/pglite @electric-sql/pglite-socket
npm run db:start   # sobe o banco em 127.0.0.1:5434
# DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5434/postgres"
```

### 4. Criar as tabelas

```bash
npx drizzle-kit push
```

### 5. Iniciar a aplicação

```bash
npm run dev
```

Acesse **http://localhost:3000**, crie uma conta e cadastre sua clínica. 🎉

---

## 📜 Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Ambiente de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servir o build de produção |
| `npm run lint` | Rodar o ESLint |
| `npm run db:start` | Banco local PGlite (porta 5434) |
| `npm run db:push` | Aplicar o schema no banco (Drizzle) |
| `npm run db:studio` | Abrir o Drizzle Studio |

---

## 📁 Estrutura do projeto

```
src/
├── actions/        # Server actions (next-safe-action)
├── app/
│   ├── (protected)/    # Área logada: dashboard, médicos, pacientes, agendamentos, assinatura
│   ├── api/            # Rotas de API (auth, webhook do Stripe)
│   └── authentication/ # Login e cadastro
├── components/ui/  # Componentes shadcn/ui
├── data/           # Consultas/leituras de dados
├── db/             # Schema e conexão do Drizzle
├── helpers/        # Utilidades (ex.: formatação de moeda)
├── hocs/           # with-authentication (guards de sessão/clínica)
└── lib/            # Configuração do Better Auth, Stripe, utils
```

---

## ⚠️ Observações

- A aplicação é **server-side** (server actions, autenticação e banco de dados), por isso **não roda no GitHub Pages**. A página publicada no Pages é apenas a **apresentação** do projeto. Para hospedar o app de verdade, use uma plataforma com backend, como a [Vercel](https://vercel.com/).
- Login com Google e Stripe ficam desativados enquanto as respectivas variáveis estiverem em branco.

---

## 📄 Licença

Projeto de estudo. Sinta-se livre para usar como referência.

# Sistema de Gestão de Expedientes com RBAC 📁💼

O **Sistema de Gestão de Expedientes** é uma plataforma desenvolvida para automatizar todo o ciclo de vida de documentos e processos administrativos. Ele cobre desde a entrada e tramitação até ao despacho e arquivo final. 

O sistema conta com um mecanismo robusto de **Controle de Acesso Baseado em Papéis (RBAC)**, garantindo a integridade, rastreabilidade e confidencialidade de toda a informação através de permissões associadas a perfis específicos.

---

## 🚀 Funcionalidades Principais

### 👤 1. Gestão de Utilizadores e Autenticação
* **Registo e Login:** Acesso seguro para os funcionários do sistema.
* **Sessões Seguras:** Uso de tokens para manter a ligação ativa em segurança.
* **Gestão de Perfis:** Atualização de dados dos utilizadores pelos administradores.

### 🔐 2. Controle de Acesso Baseado em Papéis (RBAC)
* **Perfis Definidos:** Atribuição de papéis específicos (ex: Administrador, Diretor, Técnico, Recepcionista).
* **Permissões Granulares:** Cada perfil só pode ver ou alterar o que for autorizado.
* **Segurança de Dados:** Proteção contra acessos não autorizados a documentos confidenciais.

### 📄 3. Gestão de Expedientes
* **Entrada:** Registo e digitalização de novos documentos e processos.
* **Tramitação:** Envio e movimentação fluida do processo entre departamentos.
* **Despacho:** Inclusão de decisões, assinaturas e pareceres das chefias.
* **Arquivo:** Organização e armazenamento seguro para consulta futura.

### 📊 4. Auditoria e Relatórios
* **Rastreabilidade (Logs):** Histórico completo de "quem fez o quê e quando" em cada documento.
* **Relatórios de Produtividade:** Estatísticas sobre o tempo de resposta de cada processo.
* **Filtros Avançados:** Pesquisa de ações por utilizador, data ou tipo de expediente.

---

## 🛠️ Tecnologias Utilizadas

> *Nota: Substitua as tecnologias abaixo pelas que utilizou no seu projeto.*

* **Backend:** Node.js / Python (FastAPI) / Java (Spring Boot)
* **Frontend:** React / Angular / Vue.js / HTML5 & CSS3
* **Base de Dados:** PostgreSQL / MySQL
* **Autenticação:** JWT (JSON Web Tokens)

---

## 📦 Como Instalar e Executar o Projeto

### Pré-requisitos
Antes de começar, precisa de ter instalado no seu computador:
* Git
* [Inserir dependência principal, ex: Node.js ou Docker]

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com
   cd sistema-gestao-expedientes
   ```

2. **Configurar as variáveis de ambiente:**
   * Crie um ficheiro `.env` na raiz do projeto seguindo o modelo do `.env.example`.
   * Adicione as chaves secretas e dados de conexão da base de dados.

3. **Instalar as dependências:**
   ```bash
   # Exemplo para Node.js
   npm install
   ```

4. **Executar as migrações da base de dados:**
   ```bash
   # Exemplo para executar as tabelas
   npm run db:migrate
   ```

5. **Iniciar o sistema:**
   ```bash
   npm run start:dev
   ```
   O sistema estará disponível no seu navegador em `http://localhost:3000`.

---

## 👥 Autores

* **Seu Nome** - *Desenvolvimento Principal* - [Seu GitHub](https://github.com)

---

## 📄 Licença

Este projeto está sob a licença MIT - consulte o ficheiro [LICENSE](LICENSE) para mais detalhes.

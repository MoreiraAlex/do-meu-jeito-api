# DO MEU JEITO - API

API desenvolvida em Node.js para servir uma aplicação mobile ou frontend web. Ela é responsável por armazenar e gerenciar configurações de mini-jogos criados por usuários, bem como registrar o progresso e os resultados obtidos pelos jogadores nesses jogos.

## Como configurar o ambiente

1. **Clonar o repositório**  
   Clone este repositório para sua máquina local utilizando o comando:
   ```bash
   git clone https://github.com/MoreiraAlex/do-meu-jeito-api.git
   ```

2. **Instalar dependências**  
   Execute o comando abaixo para instalar as dependências do projeto:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**  
   Crie um arquivo .env na raiz do projeto com as seguintes informações:
    ```bash
    CLERK_PUBLISHABLE_KEY=colocar sua chave publica do Clerk
    CLERK_SECRET_KEY=colocar sua chave secreta do Clerk

    DB_USER=colocar seu usuario do cluster do mongoDB
    DB_PASS=colocar sua senha do cluster do mongoDB
    ```

## Rotas da API

### /termo

| Método | Rota                        | Autenticação | Descrição                                      |
|--------|-----------------------------|--------------|------------------------------------------------|
| GET    | /termo                      | ❌           | Lista os jogos                     |
| GET    | /termo/page                 | ❌           | Lista jogos  (por visibilidade pública ou privada)       |
| GET    | /termo/page/:userId         | ✅           | Lista jogos do usuário autenticado            |
| GET    | /termo/:id                  | ✅           | Busca um jogo específico por ID               |
| POST   | /termo                      | ✅           | Cria um novo jogo                        |
| PUT    | /termo/:id                  | ✅           | Atualiza um jogo existente               |
| DELETE | /termo/:id                  | ✅           | Remove um jogo por ID                    |
| POST   | /termo/check-password       | ❌           | Verifica se a senha de um jogo está correta   |

### /userGame

| Método | Rota                | Autenticação | Descrição                                 |
|--------|---------------------|--------------|-------------------------------------------|
| PUT    | /userGame/:id       | ✅           | Atualiza o progresso do usuário no jogo   |

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
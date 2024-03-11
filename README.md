# Instruções para Executar o Projeto "Facilita"

Este é um guia passo a passo para configurar e executar o projeto "Facilita". Certifique-se de seguir estas instruções cuidadosamente para garantir uma configuração correta.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js instalado em seu sistema. Neste caso, a versão específica utilizada é a v20.11.0. Você pode baixar o Node.js no seguinte link:

[Download Node.js v20.11.0](https://nodejs.org/en/download)

## Passos para Executar o Projeto

1. **Clonar o Repositório:**
   Clone o projeto do GitHub no repositório fornecido:

   ```bash
   git clone https://github.com/juliomendes160/Facilita
   ```

2. **Instalar Dependências:**
   Navegue até a pasta onde o projeto foi clonado e acesse a pasta "backend" utilizando o Git Bash. Em seguida, execute o seguinte comando para instalar as dependências:

   ```bash
   cd Facilita/backend
   npm install
   ```

3. **Executar o Servidor:**
   Após a instalação das dependências, execute o seguinte comando para iniciar o servidor Node.js:

   ```bash
   npx ts-node server.ts
   ```

   Isso iniciará o servidor e você poderá acessar a aplicação conforme necessário.


# Download e Configuração do MongoDB v7.0.5

Este guia fornece instruções sobre como baixar e configurar o MongoDB Community Edition. Em seguida, demonstra como criar um banco de dados chamado "facilita" e uma coleção chamada "cliente" no MongoDB.
usando o programa baixado crie a base de dados e a coleção, vão ser vazio nesse primeiro momento mesmo.

## Passos para Download e Instalação

1. Acesse o site oficial do MongoDB para fazer o download do MongoDB Community Edition:

   [Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)

2. Siga as instruções fornecidas no site para baixar a versão apropriada do MongoDB para o seu sistema operacional.

Após configurar o MongoDB e iniciar o servidor Node.js com as rotas fornecidas, você pode usar o Postman para consumir as APIs normalmente. Aqui está um guia sobre como usar o Postman para interagir com as rotas fornecidas pelo servidor Node.js:

# Usando o Postman para consumir a API caso queira pode usar o Front-End Angular Instruçoes Adiante

1. **Abrir o Postman:**
   Inicie o aplicativo Postman em seu sistema.

2. **Criar uma Nova Solicitação:**
   No Postman, clique no botão "New" para criar uma nova solicitação.

3. **Definir o Método e a URL:**
   Selecione o método HTTP adequado para a ação que deseja realizar (POST, GET, PUT, DELETE) e insira a URL base fornecida pelo servidor Node.js. Neste caso, a URL base é `http://localhost:3000/cliente`.

4. **Enviar Solicitações:**
   - Para criar um novo cliente, selecione o método POST e adicione os dados do cliente no corpo da solicitação. Envie a solicitação.
   - Para listar todos os clientes, selecione o método GET e envie a solicitação.
   - Para obter as rotas disponíveis, selecione o método GET e adicione `/rotas` à URL. Envie a solicitação.
   - Para consultar um cliente específico, selecione o método GET e adicione o ID do cliente à URL. Envie a solicitação.
   - Para atualizar um cliente, selecione o método PUT, adicione o ID do cliente à URL e inclua os dados atualizados do cliente no corpo da solicitação. Envie a solicitação.
   - Para excluir um cliente, selecione o método DELETE e adicione o ID do cliente à URL. Envie a solicitação.

5. **Analisar Respostas:**
   Após enviar cada solicitação, analise as respostas retornadas pelo servidor Node.js no Postman. Certifique-se de verificar os códigos de status HTTP e os dados retornados, conforme necessário.

6. **Testar Diferentes Cenários:**
   Experimente diferentes cenários e use as diferentes rotas conforme necessário para interagir com os dados no MongoDB por meio do servidor Node.js.

Certifique-se de que o servidor Node.js esteja em execução e que as rotas estejam configuradas corretamente para garantir o funcionamento adequado das solicitações no Postman.


# Para utilizar o frontend básico que foi fornecido, siga as instruções abaixo: Angular: 17.2.4

1. **Navegar até a Pasta Frontend:**
   Utilize o terminal ou o prompt de comando para navegar até a pasta "frontend" do projeto.

   ```bash
   cd frontend
   ```

2. **Entrar na Pasta do Projeto:**
   Dentro da pasta "frontend", entre na pasta do projeto Angular.

   ```bash
   cd projeto
   ```

3. **Instalar Dependências:**
   Execute o comando abaixo para instalar todas as dependências necessárias para o projeto.

   ```bash
   npm install
   ```

4. **Iniciar o Servidor Angular:**
   Após instalar as dependências, utilize o seguinte comando para subir o servidor de desenvolvimento do Angular.

   ```bash
   npx ng serve
   ```

5. **Acessar a Aplicação:**
   Abra um navegador da web e vá para a rota padrão do Angular:

   [http://localhost:4200/](http://localhost:4200/)

   Você deverá ver a aplicação sendo executada. A partir daqui, você pode interagir com a interface do usuário conforme necessário.

Certifique-se de que o servidor Node.js também esteja em execução para que a aplicação frontend possa se comunicar com ele adequadamente.
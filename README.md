# Registro de cargos Node e React

1. Introdução<br/><br/>
**Backend**<br/>
Inicie o banco de dados utilizando o comando **docker-compose up -d** no seu terminal.<br/>
Instale os pacotes necessários, digitando o comando **npm install** no seu terminal<br/>
Baseado no arquivo .env.example crie um novo arquivo na pasta raiz com o nome .env e preencha as variavéis de ambiente de acordo com o seu ambiente.<br/>
É necessário executar as migrations para que seja criado a estrutura do banco de dados. Para isso basta digitar no terminal o comando **npx sequelize-cli db:migrate** e o serviço estará disponível na porta escolhida.<br/><br/>
**Frontend**<br/>
Instale os pacotes necessários, digitando o comando **yarn** no seu terminal<br/>
Baseado no arquivo .env.example crie um novo arquivo na pasta raiz com o nome .env e preencha as variavéis de ambiente de acordo com o seu ambiente.<br/>

2.Informações sobre as rotas<br/>
A documentação é pelo swagger que pode ser acessado pela rota /api-docs da porta que o serviço está exectando.Exemplo: http://localhost:4000/api-docs
![image](https://user-images.githubusercontent.com/74276580/163738752-16f411e6-d44c-4def-a1ce-8b9b8535121b.png)

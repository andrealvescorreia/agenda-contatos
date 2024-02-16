# Agenda de Contatos MVC

Esta é uma aplicação MVC extremamente simples desenvolvida com o objetivo de permitir que os usuários criem, atualizem e excluam contatos em uma agenda. Cada contato é composto por nome, sobrenome, email e telefone.

Para ter permissão para realizar qualquer alteração na agenda de contatos, o usuário deve criar uma conta com um email e senha.

## Acesso à Aplicação

Caso você queira visualizar a aplicação em funcionamento sem a necessidade de rodar o projeto em sua própria máquina, você pode acessar o [deploy](https://agenda-deploy.onrender.com/) feito no [render.com](https://render.com). Por favor, note que devido ao plano gratuito utilizado, pode ser necessário aguardar alguns segundos enquanto o servidor "acorda", ou até mesmo pode estar fora do ar.

## Aprendizados
Nessa aplicação eu aprendi sobre:
* como estruturar uma aplicação ExpressJS no padrão MVC (Model View Controller) 🏗️
* como salvar sessões de usuários usando cookies httpOnly por meio do express-session 🍪
* como criar páginas HTML com Javascript embutido por meio do EJS 🖥️
* como conectar uma aplicação em Node com o MongoDB por meio do mongoose 🌿
* o uso de midllewares para tratamento de erros ⚙️
* aumentar a segurança da aplicação usando headers HTTP por meio do helmet 🔒
* como criar bundles de código javascript por meio do webpack 📦

## Como rodar
instale as dependencias com ```npm install``` <br>
crie um .env:
```env 
CONNECTIONSTRING=
#ex: CONNECTIONSTRING="mongodb://localhost:27017/meubancodedados"
```

execute o comando ```npx webpack``` para fazer bundle dos arquivos, e por fim
```npm start``` para rodar o servidor na porta 3000. <br>
***
### Contribuição
Se você tem alguma sugestão de melhoria, quer propor uma nova funcionalidade ou encontrou algum problema, sua contribuição é mais que bem-vinda! Sinta-se à vontade para deixar suas sugestões através de issues ou, se preferir, fazer um pull request diretamente.

#### Créditos
Feito durante o curso [Javascript do básico ao avançado](https://www.udemy.com/course/curso-de-javascript-moderno-do-basico-ao-avancado/) ministrado por Luíz Otávio Miranda, disponível na plataforma Udemy.

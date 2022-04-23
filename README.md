# Curso de MongoDB

### Sobre

Queries utilizadas durante o curso: [MongoDB: uma alternativa aos bancos relacionais tradicionais](https://www.alura.com.br/curso-online-mongodb) da plataforma Alura.

### Tecnologias

- MongoDB

### Instalação do projeto

Crie um database em alguma plataforma que suporte o MongoDB. Mais em:

    https://www.mongodb.com/pt-br

Execute os comandos presentes no arquivo especificado:

    queries.js

Caso queira executar queries com base na localização geográfica, realize a importação do arquivo:

    mongoimport --uri mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.hwhbo.mongodb.net/<DATABASE> --collection alunoslocalizacao --jsonArray < alunos_localizacao.json

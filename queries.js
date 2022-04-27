/**
 * um documento é um conjunto de atributos chave-valor (equivalente à um registro do SQL);
 * uma coleção é um conjunto de coleções (equivalente à uma tabela do SQL);
 * um banco de dados é um conjunto de coleções (equivalente à um banco de dados do SQL);
 *
 * os bancos não relacionais podem ser utilizados em situações onde a dinâmica dos dados varia, ou seja,
 * quando atributos podem variar entre os "registros". Por exemplo em um e-commerce que vende produtos diversos,
 * com características distintas (alguns com peso e altura, outros com páginas, outros com tamanhos, etc)
 */

db.alunos.insertOne({
  nome: "Henrique",
  data_nascimento: "1995-05-26",
  sexo: "M",
});

db.alunos.insertOne({
  nome: "Paulo",
  curso: {
    nome: "Análise de Sistemas",
    abrev: "ADS",
  },
  notas: [10.0, 9.5, 6.7],
});

db.alunos.remove({ _id: ObjectId("626084c0f801b96c6508f2a2") });

db.alunos.find();

db.alunos.remove({ _id: ObjectId("626082b5f801b96c6508f2a1") });

db.alunos.insertOne({
  nome: "Paulo",
  curso: {
    nome: "Análise de Sistemas",
    abrev: "ADS",
  },
  habilidades: [
    { nome: "Inglês", nível: "avançado" },
    { nome: "Node", nível: "intermediário" },
    { nome: "Java", nível: "básico" },
  ],
  notas: [10.0, 9.5, 6.7],
});

db.alunos.insertOne({
  nome: "Daniela",
  curso: {
    nome: "Engenharia de Software",
    abrev: "ENG",
  },
  habilidades: [
    { nome: "Inglês", nível: "avançado" },
    { nome: "PHP", nível: "intermediário" },
    { nome: "Node", nível: "intermediário" },
  ],
  notas: [8.5, 10, 10],
});

db.alunos.insertMany([
  {
    nome: "Rodrigo",
    curso: {
      nome: "Engenharia de Software",
      abrev: "ENG",
    },
    habilidades: [
      { nome: "Java", nível: "avançado" },
      { nome: "Node", nível: "intermediário" },
    ],
    notas: [8.5, 7.5, 10],
  },
  {
    nome: "Giovana",
    curso: {
      nome: "Sistemas de Informação",
      abrev: "SIS",
    },
    habilidades: [
      { nome: "CRM", nível: "avançado" },
      { nome: "ERP", nível: "intermediário" },
    ],
    notas: [7.0, 7.5, 8.0],
  },
  {
    nome: "Cristiane",
    curso: {
      nome: "Sistemas de Informação",
      abrev: "SIS",
    },
    habilidades: [
      { nome: "CRM", nível: "básico" },
      { nome: "ERP", nível: "intermediário" },
    ],
    notas: [9.2, 6.0, 10],
  },
]);

db.alunos.find({ nome: "Daniela" });

db.alunos.find({ "habilidades.nome": "Node" });

db.alunos.find({
  "habilidades.nome": "Node",
  "habilidades.nome": "Java",
});

db.alunos.find({
  "habilidades.nome": "Node",
  "curso.abrev": "ENG",
});

// query com OR
db.alunos.find({
  $or: [{ "habilidades.nome": "PHP" }, { "habilidades.nome": "Java" }],
});

// query com OR e AND que não encontre algo
db.alunos.find({
  $or: [{ "habilidades.nome": "PHP" }, { "habilidades.nome": "Java" }],
  "curso.abrev": "SIS",
});

// query com OR e AND que encontre algo
db.alunos.find({
  $or: [{ "habilidades.nome": "PHP" }, { "habilidades.nome": "Java" }],
  "curso.abrev": "ENG",
});

// query com IN
db.alunos.find({
  "habilidades.nome": { $in: ["PHP", "Java"] },
});

// query com ALL (todas as habilidades)
db.alunos.find({
  "habilidades.nome": { $all: ["Node", "Java"] },
});

// query com "nested objects"
db.alunos.find({
  $and: [
    { habilidades: { nome: "Node", nível: "intermediário" } },
    { habilidades: { nome: "Java", nível: "avançado" } },
  ],
});

// query retornando apenas alguns campos (fields)
db.alunos.find(
  {
    $and: [
      { habilidades: { nome: "Node", nível: "intermediário" } },
      { habilidades: { nome: "Java", nível: "avançado" } },
    ],
  },
  { nome: 1, habilidades: 1 }
);

/**
 * um update sem o "SET" pode atualizar o objeto por completo
 * no exemplo abaixo, toda a estrutura é modificada
 */
db.alunos.update(
  { _id: ObjectId("6260828df801b96c6508f2a0") },
  {
    nome: "Henrique",
  }
);

/*
 * query para atualizar apenas um
   (por padrão, o mongodb atualiza apenas uma coleção)
 */
db.alunos.update(
  { _id: ObjectId("6262013df801b96c6508f2a3") },
  {
    $set: {
      "curso.nome": "Análise e Desenvolvimento de Sistemas",
    },
  }
);

db.alunos.update(
  { _id: ObjectId("6262013df801b96c6508f2a3") },
  {
    $set: {
      "curso.nome": "Análise de Sistemas",
    },
  }
);

/**
 * query para atualizar vários
 */
db.alunos.update(
  { "curso.nome": "Análise de Sistemas" },
  {
    $set: {
      "curso.nome": "Análise e Desenvolvimento de Sistemas",
    },
  },
  {
    multi: true,
  }
);

/**
 * query para adicionar nota via update
 */
db.alunos.update(
  { _id: ObjectId("62620145f801b96c6508f2a4") },
  {
    $push: {
      notas: 7.5,
    },
  }
);

/**
 * query para adicionar mais de uma nota
 */
db.alunos.update(
  { _id: ObjectId("62620145f801b96c6508f2a4") },
  {
    $push: {
      notas: { $each: [6, 5.8] },
    },
  }
);

/**
 * query para remover uma nota específica
 */
db.alunos.update(
  { _id: ObjectId("62620145f801b96c6508f2a4") },
  {
    $pull: {
      notas: 6,
    },
  }
);

/**
 * query para buscar alunos com nota maior do que 5
 */
db.alunos.find({
  notas: { $gt: 5 },
});

/**
 * query para apenas um registro
 */
db.alunos.findOne({
  "curso.nome": "Análise e Desenvolvimento de Sistemas",
});

/**
 * query para ordenação por nome
 */
db.alunos.find().sort({ nome: 1 }).limit(2);

/**
 * query para ordenação por nome reverso
 */
db.alunos.find().sort({ nome: -1 });

/**
 * query para atualizar alunos utilizando localização com coordenadas
 * (latitude e longitude)
 */
db.alunoslocalizacao.createIndex({ location: "2dsphere" });

db.alunoslocalizacao.aggregate([
  {
    $geoNear: {
      near: {
        coordinates: [-23.5702415, -46.635375],
        type: "Point",
      },
      distanceField: "distanciatotal",
      spherical: true,
    },
  },
  { $limit: 4 },
  { $skip: 1 },
]);

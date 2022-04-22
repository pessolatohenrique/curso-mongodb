db.alunos.insert({
  nome: "Henrique",
  data_nascimento: "1995-05-26",
  sexo: "M",
});

db.alunos.insert({
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

db.alunos.insert({
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

db.alunos.insert({
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

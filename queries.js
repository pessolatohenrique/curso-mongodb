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

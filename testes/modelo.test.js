const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando recuperação de pergunta', () => {
  modelo.cadastrar_pergunta('O que é um pontinho prata na grama?');
  expect(modelo.get_pergunta(modelo.listar_perguntas()[0].id_pergunta).texto).toBe('O que é um pontinho prata na grama?');
});


test('Testando cadastro de três respostas e duas perguntas', () => {
  modelo.cadastrar_pergunta('Opinião?');
  modelo.cadastrar_pergunta('O que é um pontinho preto no castelo?');
  modelo.cadastrar_resposta(0, 'Gostei');
  modelo.cadastrar_resposta(1, 'Não sei');
  modelo.cadastrar_resposta(1, 'A pimenta do reino!');
  expect(modelo.get_num_respostas(0)).toBe(1);
  expect(modelo.get_num_respostas(1)).toBe(2);
  expect(modelo.get_respostas(0)[0].texto).toBe('Gostei');
  expect(modelo.get_respostas(1)[0].texto).toBe('Não sei');
  expect(modelo.get_respostas(1)[1].texto).toBe('A pimenta do reino!');
});

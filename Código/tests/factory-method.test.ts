import assert from "node:assert/strict";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { AgentePublico, PedidoAcesso, StatusManifestacao } from "../src/dominio.ts";
import {
  DadosRespostaInvalidosError,
  FabricaRespostaDeferida,
  FabricaRespostaIndeferida,
  FabricaRespostaParcial,
} from "../src/fabricas.ts";
import type { DadosResposta } from "../src/fabricas.ts";
import {
  RespostaDeferida,
  RespostaIndeferida,
  RespostaParcialmenteDeferida,
} from "../src/resposta.ts";

const agente = new AgentePublico("Agente de teste", "TESTE-001", "Analista");
const tipos = [
  {
    nome: "deferida", fabrica: new FabricaRespostaDeferida(),
    classe: RespostaDeferida, recurso: false,
    dados: { texto: "Resposta", linkAcesso: "https://example.org/dados", formatoArquivo: "CSV" },
    campos: ["texto", "linkAcesso", "formatoArquivo"],
  },
  {
    nome: "parcial", fabrica: new FabricaRespostaParcial(),
    classe: RespostaParcialmenteDeferida, recurso: true,
    dados: {
      texto: "Resposta", partesOcultadas: "Endereço",
      justificativaRestricao: "Informação pessoal", enquadramentoLGPD: "LAI art. 31",
    },
    campos: ["texto", "partesOcultadas", "justificativaRestricao", "enquadramentoLGPD"],
  },
  {
    nome: "indeferida", fabrica: new FabricaRespostaIndeferida(),
    classe: RespostaIndeferida, recurso: true,
    dados: {
      texto: "Resposta", motivoNegativa: "Restrição didática",
      dispositivoLegalLAI: "Fundamento do cenário", autoridadeRecursal: "Autoridade superior",
    },
    campos: ["texto", "motivoNegativa", "dispositivoLegalLAI", "autoridadeRecursal"],
  },
];

for (const tipo of tipos) {
  test(`${tipo.nome}: cria, vincula e publica a resposta correta`, () => {
    const pedido = new PedidoAcesso("TESTE", "Pedido de teste");
    const resposta = agente.elaborarResposta(pedido, tipo.fabrica, tipo.dados);
    assert.ok(resposta instanceof tipo.classe);
    assert.equal(pedido.resposta, resposta);
    assert.equal(pedido.status, StatusManifestacao.RESPONDIDO);
    assert.equal(resposta.publicada, true);
    assert.equal(resposta.agenteResponsavel, agente.nome);
    assert.equal(resposta.cabeRecurso(), tipo.recurso);
    assert.ok(resposta.dataResposta instanceof Date);
  });

  for (const campo of tipo.campos) {
    for (const valor of [undefined, "", "   "]) {
      test(`${tipo.nome}: rejeita ${campo} com valor ${JSON.stringify(valor)}`, () => {
        const pedido = new PedidoAcesso("TESTE", "Pedido inválido");
        const dados = { ...tipo.dados, [campo]: valor } as DadosResposta;
        assert.throws(
          () => agente.elaborarResposta(pedido, tipo.fabrica, dados),
          DadosRespostaInvalidosError,
        );
        assert.equal(pedido.status, StatusManifestacao.EM_ANALISE);
        assert.equal(pedido.resposta, undefined);
      });
    }
  }
}

test("não sobrescreve uma resposta já vinculada", () => {
  const pedido = new PedidoAcesso("TESTE", "Pedido respondido");
  const dados = tipos[0].dados;
  const resposta = agente.elaborarResposta(pedido, tipos[0].fabrica, dados);
  assert.throws(
    () => agente.elaborarResposta(pedido, tipos[0].fabrica, dados),
    /não está em análise/,
  );
  assert.equal(pedido.resposta, resposta);
  assert.equal(resposta.publicada, true);
});

test("pedido novo não possui resposta", () => {
  const pedido = new PedidoAcesso("NOVO", "Novo pedido");
  assert.equal(pedido.status, StatusManifestacao.EM_ANALISE);
  assert.equal(pedido.resposta, undefined);
});

const entrada = fileURLToPath(new URL("../src/main.ts", import.meta.url));
for (const cenario of ["todos", "deferida", "parcial", "indeferida", "invalida", "--ajuda"]) {
  test(`terminal: aceita ${cenario}`, () => {
    const resultado = spawnSync(
      process.execPath, ["--experimental-transform-types", entrada, cenario],
      { encoding: "utf8" },
    );
    assert.equal(resultado.status, 0, resultado.stderr);
    assert.match(resultado.stdout, /Uso:|concluído com sucesso|quatro cenários passaram/);
  });
}

test("terminal: cenário desconhecido retorna falha", () => {
  const resultado = spawnSync(
    process.execPath, ["--experimental-transform-types", entrada, "inexistente"],
    { encoding: "utf8" },
  );
  assert.equal(resultado.status, 1);
  assert.match(resultado.stderr, /Cenário inválido/);
});

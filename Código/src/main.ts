import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { AgentePublico, PedidoAcesso, StatusManifestacao } from "./dominio.ts";
import {
  DadosRespostaInvalidosError,
  FabricaRespostaDeferida,
  FabricaRespostaIndeferida,
  FabricaRespostaParcial,
} from "./fabricas.ts";
import {
  RespostaDeferida,
  RespostaIndeferida,
  RespostaParcialmenteDeferida,
} from "./resposta.ts";
import type { Resposta } from "./resposta.ts";

const agente = new AgentePublico(
  "Agente de demonstração", "DEMO-001", "Analista do SIC",
);

function verificarEmissao(pedido: PedidoAcesso, resposta: Resposta): void {
  assert.equal(pedido.status, StatusManifestacao.RESPONDIDO);
  assert.equal(pedido.resposta, resposta);
  assert.equal(resposta.publicada, true);
}

export const cenarios = {
  deferida(): void {
    const pedido = new PedidoAcesso(
      "DEMO-001", "Contratos de TI do órgão",
    );
    const resposta = agente.elaborarResposta(
      pedido, new FabricaRespostaDeferida(), {
        texto: "Segue a relação de contratos solicitada.",
        linkAcesso: "https://example.org/contratos.csv",
        formatoArquivo: "CSV",
      },
    );
    assert.ok(resposta instanceof RespostaDeferida);
    verificarEmissao(pedido, resposta);
    console.log("\n[1] RESPOSTA DEFERIDA");
    console.log(`Protocolo: ${pedido.protocolo} | status=${pedido.status}`);
    console.log(resposta.disponibilizarDados());
    console.log(`Publicada em memória: ${resposta.publicada}`);
    console.log(`Cabe recurso no modelo: ${resposta.cabeRecurso()}`);
  },

  parcial(): void {
    const pedido = new PedidoAcesso(
      "DEMO-002", "Folha de pagamento da unidade",
    );
    const resposta = agente.elaborarResposta(
      pedido, new FabricaRespostaParcial(), {
        texto: "Folha fornecida com dados pessoais ocultados.",
        partesOcultadas: "CPF e endereço residencial",
        justificativaRestricao: "Informação pessoal relativa à intimidade",
        enquadramentoLGPD: "LAI art. 31; LGPD art. 6º, III",
      },
    );
    assert.ok(resposta instanceof RespostaParcialmenteDeferida);
    verificarEmissao(pedido, resposta);
    console.log("\n[2] RESPOSTA PARCIALMENTE DEFERIDA");
    console.log(`Protocolo: ${pedido.protocolo} | status=${pedido.status}`);
    console.log(`Partes ocultadas: ${resposta.partesOcultadas}`);
    console.log(`Justificativa: ${resposta.justificativaRestricao}`);
    console.log(`Prazo recursal do modelo: ${resposta.indicarPrazoRecursal()}`);
    console.log(`Publicada em memória: ${resposta.publicada}`);
  },

  indeferida(): void {
    const pedido = new PedidoAcesso(
      "DEMO-003", "Documento com acesso restrito",
    );
    const resposta = agente.elaborarResposta(
      pedido, new FabricaRespostaIndeferida(), {
        texto: "Pedido negado no cenário de demonstração.",
        motivoNegativa: "Informação classificada no cenário",
        dispositivoLegalLAI: "LAI art. 23, VII — hipótese didática",
        autoridadeRecursal: "Autoridade hierarquicamente superior",
      },
    );
    assert.ok(resposta instanceof RespostaIndeferida);
    verificarEmissao(pedido, resposta);
    console.log("\n[3] RESPOSTA INDEFERIDA");
    console.log(`Protocolo: ${pedido.protocolo} | status=${pedido.status}`);
    console.log(`Motivo: ${resposta.motivoNegativa}`);
    console.log(`Recurso: ${resposta.indicarAutoridadeRecursal()}`);
    console.log(`Publicada em memória: ${resposta.publicada}`);
  },

  invalida(): void {
    const pedido = new PedidoAcesso(
      "DEMO-004", "Lista de beneficiários",
    );
    console.log("\n[4] RESPOSTA INCOMPLETA");
    let erroCapturado: unknown;
    try {
      agente.elaborarResposta(pedido, new FabricaRespostaParcial(), {
        texto: "Segue lista.", partesOcultadas: "Endereço",
      });
    } catch (erro) {
      erroCapturado = erro;
    }
    assert.ok(erroCapturado instanceof DadosRespostaInvalidosError);
    assert.equal(pedido.status, StatusManifestacao.EM_ANALISE);
    assert.equal(pedido.resposta, undefined);
    console.log(`Criação bloqueada: ${erroCapturado.message}`);
    console.log(`Protocolo: ${pedido.protocolo} | status=${pedido.status}`);
    console.log("Nenhuma resposta foi vinculada ou publicada.");
  },
};

function executar(argumentos: string[]): void {
  const [escolha = "todos"] = argumentos;
  if (escolha === "--help" || escolha === "--ajuda") {
    console.log("Uso: npm start -- [todos|deferida|parcial|indeferida|invalida]");
    console.log("Sem argumento, executa os quatro cenários.");
    return;
  }
  if (argumentos.length > 1 ||
      !["todos", ...Object.keys(cenarios)].includes(escolha)) {
    console.error(`Cenário inválido: ${argumentos.join(" ")}`);
    console.error("Use: todos, deferida, parcial, indeferida ou invalida.");
    process.exitCode = 1;
    return;
  }
  console.log("Governo Eletrônico — Factory Method");
  console.log("Demonstração local, com dados fictícios e sem acesso a serviços oficiais.");
  if (escolha === "todos") {
    for (const cenario of Object.values(cenarios)) cenario();
    console.log("\nTodos os quatro cenários passaram nas verificações.");
  } else {
    cenarios[escolha as keyof typeof cenarios]();
    console.log("\nCenário concluído com sucesso.");
  }
}

if (process.argv[1] &&
    import.meta.url === pathToFileURL(process.argv[1]).href) {
  executar(process.argv.slice(2));
}

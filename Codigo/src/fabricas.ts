/**
 * Creator e ConcreteCreators do Factory Method da Entrega 03.
 * As regras de preenchimento não substituem análise jurídica ou anonimização.
 */
import type { AgentePublico, PedidoAcesso } from "./dominio.ts";
import {
  RespostaDeferida,
  RespostaIndeferida,
  RespostaParcialmenteDeferida,
} from "./resposta.ts";
import type { Resposta } from "./resposta.ts";

export interface DadosResposta {
  texto: string;
  linkAcesso?: string;
  formatoArquivo?: string;
  partesOcultadas?: string;
  justificativaRestricao?: string;
  enquadramentoLGPD?: string;
  motivoNegativa?: string;
  dispositivoLegalLAI?: string;
  autoridadeRecursal?: string;
}

export class DadosRespostaInvalidosError extends Error {}

function exigir(
  dados: DadosResposta,
  campos: (keyof DadosResposta)[],
  contexto: string,
): void {
  const faltando = campos.filter(
    (campo) => !dados[campo] || String(dados[campo]).trim() === "",
  );
  if (faltando.length > 0) {
    throw new DadosRespostaInvalidosError(
      `${contexto}: campos obrigatórios ausentes → ${faltando.join(", ")}`,
    );
  }
}

export abstract class FabricaResposta {
  emitirResposta(
    pedido: PedidoAcesso,
    agente: AgentePublico,
    dados: DadosResposta,
  ): Resposta {
    exigir(dados, ["texto"], "Resposta");
    const resposta = this.criarResposta(dados, agente);
    pedido.vincularResposta(resposta);
    resposta.publicar();
    return resposta;
  }

  protected abstract criarResposta(
    dados: DadosResposta,
    agente: AgentePublico,
  ): Resposta;
}

export class FabricaRespostaDeferida extends FabricaResposta {
  protected criarResposta(dados: DadosResposta, agente: AgentePublico): Resposta {
    exigir(dados, ["linkAcesso", "formatoArquivo"], "Resposta deferida");
    return new RespostaDeferida(
      dados.texto, agente.nome, dados.linkAcesso!, dados.formatoArquivo!,
    );
  }
}

export class FabricaRespostaParcial extends FabricaResposta {
  protected criarResposta(dados: DadosResposta, agente: AgentePublico): Resposta {
    exigir(
      dados,
      ["partesOcultadas", "justificativaRestricao", "enquadramentoLGPD"],
      "Resposta parcialmente deferida",
    );
    return new RespostaParcialmenteDeferida(
      dados.texto,
      agente.nome,
      dados.partesOcultadas!,
      dados.justificativaRestricao!,
      dados.enquadramentoLGPD!,
    );
  }
}

export class FabricaRespostaIndeferida extends FabricaResposta {
  protected criarResposta(dados: DadosResposta, agente: AgentePublico): Resposta {
    exigir(
      dados,
      ["motivoNegativa", "dispositivoLegalLAI", "autoridadeRecursal"],
      "Resposta indeferida",
    );
    return new RespostaIndeferida(
      dados.texto,
      agente.nome,
      dados.motivoNegativa!,
      dados.dispositivoLegalLAI!,
      dados.autoridadeRecursal!,
    );
  }
}

/**
 * Domínio mínimo de pedidos e agentes.
 * Origem: Factory Method da SubEquipe 03, Entrega 03 do Grupo 05.
 * Referência completa e adaptações: ../README.md.
 */
import type { Resposta } from "./resposta.ts";
import type { DadosResposta, FabricaResposta } from "./fabricas.ts";

export enum StatusManifestacao {
  EM_ELABORACAO = "EM_ELABORACAO",
  PROTOCOLADO = "PROTOCOLADO",
  EM_ANALISE = "EM_ANALISE",
  AGUARDANDO_COMPLEMENTACAO = "AGUARDANDO_COMPLEMENTACAO",
  RESPONDIDO = "RESPONDIDO",
  EM_RECURSO_1 = "EM_RECURSO_1",
  EM_RECURSO_2 = "EM_RECURSO_2",
  ENCERRADO = "ENCERRADO",
  CANCELADO = "CANCELADO",
}

export class PedidoAcesso {
  private _status = StatusManifestacao.EM_ANALISE;
  private _resposta?: Resposta;

  constructor(
    public readonly protocolo: string,
    public readonly descricao: string,
  ) {}

  get status(): StatusManifestacao {
    return this._status;
  }

  get resposta(): Resposta | undefined {
    return this._resposta;
  }

  vincularResposta(resposta: Resposta): void {
    if (this._status !== StatusManifestacao.EM_ANALISE) {
      throw new Error(
        `Pedido ${this.protocolo} não está em análise (status atual: ${this._status}).`,
      );
    }
    this._resposta = resposta;
    this._status = StatusManifestacao.RESPONDIDO;
  }
}

export class AgentePublico {
  constructor(
    public readonly nome: string,
    public readonly matricula: string,
    public readonly cargo: string,
  ) {}

  elaborarResposta(
    pedido: PedidoAcesso,
    fabrica: FabricaResposta,
    dados: DadosResposta,
  ): Resposta {
    return fabrica.emitirResposta(pedido, this, dados);
  }
}

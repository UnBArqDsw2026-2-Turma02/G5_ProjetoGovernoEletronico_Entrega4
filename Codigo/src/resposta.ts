/**
 * Produtos do Factory Method, baseados na Entrega 03.
 * Publicar altera apenas o estado do objeto; não envia documentos à internet.
 */
export const PRAZO_RECURSO_DIAS = 10;

export abstract class Resposta {
  private _publicada = false;
  public readonly dataResposta = new Date();

  constructor(
    public readonly texto: string,
    public readonly agenteResponsavel: string,
  ) {}

  get publicada(): boolean {
    return this._publicada;
  }

  publicar(): void {
    this._publicada = true;
  }

  abstract cabeRecurso(): boolean;
  abstract get tipo(): string;
}

export class RespostaDeferida extends Resposta {
  constructor(
    texto: string,
    agente: string,
    public readonly linkAcesso: string,
    public readonly formatoArquivo: string,
  ) {
    super(texto, agente);
  }

  get tipo(): string {
    return "Deferida";
  }

  cabeRecurso(): boolean {
    return false;
  }

  disponibilizarDados(): string {
    return `Informação disponível em ${this.linkAcesso} (${this.formatoArquivo}).`;
  }
}

export class RespostaParcialmenteDeferida extends Resposta {
  constructor(
    texto: string,
    agente: string,
    public readonly partesOcultadas: string,
    public readonly justificativaRestricao: string,
    public readonly enquadramentoLGPD: string,
  ) {
    super(texto, agente);
  }

  get tipo(): string {
    return "Parcialmente Deferida";
  }

  cabeRecurso(): boolean {
    return true;
  }

  indicarPrazoRecursal(): string {
    return `${PRAZO_RECURSO_DIAS} dias a contar da ciência (LAI art. 15).`;
  }
}

export class RespostaIndeferida extends Resposta {
  constructor(
    texto: string,
    agente: string,
    public readonly motivoNegativa: string,
    public readonly dispositivoLegalLAI: string,
    public readonly autoridadeRecursal: string,
  ) {
    super(texto, agente);
  }

  get tipo(): string {
    return "Indeferida";
  }

  cabeRecurso(): boolean {
    return true;
  }

  indicarAutoridadeRecursal(): string {
    return `${this.autoridadeRecursal} — prazo de ${PRAZO_RECURSO_DIAS} dias (LAI art. 15).`;
  }
}

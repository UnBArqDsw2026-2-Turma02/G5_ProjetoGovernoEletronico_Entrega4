# Código — Governo Eletrônico | Entrega 04

Esta pasta contém a demonstração do **Factory Method** usada no [Documento de Arquitetura](../Entrega_4_DAS.md). O programa simula a emissão de respostas a pedidos de acesso à informação e mostra, no terminal, o que acontece em cada cenário.

Há quatro cenários: resposta deferida, parcialmente deferida, indeferida e rejeição de resposta incompleta. Os dados são fictícios, ficam em memória e não são enviados a serviços governamentais.

## 1. Pré-requisito

Instale o **Node.js 22.18 ou superior**. A versão verificada neste projeto é a **22.23.5**.

Confira no terminal:

```bash
node --version
npm --version
```

Se aparecer `command not found` ou “não é reconhecido”, instale o Node.js pela [página oficial](https://nodejs.org/) e abra novamente o terminal.

**Não é preciso instalar bibliotecas com `npm install`.** O código usa apenas recursos do Node.js. Os scripts utilizam `--experimental-transform-types` para executar TypeScript diretamente, inclusive as enumerações e propriedades declaradas nos construtores.

## 2. Entrar na pasta

Abra o terminal na raiz deste repositório, onde está `Entrega_4_DAS.md`, e execute:

```bash
cd "Código"
```

As aspas ajudam a evitar problemas com o nome da pasta. Os comandos das próximas seções devem ser executados dentro dela.

## 3. Rodar todos os cenários

```bash
npm start
```

O programa executa os quatro cenários em sequência e termina. Não abre uma página no navegador nem fica esperando uma conexão.

No final, deve aparecer:

```text
Todos os quatro cenários passaram nas verificações.
```

### O que cada cenário mostra

| Cenário | O que observar |
| --- | --- |
| Deferida | Pedido passa para `RESPONDIDO`, recebe uma resposta com link e formato e é marcado como publicado em memória |
| Parcial | Exibe partes ocultadas, justificativa e prazo recursal do modelo |
| Indeferida | Exibe motivo da negativa e autoridade recursal |
| Inválida | A fábrica bloqueia a criação por campos ausentes e o pedido continua `EM_ANALISE`, sem resposta |

O endereço `https://example.org/contratos.csv` é ilustrativo. O programa apenas o exibe; não baixa nenhum arquivo.

## 4. Rodar um cenário por vez

```bash
npm start -- deferida
npm start -- parcial
npm start -- indeferida
npm start -- invalida
```

Execute cada linha separadamente. O `--` passa o argumento para o programa.

Para exibir a ajuda:

```bash
npm start -- --ajuda
```

Para repetir os quatro:

```bash
npm start -- todos
```

## 5. Executar diretamente com Node.js

Também é possível rodar sem os scripts do npm:

```bash
node --experimental-transform-types src/main.ts
node --experimental-transform-types src/main.ts parcial
```

O Node.js transforma a sintaxe TypeScript ao executar. Não é gerada uma pasta `dist/`, não é necessário um passo separado de compilação e **essa transformação não faz checagem estática de tipos**.

Pode aparecer um `ExperimentalWarning` sobre a transformação de tipos. É um aviso do Node.js, não uma falha do cenário. Não remova a opção: o código utiliza sintaxe que precisa dela.

## 6. Rodar os testes

```bash
npm test
```

Os testes usam `node:test` e verificam:

- criação dos três tipos de resposta;
- vinculação ao pedido, status e publicação em memória;
- identificação do agente responsável;
- rejeição de campos obrigatórios ausentes, vazios ou contendo somente espaços;
- preservação do pedido quando a criação falha;
- bloqueio de uma segunda vinculação em pedido já respondido;
- seleção de cada cenário pelo terminal;
- código de saída de erro quando o cenário informado não existe.

O resumo deve indicar zero falhas. O cenário `invalida` é bem-sucedido quando a entrada incorreta é rejeitada; isso é diferente de uma falha inesperada do programa.

## 7. Alterar os dados e observar o resultado

1. Abra [`src/main.ts`](src/main.ts).
2. Encontre o cenário desejado no objeto `cenarios`.
3. Modifique texto, descrição ou dados de entrada.
4. Execute novamente o comando correspondente.

Para experimentar a validação, remova `enquadramentoLGPD` dos dados do cenário `parcial`. O programa lançará um erro de campo obrigatório, porque esse cenário espera uma emissão válida. Depois, restaure o campo para voltar ao funcionamento normal.

O cenário `invalida` já captura e verifica esse tipo de rejeição de maneira controlada.

## 8. Organização dos arquivos

```text
Código/
├── README.md
├── package.json
├── src/
│   ├── dominio.ts
│   ├── resposta.ts
│   ├── fabricas.ts
│   └── main.ts
├── tests/
│   └── factory-method.test.ts
└── diagramas/
    ├── 01-pacotes.svg
    ├── 02-classes.svg
    ├── 03-sequencia.svg
    ├── 04-implantacao.svg
    ├── 05-componentes.svg
    ├── 06-camadas.svg
    └── cópias correspondentes em PNG
```

| Arquivo | Responsabilidade |
| --- | --- |
| [`dominio.ts`](src/dominio.ts) | Pedido, agente público e enumeração de status |
| [`resposta.ts`](src/resposta.ts) | Resposta abstrata e três tipos concretos |
| [`fabricas.ts`](src/fabricas.ts) | Processo comum de emissão e regras de cada fábrica |
| [`main.ts`](src/main.ts) | Dados fictícios, cenários, saída e verificações |
| [`factory-method.test.ts`](tests/factory-method.test.ts) | Testes de comportamento e dos comandos de terminal |

## 9. Abrir os diagramas

Os seis diagramas estão inseridos diretamente no [relatório](../Entrega_4_DAS.md) em **SVG**. Por serem vetoriais, os textos e as linhas permanecem nítidos mesmo com zoom. Basta abrir o documento ou clicar nos links abaixo; não é necessário instalar ferramentas de diagramação.

| Diagrama | Imagem vetorial | Alternativa |
| --- | --- | --- |
| Pacotes | [Abrir SVG](diagramas/01-pacotes.svg) | [Abrir PNG](diagramas/01-pacotes.png) |
| Classes | [Abrir SVG](diagramas/02-classes.svg) | [Abrir PNG](diagramas/02-classes.png) |
| Sequência | [Abrir SVG](diagramas/03-sequencia.svg) | [Abrir PNG](diagramas/03-sequencia.png) |
| Implantação | [Abrir SVG](diagramas/04-implantacao.svg) | [Abrir PNG](diagramas/04-implantacao.png) |
| Componentes | [Abrir SVG](diagramas/05-componentes.svg) | [Abrir PNG](diagramas/05-componentes.png) |
| Agrupamentos de responsabilidade | [Abrir SVG](diagramas/06-camadas.svg) | [Abrir PNG](diagramas/06-camadas.png) |

O diagrama de classes apresenta apenas as classes e relações essenciais do Factory Method, para facilitar a compreensão. As versões PNG são alternativas para ferramentas que não exibem SVG. As imagens não são programas executáveis, e `npm start` não as altera.

## 10. Problemas comuns

| Mensagem / situação | Como resolver |
| --- | --- |
| `ENOENT` citando `package.json` | Entre em `Código` antes de executar `npm start` |
| Opção `--experimental-transform-types` desconhecida | Atualize para Node.js 22.18 ou superior |
| `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` | Use o comando completo do README ou `npm start`, sem retirar a opção de transformação |
| `Cenário inválido` | Use `deferida`, `parcial`, `indeferida`, `invalida` ou `todos` |
| O programa termina e não abre navegador | É o comportamento esperado: a demonstração é de terminal |
| Dados somem após executar novamente | Os objetos são criados em memória a cada execução; não existe banco de dados |

## 11. Origem e adaptações

As classes de domínio, produtos e fábricas têm como base o trabalho da **SubEquipe 03 do Grupo 05, Entrega 03**:

- [Relatório do Factory Method](https://github.com/UnBArqDsw2026-2-Turma02/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/docs/Base/Relat%C3%B3rios/1.1.3.SubEquipe_03.md).
- [Código de origem](https://github.com/UnBArqDsw2026-2-Turma02/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_03/tree/main/docs/Base/Relat%C3%B3rios/Artefatos_SubEquipe_03/codigo).

Nesta entrega, os imports foram adaptados para execução direta com Node.js, os cenários podem ser selecionados pelo terminal, os dados de demonstração são fictícios e há testes separados. O núcleo do padrão permanece o mesmo: criar a resposta, vinculá-la ao pedido e marcá-la como publicada.

Trata-se de uma demonstração acadêmica. A validação de preenchimento não comprova adequação jurídica, não anonimiza documentos e não substitui autenticação ou controle de acesso. As informações sobre recursos representam o modelo didático, não uma orientação sobre todos os casos previstos na legislação.

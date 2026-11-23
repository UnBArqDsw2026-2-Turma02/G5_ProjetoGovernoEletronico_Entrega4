---
layout: default
title: Documento de Arquitetura de Software (DAS)
description: Documento de Arquitetura de Software do Grupo 05 para a Entrega 04 da disciplina FGA0208.
---

# Documento de Arquitetura de Software (DAS)

## Grupo 05 — Projeto Governo Eletrônico — Entrega 04

### Identificação do projeto e da equipe

| Informação | Identificação |
| --- | --- |
| Instituição | Universidade de Brasília — UnB |
| Unidade | Faculdade de Ciências e Tecnologias em Engenharia — FCTE |
| Disciplina | Arquitetura e Desenho de Software — FGA0208 |
| Turma / semestre | Turma 02 / 2026.2 |
| Grupo | Grupo 05 |
| Projeto | Governo Eletrônico |
| Tema | Acesso à informação pública, pedidos LAI e serviços digitais |
| Entrega | Entrega 04 — Documento de Arquitetura de Software |

**Integrantes do projeto**

| Integrante | Participação nesta entrega |
| --- | --- |
| André João Cordeiro Gomes | Participante da Entrega 04 |
| Fábio Alessandro Santos Vieira | Integrante do Grupo 05 |
| Isaac Lucas Souza Bezerra | Integrante do Grupo 05 |
| João Paulo Barros | Integrante do Grupo 05 |
| Lorena Ribeiro Martins | Integrante do Grupo 05 |
| Luiz Henrique Pallavicini | Integrante do Grupo 05 |
| Pedro Augusto Ribeiro Faitarone Bessa | Integrante do Grupo 05 |
| Pedro Henrique Martins Silva | Integrante do Grupo 05 |
| Rivadalvio Joaquim da Silva Filho | Integrante do Grupo 05 |
| Tiago Scherrer Tavares de Lyra | Participante da Entrega 04 |

Os integrantes e a composição do Grupo 05 são identificados a partir dos registros das Entregas 01–03 [R1–R3]. A tabela distingue a equipe do projeto dos participantes informados para esta entrega. Ela não atribui contribuições individuais da Entrega 04 aos demais membros.

## Sumário

1. Foco 1: DAS
   - Participantes no Foco 1
   - Metodologia do Foco 1
   - DAS
     1. Introdução
     2. Representação Arquitetural
     3. Metas e Restrições da Arquitetura
     4. Visão de Casos de Uso
     5. Visão Lógica
     6. Visão de Processos
     7. Visão de Implantação
     8. Visão da Implementação
     9. Visão de Dados
     10. Tamanho e Desempenho
     11. Qualidade
   - Vídeo de Demonstração
2. Foco 2: IA Generativa
   - Participantes no Foco 2
   - Metodologia do Foco 2
3. Versionamentos
4. Referências
5. Observações
6. Apresentação

---

# FOCO 1 - DAS

Este relatório apresenta as decisões arquiteturais do projeto, relacionando os modelos das entregas anteriores ao código e às demonstrações realizadas.

Conforme o roteiro da Entrega 04, a modalidade escolhida é **DAS**, com:

- Visão Lógica;
- Visão da Implementação como visão complementar, detalhando a organização do código;
- evidência de funcionalidades em execução;
- pontos de vista individuais sobre lições aprendidas e uso crítico de IA generativa.

## Participantes no Foco 1

| Nome do membro | Participação na Entrega 04 | Evidência |
| --- | --- | --- |
| André João Cordeiro Gomes | Da criação do repositório no GitHub à gravação do vídeo | [Vídeo de demonstração](https://youtu.be/_YWNdGMWvoI) |
| Tiago Scherrer Tavares de Lyra | Desenvolvimento do projeto | [Vídeo de demonstração](https://youtu.be/_YWNdGMWvoI) |


## Metodologia do Foco 1

1. Leitura do roteiro local da Entrega 04 e do modelo Word de Documento de Arquitetura de Software.
2. Consulta ao módulo de Arquitetura de Software da disciplina.
3. Levantamento do contexto e dos artefatos das Entregas 01, 02 e 03.
4. Identificação das demonstrações de padrões da Entrega 03 e de seus limites de integração.
5. Seleção do fluxo de emissão de respostas como recorte demonstrável, por possuir modelagem, código TypeScript e vídeo referenciado na entrega anterior.
6. Consulta aos módulos `dominio.ts`, `resposta.ts`, `fabricas.ts`, `main.ts` e à configuração de execução da demonstração Factory Method.
7. Elaboração das visões e das tabelas de rastreabilidade.
8. Organização da demonstração na pasta [Código](C%C3%B3digo/README.html), com seleção de cenários pelo terminal e testes de comportamento.

O recorte adotado é a emissão de respostas a pedidos de acesso à informação. A escolha permite acompanhar o mesmo fluxo nas classes, nos módulos de código e na execução. Os demais padrões das entregas anteriores são mantidos como contexto, sem presumir que todos já estejam integrados.

## DAS

### Histórico da revisão do DAS

| Data | Versão | Descrição | Autoria / validação |
| --- | --- | --- | --- |
| 22/11/2026 | 0.1 | Verificação do desenvolvimento do projeto | André Gomes e Tiago Scherrer|

### 1. Introdução

Este documento apresenta as visões arquiteturais que ajudam a compreender o fluxo de resposta a pedidos de acesso à informação, em um projeto inspirado no domínio do Informa.BR. Não descreve a arquitetura interna oficial do portal.

#### 1.1 Finalidade

Este Documento apresenta a organização e as decisões significativas do Projeto Governo Eletrônico, com ênfase na emissão de respostas a pedidos de acesso à informação.

#### 1.2 Escopo

O domínio estudado nas entregas anteriores inclui busca pública, pedidos de acesso, respostas dos órgãos e recursos. Este DAS distingue dois níveis:

| Nível | Abrangência | Situação |
| --- | --- | --- |
| Contexto do projeto | Busca pública, pedidos, análise, respostas, acompanhamento e recursos | Modelado e discutido em diferentes artefatos |
| Recorte implementado principal | Emissão de respostas deferidas, parcialmente deferidas e indeferidas | Código TypeScript adaptado da Entrega 03 e disponível nesta entrega |
| Integração de todos os recortes | Uma única aplicação reunindo busca, pedidos, notificações e recursos | Não comprovada pelas fontes consultadas; não assumida neste DAS |

**Incluído no recorte principal:**

- representação mínima de um pedido e de um agente público;
- criação de respostas com Factory Method;
- validação de campos obrigatórios por tipo de resposta;
- vinculação da resposta ao pedido;
- alteração do pedido de `EM_ANALISE` para `RESPONDIDO`;
- marcação da resposta como publicada no objeto em memória;
- rejeição de resposta parcial com dados obrigatórios ausentes.

**Não implementado por esse recorte:**

- autenticação real via GOV.BR;
- banco de dados e persistência durável;
- tramitação oficial de pedidos e recursos;
- consulta real a bases governamentais;
- publicação de documentos em um portal público;
- integração com um provedor real de IA generativa;
- anonimização automática ou validação jurídica das respostas.

#### 1.3 Definições, acrônimos e abreviações

| Termo | Definição neste documento |
| --- | --- |
| DAS | Documento de Arquitetura de Software |
| UML | Unified Modeling Language; notação de modelagem |
| BPMN | Business Process Model and Notation; notação distinta de UML |
| LAI | Lei de Acesso à Informação — Lei nº 12.527/2011 |
| LGPD | Lei Geral de Proteção de Dados Pessoais — Lei nº 13.709/2018 |
| GoF | Gang of Four; referência aos autores do catálogo clássico de padrões de projeto |
| Factory Method | Padrão que define uma operação de criação cuja implementação varia nas subclasses |
| Facade | Padrão que fornece uma interface simplificada para um conjunto de subsistemas |
| Observer | Padrão que permite notificar objetos interessados em mudanças de um sujeito |
| State | Padrão que encapsula comportamentos dependentes de estado |
| Chain of Responsibility | Padrão que organiza possíveis tratadores de uma requisição em cadeia |
| SIG | Softgoal Interdependency Graph, utilizado no NFR Framework |
| Camada | Agrupamento lógico de responsabilidades; não implica uma máquina ou processo separado |
| Pacote lógico | Agrupamento usado para explicar o modelo; não precisa corresponder a uma pasta física existente |
| Publicar | No recorte Factory Method, alterar uma propriedade do objeto; não significa disponibilização real na internet |

#### 1.4 Referências

As referências completas e os endereços consultáveis estão na seção **Referências**, ao final deste relatório.

As fontes principais são as [Entregas 01][R1], [02][R2] e [03][R3], os relatórios de padrões [R4–R6], o [código de origem do Factory Method][R7] e o [modelo de DAS][R9].

A versão utilizada nesta entrega está em [Código](C%C3%B3digo/README.html). Os links dos arquivos e dos diagramas aparecem junto às respectivas visões.

As referências legais [R12–R14] servem para consulta e validação pela equipe; os exemplos de código não constituem interpretação jurídica completa nem comprovação de conformidade.

#### 1.5 Visão geral

O documento apresenta a representação arquitetural, as metas e restrições e as visões de casos de uso, lógica, processos, implantação, implementação e dados. Ao final, discute tamanho, desempenho e qualidade.

A Visão Lógica e a Visão da Implementação recebem maior detalhamento para relacionar a organização das responsabilidades à estrutura do código. As demais visões descrevem o comportamento e o ambiente de execução.

---

### 2. Representação Arquitetural

#### 2.1 Estado observado nas entregas

Os repositórios contêm documentação acadêmica e demonstrações independentes. A existência de diferentes linguagens e interfaces não comprova uma arquitetura de microsserviços.

| Documentação usada | Link |
| --- | --- |
| Artefatos Generalistas, NFR Framework, Engenharia Reversa & Modelagem BPMN | [Entrega 1](https://unbarqdsw2026-2-turma02.github.io/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_01/#/) |
|  Modelagem Estática, Modelagem Dinâmica | [Entrega 2](https://unbarqdsw2026-2-turma02.github.io/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_02/#/) |
|  GoFs Criacionais, GoFs Estruturais, GoFs Comportamentais | [Entrega 3](https://unbarqdsw2026-2-turma02.github.io/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_03/#/Base/Relatórios/1.1.1.SubEquipe_01) |

#### 2.2 Estilo arquitetural adotado

Para o recorte Factory Method, a caracterização mais precisa é uma **aplicação stand-alone de console, organizada em módulos com responsabilidades distintas**.

A decomposição em apresentação/orquestração, coordenação de criação e domínio é usada como interpretação lógica. Não se afirma que exista uma arquitetura em camadas estrita, porque há dependências entre contratos de domínio e de criação.

O Factory Method é um padrão de projeto usado dentro dessa organização. Ele não é, isoladamente, o estilo arquitetural de todo o sistema.

#### 2.3 Visões utilizadas

| Visão | Questão respondida | Representação neste DAS |
| --- | --- | --- |
| Casos de uso | Quais cenários justificam a estrutura? | Cenários de emissão e rejeição de respostas |
| Lógica — principal | Quais responsabilidades e abstrações organizam a solução? | Pacotes conceituais, classes e contratos |
| Processos | Como a execução ocorre? | Sequência síncrona dentro de um processo |
| Implantação | Onde o recorte é executado? | Terminal com Node.js 22.18 ou superior; documentação separada |
| Implementação — principal | Como o modelo corresponde ao código? | Módulos, componentes, dependências e comandos |
| Dados | Onde o estado é mantido? | Objetos em memória, sem persistência durável |


Não são assumidos:

- MVC apenas porque outro recorte utiliza React;
- microsserviços apenas porque existem demonstrações em linguagens diferentes;
- arquitetura distribuída de eventos apenas porque o Observer notifica objetos;
- cliente-servidor no recorte de console apenas porque a documentação está no GitHub Pages.

---

### 3. Metas e Restrições da Arquitetura

#### 3.1 Metas

| Identificador | Meta | Fundamentação | Consequência no recorte |
| --- | --- | --- | --- |
| MA-01 | Reduzir o conhecimento de classes concretas no cliente de domínio | Factory Method e hierarquia de respostas [R6–R7] | `AgentePublico` recebe uma fábrica abstrata |
| MA-02 | Concentrar campos obrigatórios de cada resposta em um ponto | Diferenças entre respostas deferidas, parciais e negativas | Cada fábrica concreta valida seus dados |
| MA-03 | Preservar coerência entre pedido e resposta | Fluxo de emissão do recorte | Vinculação altera o status somente após criação bem-sucedida |
| MA-04 | Explicitar limites de privacidade | Ênfase do projeto e discussões de LAI/LGPD | Não confundir preenchimento de campos com proteção completa de dados |
| MA-05 | Permitir rastrear modelo, código e demonstração | Exigência de evidência da Entrega 04 | Relacionar classes, arquivos e cenários |
| MA-06 | Evitar dependências externas desnecessárias na demonstração | Escopo acadêmico reduzido | Cenários locais sem depender de APIs governamentais |

#### 3.2 Restrições

- Manter o domínio e os artefatos das entregas anteriores como base, explicitando divergências.
- Não afirmar que todas as demonstrações já compõem um produto integrado.
- Não apresentar a autenticação GOV.BR modelada como uma integração pronta.
- Não tratar a enumeração completa de estados como implementação de todas as transições.
- Não confundir o BPMN chamado de “Diagrama de Estado” na Entrega 02 com uma máquina de estados UML. A distinção foi reconhecida no relatório da [Entrega 03](https://unbarqdsw2026-2-turma02.github.io/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_03/#/Base/1.3.IniciativasExtras) [R6, R8].
- Não atribuir à existência de campos legais uma garantia de legalidade, confidencialidade ou anonimização.
- Não apresentar saídas esperadas como resultados executados durante a elaboração deste documento.
- Confirmar responsáveis, datas e evidências da Entrega 04 antes da publicação.

---

### 4. Visão de Casos de Uso

#### 4.1 Realizações de casos de uso

O ator principal é o agente público responsável pela resposta. No programa, suas ações são representadas por chamadas em `main.ts`. O cidadão é interessado no resultado, mas não interage diretamente com a demonstração no terminal.

| Caso de uso | Entrada | Resultado |
| --- | --- | --- |
| UC-01 — Emitir resposta deferida | Texto, link de acesso e formato do arquivo | Resposta deferida vinculada ao pedido e marcada como publicada |
| UC-02 — Emitir resposta parcialmente deferida | Texto, partes ocultadas, justificativa e enquadramento | Resposta parcial vinculada, com indicação da restrição |
| UC-03 — Emitir resposta indeferida | Texto, motivo, dispositivo legal e autoridade recursal | Negativa vinculada, com referência à possibilidade de recurso no modelo |
| UC-04 — Rejeitar resposta incompleta | Dados sem um ou mais campos obrigatórios | Criação bloqueada; pedido permanece em análise |

Nos três caminhos de sucesso, o pedido deve estar em `EM_ANALISE`. A resposta é criada, vinculada ao pedido e marcada como publicada em memória; o status passa para `RESPONDIDO`.

**Fluxo da resposta parcial:**

1. O programa cria um pedido e um agente público.
2. Seleciona `FabricaRespostaParcial`.
3. O agente solicita a emissão com `elaborarResposta()`.
4. A fábrica valida o texto e os campos específicos.
5. Cria `RespostaParcialmenteDeferida`.
6. Vincula a resposta ao pedido.
7. Marca a resposta como publicada e devolve o resultado.
8. O terminal exibe o estado do pedido e as informações da resposta.

**Caminho de erro:** quando faltam os campos exigidos, a fábrica lança `DadosRespostaInvalidosError` antes da vinculação. O pedido continua em análise e sem resposta.

O cenário inválido é um resultado esperado da demonstração: o objetivo é mostrar que uma entrada incompleta não conclui a emissão.

### 5. Visão Lógica

#### 5.1 Visão geral

A solução é dividida em quatro agrupamentos de responsabilidade. Eles representam pacotes lógicos, não quatro pastas diferentes.

| Agrupamento | Responsabilidade | Elementos |
| --- | --- | --- |
| Demonstração | Montar os objetos, selecionar o cenário e exibir resultados | `main.ts` |
| Pedidos e agentes | Representar o pedido, seu estado e o agente | `PedidoAcesso`, `AgentePublico`, `StatusManifestacao` |
| Criação de respostas | Coordenar a emissão e validar os dados de cada tipo | `FabricaResposta`, fábricas concretas, `DadosResposta`, `DadosRespostaInvalidosError` |
| Respostas | Representar o resultado da análise | `Resposta` e suas três subclasses |

**Diagrama de pacotes**

![Visão lógica — diagrama de pacotes](C%C3%B3digo/diagramas/01-pacotes.svg)

[Ampliar imagem vetorial sem perda de qualidade](C%C3%B3digo/diagramas/01-pacotes.svg)

O agente depende da abstração `FabricaResposta`, e não das três classes concretas de resposta. A composição da demonstração continua conhecendo as fábricas concretas, pois é nesse ponto que se escolhe qual delas utilizar.

Há dependências de tipos entre domínio e criação. Por isso, a divisão não deve ser interpretada como uma arquitetura em camadas estritas, sem dependências de retorno.

#### 5.2 Pacotes de design significativos do ponto de vista da arquitetura

##### 5.2.1 Pedidos e agentes

Código: [dominio.ts](C%C3%B3digo/src/dominio.ts).

| Classe ou tipo | Responsabilidade | Elementos relevantes |
| --- | --- | --- |
| `PedidoAcesso` | Guardar o pedido e controlar a vinculação da resposta | Protocolo, descrição, status, resposta e `vincularResposta()` |
| `AgentePublico` | Solicitar a emissão por uma fábrica | Nome, matrícula, cargo e `elaborarResposta()` |
| `StatusManifestacao` | Definir os estados possíveis do domínio | O fluxo executado utiliza principalmente `EM_ANALISE` e `RESPONDIDO` |

`vincularResposta()` recusa a alteração quando o pedido já não está em análise. A enumeração contém outros estados, mas isso não significa que todas as transições do processo administrativo estejam implementadas.

##### 5.2.2 Criação de respostas

Código: [fabricas.ts](C%C3%B3digo/src/fabricas.ts).

| Elemento | Responsabilidade |
| --- | --- |
| `FabricaResposta` | Definir o processo comum de emissão e declarar o método fábrica |
| `FabricaRespostaDeferida` | Validar link e formato e criar a resposta deferida |
| `FabricaRespostaParcial` | Validar partes ocultadas, justificativa e enquadramento e criar a resposta parcial |
| `FabricaRespostaIndeferida` | Validar motivo, dispositivo legal e autoridade e criar a resposta indeferida |
| `DadosResposta` | Reunir os dados de entrada |
| `DadosRespostaInvalidosError` | Indicar campos obrigatórios ausentes ou em branco |

O método `emitirResposta()` executa uma sequência comum: validar o texto, criar a resposta, vinculá-la ao pedido e publicá-la em memória. O método protegido `criarResposta()` concentra o passo que varia em cada subclasse.

##### 5.2.3 Respostas

Código: [resposta.ts](C%C3%B3digo/src/resposta.ts).

| Classe | Papel | Dados e operações |
| --- | --- | --- |
| `Resposta` | Produto abstrato | Texto, agente responsável, data, publicação e contrato `cabeRecurso()` |
| `RespostaDeferida` | Produto concreto | Link, formato e `disponibilizarDados()` |
| `RespostaParcialmenteDeferida` | Produto concreto | Partes ocultadas, justificativa, enquadramento e prazo recursal |
| `RespostaIndeferida` | Produto concreto | Motivo, dispositivo legal e autoridade recursal |

**Diagrama de classes**

![Classes significativas — emissão de respostas](C%C3%B3digo/diagramas/02-classes.svg)

[Ampliar imagem vetorial sem perda de qualidade](C%C3%B3digo/diagramas/02-classes.svg)

O diagrama destaca somente as classes principais e os relacionamentos do Factory Method. Detalhes de atributos e validações permanecem no código, para facilitar a leitura do modelo.

O retorno `false` de `RespostaDeferida.cabeRecurso()` é uma simplificação do programa. Não representa uma conclusão jurídica sobre toda hipótese de contestação de uma resposta.

##### 5.2.4 Rastreabilidade com as entregas anteriores

| Artefato | Relação com o recorte | Limite |
| --- | --- | --- |
| Hierarquia de respostas da Entrega 02 | Base conceitual dos produtos do Factory Method | O código implementa apenas o necessário para os cenários |
| Factory Method da Entrega 03 | Base das classes e da sequência de emissão | Nesta entrega, há execução direta pelo Node.js, seleção de cenários e testes separados |
| State | Também representa comportamentos dependentes do estado do pedido | Não compartilha automaticamente o motor de estados deste código |
| Observer | Mostra componentes reagindo a mudanças no pedido | Não há integração implementada com as respostas geradas aqui |
| Chain of Responsibility | Representa o encaminhamento didático de recursos | O recurso não é iniciado automaticamente por este programa |
| Facade | Organiza a busca pública em diferentes fontes | Não consulta automaticamente os objetos de resposta desta demonstração |

Os recortes anteriores ajudam a compreender o domínio, mas a integração exigiria alinhar contratos, estados e responsabilidades.

### 6. Visão de Processos

O programa executa em um único processo Node.js. As chamadas entre agente, fábrica, pedido e resposta são síncronas. Não há filas de mensagens, tarefas distribuídas ou comunicação de rede nesse fluxo.

**Diagrama de sequência**

![Sequência de emissão de uma resposta parcial](C%C3%B3digo/diagramas/03-sequencia.svg)

[Ampliar imagem vetorial sem perda de qualidade](C%C3%B3digo/diagramas/03-sequencia.svg)

A execução começa pela escolha do cenário, passa pela emissão e termina com a apresentação dos resultados. Sem argumento, os quatro cenários são executados em sequência.

Há dois pontos de rejeição importantes:

- a fábrica impede a criação com campos obrigatórios ausentes;
- o pedido impede a vinculação quando já está respondido.

A publicação ocorre depois da vinculação. Como `publicar()` apenas altera um booleano, o programa não precisa coordenar uma chamada externa. Se a publicação passar a enviar documentos para outro sistema, será necessário definir tratamento de falhas e recuperação.

### 7. Visão de Implantação

#### 7.1 Ambiente de execução

O código é executado no terminal de um computador com Node.js 22.18 ou superior. Não requer servidor HTTP, banco de dados, credenciais ou acesso a serviços governamentais.

**Diagrama de implantação**

![Implantação da demonstração local e da documentação](C%C3%B3digo/diagramas/04-implantacao.svg)

[Ampliar imagem vetorial sem perda de qualidade](C%C3%B3digo/diagramas/04-implantacao.svg)

Os arquivos TypeScript são transformados pelo próprio Node.js durante a execução, por meio da opção `--experimental-transform-types`. Não é gerado um diretório `dist/`.

#### 7.2 Documentação

O relatório pode ser disponibilizado na Wiki ou no GitHub Pages. Essa hospedagem apresenta o conteúdo estático; ela não executa o programa de terminal.

Os diagramas aparecem diretamente neste relatório em **SVG**, formato vetorial que mantém a nitidez de textos e linhas ao ampliar. Cada figura possui um link para visualização ampliada. Cópias em PNG e o passo a passo estão no [guia do código](C%C3%B3digo/README.html#9-abrir-os-diagramas).

### 8. Visão da Implementação

#### 8.1 Visão geral

Todo o código necessário aos cenários está na pasta [Código](C%C3%B3digo/README.html):

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

| Arquivo | Conteúdo | Correspondência no modelo |
| --- | --- | --- |
| [dominio.ts](C%C3%B3digo/src/dominio.ts) | Pedido, agente e status | Pedidos e agentes |
| [resposta.ts](C%C3%B3digo/src/resposta.ts) | Produtos do Factory Method | Respostas |
| [fabricas.ts](C%C3%B3digo/src/fabricas.ts) | Validação e criação | Criação de respostas |
| [main.ts](C%C3%B3digo/src/main.ts) | Cenários e seleção pelo terminal | Demonstração |
| [factory-method.test.ts](C%C3%B3digo/tests/factory-method.test.ts) | Testes de domínio, fábricas e comandos | Verificação dos comportamentos |
| [package.json](C%C3%B3digo/package.json) | Scripts de execução e requisito de Node.js | Configuração do ambiente |

**Diagrama de componentes**

![Visão da implementação — componentes e dependências](C%C3%B3digo/diagramas/05-componentes.svg)

[Ampliar imagem vetorial sem perda de qualidade](C%C3%B3digo/diagramas/05-componentes.svg)

O código adapta a demonstração da Entrega 03. A estrutura do padrão foi mantida; as mudanças locais estão no formato dos imports, na execução direta, nos dados fictícios, na seleção de cenários e nas verificações.

#### 8.2 Camadas

A divisão abaixo organiza responsabilidades. Não corresponde a máquinas diferentes nem impõe uma separação estrita de dependências.

| Agrupamento | Componentes | Responsabilidade |
| --- | --- | --- |
| Apresentação e composição | `main.ts` | Selecionar fábricas e cenários, apresentar resultados |
| Coordenação de criação | `fabricas.ts` | Validar dados e coordenar a emissão |
| Modelo de domínio | `dominio.ts` e `resposta.ts` | Representar pedidos, agentes e respostas |

**Diagrama dos agrupamentos**

![Agrupamentos de responsabilidade do código](C%C3%B3digo/diagramas/06-camadas.svg)

[Ampliar imagem vetorial sem perda de qualidade](C%C3%B3digo/diagramas/06-camadas.svg)

O modelo de domínio utiliza contratos de tipos da criação. A opção `import type` evita uma dependência de valores em execução, mas não elimina o vínculo conceitual entre esses módulos.

##### 8.2.1 Regras de criação

| Resposta | Campos obrigatórios |
| --- | --- |
| Todas | `texto` |
| Deferida | `linkAcesso`, `formatoArquivo` |
| Parcialmente deferida | `partesOcultadas`, `justificativaRestricao`, `enquadramentoLGPD` |
| Indeferida | `motivoNegativa`, `dispositivoLegalLAI`, `autoridadeRecursal` |

A validação rejeita valores ausentes, vazios ou formados apenas por espaços. Ela verifica o preenchimento, não a validade jurídica da informação.

Os construtores e `publicar()` são públicos. Assim, as regras da fábrica protegem o caminho de emissão utilizado pelo programa, mas não equivalem a uma barreira de segurança para todos os possíveis clientes.

##### 8.2.2 Como executar

Na raiz do repositório:

```bash
cd "Código"
npm start
```

Para executar separadamente:

```bash
npm start -- deferida
npm start -- parcial
npm start -- indeferida
npm start -- invalida
```

Não há dependências externas para instalar. O passo a passo completo, os requisitos e a solução de problemas estão no [guia da pasta Código](C%C3%B3digo/README.html).

O Node.js transforma a sintaxe TypeScript ao executar. Esse procedimento não realiza checagem estática de tipos. Os testes verificam os comportamentos em tempo de execução.

##### 8.2.3 Verificações

```bash
npm test
```

| Grupo | Comportamento verificado |
| --- | --- |
| Emissão válida | Produto correto, status `RESPONDIDO`, vinculação e publicação |
| Dados obrigatórios | Rejeição de cada campo exigido quando ausente, vazio ou em branco |
| Consistência | Pedido inválido permanece em análise; uma resposta já vinculada não é sobrescrita |
| Terminal | Execução dos cenários, ajuda e erro para opção desconhecida |

**Verificação em 23/11/2026:** os quatro cenários foram executados com Node.js 22.23.5. O comando `npm test` concluiu 45 testes, sem falhas. A transformação de tipos do Node.js emite um aviso experimental, descrito no README; esse aviso não impediu a execução.

Esses testes não substituem testes de carga, auditoria de segurança ou avaliação de conformidade legal.

### 9. Visão de Dados

Os dados são mantidos em memória e recriados a cada execução. Não existe banco de dados ou persistência entre chamadas do programa.

| Estrutura | Dados | Duração |
| --- | --- | --- |
| `PedidoAcesso` | Protocolo, descrição, status e resposta | Enquanto o objeto existir no processo |
| `AgentePublico` | Nome, matrícula e cargo fictícios | Durante a execução |
| `DadosResposta` | Dados usados pela fábrica | Entrada da emissão |
| `Resposta` e subclasses | Texto, responsável, data, publicação e dados específicos | Durante a execução |

A vinculação é permitida apenas para pedido em análise. Se a criação falhar por falta de campos, o pedido permanece sem resposta. Depois de respondido, o pedido não aceita uma nova vinculação pelo mesmo método.

Uma aplicação persistente precisaria definir armazenamento, controle de acesso, retenção e auditoria. Esses recursos não fazem parte deste recorte.

### 10. Tamanho e Desempenho

#### 10.1 Características do código

- Quatro módulos TypeScript principais.
- Três fábricas concretas e três tipos concretos de resposta.
- Quatro cenários de demonstração.
- Uma suíte de testes em arquivo separado.
- Processamento local, síncrono e sem consultas externas.

A validação percorre uma lista pequena de campos. Esse comportamento não permite estimar a capacidade de uma aplicação com usuários simultâneos, armazenamento e integrações de rede.

#### 10.2 Critérios de avaliação

| Critério | Verificação |
| --- | --- |
| Reprodutibilidade | Executar os comandos do README em uma versão compatível do Node.js |
| Fluxos de sucesso | Conferir produto, vinculação, status e publicação nos três tipos de resposta |
| Entrada inválida | Conferir rejeição e preservação do pedido |
| Falha no comando | Informar cenário inexistente e verificar código de saída diferente de zero |

Não são apresentados números de latência, consumo de memória ou capacidade de atendimento, pois essas medições não integram o escopo desta entrega.

### 11. Qualidade

| Atributo | Contribuição da organização atual | Limite |
| --- | --- | --- |
| Manutenibilidade | Regras de criação separadas por tipo de resposta | Alterações nos contratos compartilhados podem afetar mais de um módulo |
| Extensibilidade | Novos produtos podem receber fábricas próprias | A composição ainda precisa selecionar a nova fábrica |
| Consistência | Criação validada antes da vinculação e bloqueio de pedido já respondido | Não existe transação persistente |
| Testabilidade | Cenários locais sem dependência de API e testes separados | A cobertura não equivale à validação de todo o processo administrativo |
| Privacidade | Respostas parciais exigem campos sobre restrição e enquadramento | Não há anonimização automática nem controle de acesso |
| Rastreabilidade | Relação entre documento, diagramas, código e execução | Não há trilha persistente de operações de negócio |
| Portabilidade | Execução em Node.js sem bibliotecas externas | Requer versão compatível com transformação de TypeScript |

O resultado permite demonstrar a separação de responsabilidades na criação de respostas. Não constitui um sistema oficial de atendimento nem garante, sozinho, segurança ou adequação jurídica.

## Vídeo de Demonstração

**Apresentação da entrega:** [assistir no YouTube](https://youtu.be/_YWNdGMWvoI).

O código pode ser acompanhado em [main.ts](C%C3%B3digo/src/main.ts). O comando `npm start` executa os quatro cenários; os argumentos permitem mostrar cada um separadamente.

| Cenário | O que observar no terminal |
| --- | --- |
| Deferida | `status=RESPONDIDO`, referência aos dados e publicação em memória |
| Parcial | Partes ocultadas, justificativa e prazo recursal do modelo |
| Indeferida | Motivo da negativa e autoridade recursal |
| Inválida | Mensagem de campos ausentes, `status=EM_ANALISE` e ausência de vinculação |

Ao concluir todos os cenários, o programa apresenta:

```text
Todos os quatro cenários passaram nas verificações.
```

O endereço do vídeo foi preservado conforme o registro de participação da equipe. As imagens SVG e as cópias PNG estão na [seção de diagramas do guia do código](C%C3%B3digo/README.html#9-abrir-os-diagramas).

---

# FOCO 2 — IA Generativa

O roteiro da disciplina solicita as lições aprendidas e uma avaliação crítica do uso de IA generativa por cada participante. Esta seção é destinada aos relatos individuais de André João e Tiago, sem atribuir aos demais membros participação nesta entrega.

## Participantes no Foco 2

| Nome do membro | Lições aprendidas | Uso da IA generativa com senso crítico |
| --- | --- | --- |
| André João | Relato individual a registrar pelo integrante | Relato individual a registrar pelo integrante |
| Tiago Scherrer | Aprendi a importância do padrão Factory Method para organizar a criação de objetos, além de compreender melhor a relação entre os diagramas, o código e os testes. | Usei IA generativa para comparar o rascunho do DAS com o modelo da disciplina, como apoio para compreender o código, solucionar problemas de ambiente e executar os testes. Conferi as sugestões com os arquivos e os resultados no terminal, sem aceitar as respostas automaticamente. Com isso, percebi que a IA facilita o desenvolvimento, mas suas sugestões precisam ser verificadas pelo desenvolvedor |

## Metodologia do Foco 2

Cada relato deve relacionar uma atividade realizada, um conceito aprendido e a forma como as sugestões foram avaliadas. Os pontos relevantes incluem a diferença entre padrão de projeto e estilo arquitetural, a correspondência entre modelo e código e os limites da simulação.

O uso de uma ferramenta não substitui a conferência das referências e da execução. Caso o integrante não tenha utilizado IA em determinada atividade, deve registrar isso diretamente.

---

## Versionamentos

|Nome do Membro | Contribuição | Data |
|---|---|---|
| André Gomes |  Criação | 22/11/2026| 
| André Gomes e Tiago Scherrer | Desenvolvimento da entrega 4 | 22/11/2026 | 
| André Gomes e Tiago Scherrer | Adição do tópico DAS e dos subtópicos 1, 2 e 3 | 22/11/2026 |
| André João e Tiago Scherrer | Inclusão das visões arquiteturais e dos diagramas relacionados ao código | 23/11/2026 |
| André João e Tiago Scherrer | Organização dos códigos executáveis, cenários e testes na pasta Código | 23/11/2026 |
| André João e Tiago Scherrer | Documentação dos comandos de execução, referências e revisão do relatório | 23/11/2026 |

---

## Referências

| ID | Referência |
| --- | --- |
| R1 | Grupo 05. [Entrega 01 — Governo Eletrônico][R1]. Contexto, equipe e artefatos iniciais. |
| R2 | Grupo 05. [Entrega 02 — Governo Eletrônico][R2]. Modelagem do domínio e dos fluxos. |
| R3 | Grupo 05. [Entrega 03 — Governo Eletrônico][R3]. Padrões de projeto. |
| R4 | SubEquipe 01. [GoFs comportamentais][R4]. Observer, State e Chain of Responsibility. |
| R5 | SubEquipe 02. [GoF estrutural — Facade][R5]. Organização da busca pública. |
| R6 | SubEquipe 03. [GoF criacional — Factory Method][R6]. Modelagem e emissão de respostas. |
| R7 | SubEquipe 03. [Código do Factory Method da Entrega 03][R7]. Base das classes adaptadas nesta entrega. |
| R8 | SubEquipe 03. [Relatório da Entrega 02][R8]. Hierarquias de classes e fluxo de pedidos. |
| R9 | [Modelo de Documento de Arquitetura de Software][R9], também disponibilizado como anexo. |
| R10 | Orientações da Entrega 04: roteiro da disciplina e imagem com os critérios de avaliação. |
| R11 | [Vídeo da Entrega 04](https://youtu.be/_YWNdGMWvoI), informado pela equipe. |
| R12 | Brasil. [Lei nº 12.527/2011 — Lei de Acesso à Informação][R12]. |
| R13 | Brasil. [Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais][R13]. |
| R14 | Brasil. [Decreto nº 7.724/2012][R14]. |
| R15 | Disciplina Arquitetura e Desenho de Software. [Módulo Arquitetura de Software][R15]. |
| R16 | GAMMA, E.; HELM, R.; JOHNSON, R.; VLISSIDES, J. *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley, 1994. |
| R17 | OMG. [UML 2.5.1][R17]. Referência para a notação dos diagramas. |
| R18 | [Código desta entrega](C%C3%B3digo/README.html), com instruções, fontes, testes e diagramas. |

[R1]: https://github.com/UnBArqDsw2026-2-Turma02/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_01
[R2]: https://github.com/UnBArqDsw2026-2-Turma02/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_02
[R3]: https://github.com/UnBArqDsw2026-2-Turma02/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_03
[R4]: https://github.com/UnBArqDsw2026-2-Turma02/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/docs/Base/Relat%C3%B3rios/1.1.1.SubEquipe_01.md
[R5]: https://github.com/UnBArqDsw2026-2-Turma02/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/docs/Base/Relat%C3%B3rios/1.1.2.SubEquipe_02.md
[R6]: https://github.com/UnBArqDsw2026-2-Turma02/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_03/blob/main/docs/Base/Relat%C3%B3rios/1.1.3.SubEquipe_03.md
[R7]: https://github.com/UnBArqDsw2026-2-Turma02/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_03/tree/main/docs/Base/Relat%C3%B3rios/Artefatos_SubEquipe_03/codigo
[R8]: https://github.com/UnBArqDsw2026-2-Turma02/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_02/blob/main/docs/Base/Relat%C3%B3rios/1.1.3.SubEquipe_03.md
[R9]: https://www.dca.ufrn.br/~anderson/FTP/dca0120/modelodocarquiteturasoftware.doc
[R12]: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm
[R13]: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
[R14]: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/decreto/d7724.htm
[R15]: https://sites.google.com/view/unb-fcte-arqdsw/m%C3%B3dulos/m%C3%B3dulo-arquitetura-de-software?authuser=0
[R17]: https://www.omg.org/spec/UML/2.5.1/

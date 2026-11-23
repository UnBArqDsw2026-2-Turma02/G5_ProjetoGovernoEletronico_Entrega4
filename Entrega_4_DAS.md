# Documento de Arquitetura de Software (DAS)

## Grupo 05 — Projeto Governo Eletrônico — Entrega 04

## Sumário

1) Foco 1: DAS
   - 1.1 Participantes no Foco_01;
   - 1.2 Metodologia do Foco_01;
   - 1.3 DAS
      - Introdução;
      - Representação Arquitetural;
      - Metas e Restrições da Arquitetura;
      - Visão de Casos de Uso;
      - Visão Lógica;
      - Visão de Processos;
      - Visão de Implantação;
      - Visão da Implementação;
      - Visão de Dados;
      - Tamanho e Desempenho;
      - Qualidade;
   - 1.4 Vídeo de Demonstração;
     
2) FOCO_02: IA Generativa;
   - 2.1 Participantes no Foco_02;
   - 2.2 Metodologia do Foco_02;
   - 2.3 Registro crítico de apoio por IA;
3) Versionamentos;
4) Referências;
5) Observações;
6) Apresentação;
7) Checklist para transformar o exemplo em entrega final;

---

# FOCO 1 - DAS

O foco deste relatório é escrever sobre as decisões arquiteturais do projeto, mantendo rastreabilidade com os artefatos anteriores e distinguindo o sistema conceitual das demonstrações realizadas.

Conforme o roteiro da Entrega 04, a modalidade escolhida neste exemplo é **DAS**, com:

- Visão Lógica;
- Visão da Implementação como segunda visão principal;
- evidência de funcionalidades em execução;
- pontos de vista individuais sobre lições aprendidas e uso crítico de IA generativa.

## Participantes no Foco 1

| Nome do membro | Participação na Entrega 04 | Evidência |
| --- | --- | --- |
| André João | Desde a criação do github a gravação de video | [link do Vídeo](https://youtu.be/_YWNdGMWvoI) |
| Tiago Scherrer | Desenvolvimento do Projeto | [link do Vídeo](https://youtu.be/_YWNdGMWvoI)| 


## Metodologia do Foco 1

1. Leitura do roteiro local da Entrega 04 e do modelo Word de Documento de Arquitetura de Software.
2. Consulta ao módulo de Arquitetura de Software da disciplina.
3. Levantamento do contexto e dos artefatos das Entregas 01, 02 e 03.
4. Identificação das demonstrações de padrões da Entrega 03 e de seus limites de integração.
5. Seleção do fluxo de emissão de respostas como recorte demonstrável, por possuir modelagem, código TypeScript e vídeo referenciado na entrega anterior.
6. Consulta aos módulos `dominio.ts`, `resposta.ts`, `fabricas.ts`, `main.ts` e à configuração de execução da demonstração Factory Method.
7. Elaboração das visões e das tabelas de rastreabilidade, sem executar o código nem modificar os repositórios de origem.

## DAS

### Histórico da revisão do DAS

| Data | Versão | Descrição | Autoria / validação |
| --- | --- | --- | --- |
| 22/11/2026 | 0.1 | Verificação do desenvolvimento do projeto | André Gomes e Tiago Scherrer|

### 1. Introdução

Este documento tem como objetivo, mostras as visões arquiteturais necessárias para mostrar como funciona o pedido de acesso a informações do informa.BR.

#### 1.1 Finalidade

Este Documento apresenta a organização e as decisões significativas do Projeto Governo Eletrônico, com ênfase na emissão de respostas a pedidos de acesso à informação.

#### 1.2 Escopo

O domínio estudado nas entregas anteriores inclui busca pública, pedidos de acesso, respostas dos órgãos e recursos. Este DAS distingue dois níveis:

| Nível | Abrangência | Situação |
| --- | --- | --- |
| Contexto do projeto | Busca pública, pedidos, análise, respostas, acompanhamento e recursos | Modelado e discutido em diferentes artefatos |
| Recorte implementado principal | Emissão de respostas deferidas, parcialmente deferidas e indeferidas | Demonstração TypeScript da Entrega 03 |
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

As fontes principais são as Entregas 01, 02 e 03 [R1–R3], os relatórios de padrões [R4–R6], o código Factory Method [R7], o roteiro local [R10] e o modelo Word [R9].

As referências legais [R12–R14] servem para consulta e validação pela equipe; os exemplos de código não constituem interpretação jurídica completa nem comprovação de conformidade.

#### 1.5 Visão geral

O documento apresenta a representação arquitetural, as metas e restrições e as visões de casos de uso, lógica, processos, implantação, implementação e dados. Ao final, discute tamanho, desempenho e qualidade.

A Visão Lógica e a Visão da Implementação recebem maior detalhamento por serem as visões principais deste exemplo. As demais contextualizam o recorte sem assumir funcionalidades inexistentes.

---

### 2. Representação Arquitetural

#### 2.1 Estado observado nas entregas

Os repositórios contém documentação acadêmica e demonstrações independentes. A existência de diferentes linguagens e interfaces não comprova uma arquitetura de microsserviços.

| Documentação usada | Link |
| --- | --- |
| Artefatos Generalistas, NFR Framework, Engenharia Reversa & Modelagem BPMN | [Entrega 1](https://unbarqdsw2026-2-turma02.github.io/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_01/#/) |
|  Modelagem Estática, Modelagem Dinâmica | [Entrega 2](https://unbarqdsw2026-2-turma02.github.io/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_02/#/) |
|  GoFs Criacionais, GoFs Estruturais, GoFs Comportamentais | [Entrega 3](https://unbarqdsw2026-2-turma02.github.io/2026.2-T02-_G5_ProjetoGovernoEletronico_Entrega_03/#/Base/Relatórios/1.1.1.SubEquipe_01) |

#### 2.2 Estilo arquitetural adotado neste exemplo

Para o recorte Factory Method, a caracterização mais precisa é uma **aplicação stand-alone de console, organizada em módulos com responsabilidades distintas**.

A decomposição em apresentação/orquestração, coordenação de criação e domínio é usada como interpretação lógica. Não se afirma que exista uma arquitetura em camadas estrita, porque há dependências entre contratos de domínio e de criação.

O Factory Method é um padrão de projeto usado dentro dessa organização. Ele não é, isoladamente, o estilo arquitetural de todo o sistema.

#### 2.3 Visões utilizadas

| Visão | Questão respondida | Representação neste DAS |
| --- | --- | --- |
| Casos de uso | Quais cenários justificam a estrutura? | Cenários de emissão e rejeição de respostas |
| Lógica — principal | Quais responsabilidades e abstrações organizam a solução? | Pacotes conceituais, classes e contratos |
| Processos | Como a execução ocorre? | Sequência síncrona dentro de um processo |
| Implantação | Onde o recorte é executado? | Computador local com Node.js; documentação separada |
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


## Versionamentos

|Nome do Membro | Contribuição | Data |
|---|---|---|
| André Gomes |  Criação | 22/11/2026| 
| André Gomes e Tiago Scherrer | Desenvolvimento da entrega 4 | 22/11/2026 | 
| André Gomes e Tiago Shcerrer | Adição dos Tópico DAS, e dos subtópicos 1, 2, 3 | 22/11/2026|


# Galbani 2027 × 75LAB · Da geladeira à mesa

Apresentação HTML do **Planejamento Estratégico de Trade Galbani 2027**: distribuição, mix, espaço, giro e governança de execução no varejo alimentar brasileiro. Base: documento *Planejamento Estratégico Galbani 75LAB 2027* (22/10/2026) e o Catálogo de Ativos DPA 2027.

- **Apresentação:** https://projetos.75lab.com.br/galbani-planejamento-2027/
- Apresentadora: Vanessa Morelli, Diretora Comercial 75LAB

## Narrativa

Contexto → tensão → oportunidade → insight → estratégia → solução → execução → mensuração → próximos passos. A abertura e o encerramento usam a mesma ideia: na Itália, Galbani quer dizer confiança; no Brasil, a marca primeiro precisa ser encontrada.

| Tela | Takeaway |
|---|---|
| 00 · Capa | Trailer de abertura e a tese: *ser encontrada antes de ser escolhida*. |
| 01 · Agenda | Seis capítulos em trilha, da geladeira até a mesa (cada um é clicável). |
| 02 · Desafio | O briefing pede giro; o desafio real começa antes: presença. Encontrada → entendida → experimentada → recomprada. |
| 03 · Decupagem | Seis fatos do briefing → problema de cobertura, arquitetura e execução (inclui a verba que soma 110%). |
| 04 · Sabemos × descobrir | Quatro respostas críticas para o kick-off. |
| 05 · Marca | A credencial italiana precisa virar benefício de uso. |
| 06 · Portfólio-base | Quatro SKUs × cinco ocasiões (passe o mouse para ver as conexões). |
| 07 · Mercado | A categoria cresce e se consolida, mas o carrinho encolhe. |
| 08 · Concorrência | Mapa de territórios: o espaço livre é a italianidade prática do dia a dia. |
| 09 · Shopper | Jornada em cinco etapas, com a curva de atrito de hoje e com o bloco. |
| 10 · Tensões | Três tensões e a tensão central. |
| 11 · Tendências | Seis tendências, cada uma com aplicação para Galbani. |
| 12 · Insights | Disponibilidade é comunicação, mais cinco insights. |
| 13 · Pergunta estratégica | “Como podemos…” e o ciclo encontrada → recomprada → aprendizado. |
| 14 · De → para | Animação: SKUs dispersos viram bloco (botões De/Para). |
| 15 · Pilares | Entrar, agrupar, ativar, provar e aprender. |
| 16 · Territórios | Três territórios em arco; o recomendado se abre e vira a tela seguinte. |
| 17 · Reveal | **Da geladeira à mesa**. |
| 18 · Bloco | Vista explodida em CSS 3D (arrastar para girar, controle para abrir camadas). |
| 19 · Ativos | Custo por posição de produto no catálogo DPA e papel por cluster. |
| 20 · Clusters | Âncora, crescimento e cobertura: intensidade por solução. |
| 21 · Verba | 110% recebido → 100% proposto (R$ 300 + 300 + 250 + 150 mil). |
| 22 · Operação | Quatro portões: antes de produzir, antes de ativar, durante e depois. |
| 23 · Codice | Cinco camadas de governança e os guardrails. |
| 24 · Rastreamento 75LAB | One Shot (fotografia da implantação) × On Timing (filme da permanência). |
| 25 · Fluxo | Display → captação → transmissão → plataforma → dados → insights → decisão. |
| 26 · KPIs | Quatro camadas; resultado real × resultado esperado. |
| 27 · Pré-mortem | Seis riscos e a trava de cada um. |
| 28 · Benefícios | Shopper, marca, varejo, comercial, operação e dados conectados. |
| 29 · Entregáveis | Seis frentes e must / should / could have. |
| 30 · Cronograma | Doze semanas, marcos de aprovação e escala em ondas. |
| 31 · Próximo passo | Workshop de 90 minutos para fechar seis decisões. |
| 32 · Encerramento | Volta ao insight da abertura. |
| 33 · Contatos | 75LAB, Vanessa Morelli e a marca do cliente. |
| A1 · Fontes | Fontes e nota metodológica (menu `M`). |

## Navegação

`→` `↓` `PageDown` `espaço` avançam e `←` `↑` `PageUp` voltam. Clicar na lateral direita (10% da largura) avança e na esquerda volta. Também funcionam roda do mouse, deslizar no tablet, as setas do cabeçalho e os marcos de capítulo na régua de progresso. `Home`/`End`, `M` índice, `N` notas da apresentadora, `F` tela cheia, `Esc` fecha. Deep link: `#s17`, `#a1`. Toda imagem amplia em lightbox (`Esc`, clique fora ou `×` fecham; setas navegam na galeria).

O trailer de abertura roda uma vez por sessão do navegador; qualquer tecla ou clique pula. Até 820 px de largura (e em tablet em retrato) a apresentação vira rolagem vertical. Com `prefers-reduced-motion`, as animações viram transições curtas.

QA: `?desktop` força o modo apresentação, `&ar=2.2` simula outra proporção, `?static` mostra cada tela no estado final e `?solo=s6` (no celular) mostra só uma tela.

## Arquitetura

HTML, CSS e JavaScript puros, sem build e sem dependências (fontes do Google Fonts). O palco tem 900 de altura e acompanha a proporção da janela (1600 a 2100 de largura), sem faixas vazias. As transições imitam papel: entre páginas claras a nova folha desliza por cima da anterior; páginas de outra cor (vermelho, azul, tinta) sobem como uma lâmina; o território recomendado se abre em arco até virar a tela do reveal.

```
index.html              telas, notas da apresentadora, menu e lightbox
assets/css/deck.css     sistema visual, telas, celular e movimento reduzido
assets/js/deck.js       ícones SVG animados, navegação e transições, trailer, contadores,
                        conexões produto × ocasião, prateleira De → Para, bloco 3D,
                        matriz de clusters, lightbox, partículas, modo celular
assets/img/brand/       logos Galbani (galbani.com.br) e 75LAB
assets/img/produtos/    embalagens Galbani (galbani.com.br)
assets/img/cenas/       receitas Galbani (galbani.com.br) e gôndolas (Unsplash)
assets/img/og.jpg       imagem de compartilhamento
serve.ps1               servidor local (powershell -File serve.ps1 -Port 8791)
```

Direção de arte editorial, como uma revista de gastronomia: papel creme `#F5EFE3`, tinta `#1D1A16`, títulos em Fraunces (serifa, com itálico para a ideia-chave), texto em Manrope e o script Lobster só no selo e nos códigos de marca. As cores vêm do selo Galbani: vermelho `#CD1232` como acento, azul `#094DA4` e verde `#009649`, mais um pêssego `#F2B880` para a luz quente da mesa. O arco, forma da janela e do forno, aparece nas fotos, no selo, nos cards de território e nos portões. Cabeçalho fixo com logos, folio e régua de progresso; o índice abre como sumário de revista.

## Fontes

- Briefing: *Planejamento Estratégico Galbani 75LAB 2027* (22/10/2026); DPA, Catálogo de Ativos 2027 (14/10/2026)
- Galbani: galbani.com.br, produtos, receitas e nossa-historia (22/10/2026); lactalisculinary.com/about-us/galbani-history
- Chegada e campanha: SuperVarejo (05/04/2024); Giro News (09/04/2024); Propmark (15/08/2024)
- Mercado: ABIQ e Nielsen via eDairyNews (18/07/2025); Scanntech via Giro News (09/12/2024); ABIQ via AgFeed (04/09/2025)
- Shopper: Kantar, consumo massivo 2º tri 2025 (04/11/2025); Worldpanel by Numerator via Mercado&Consumo (20/01/2026)
- Concorrência: sites oficiais Tirolez e Vigor; Mercado&Consumo (03/11/2025, Tirolez; 06/03/2026, Savencia e Quatá)
- Tendências: IAB Brasil e Ibope via Mercado&Consumo (29/04/2026); SuperVarejo (09/12/2025); Syos via Baguete (14/04/2022)

## Créditos das fotos

- Embalagens e receitas: galbani.com.br (uso interno em apresentação ao cliente)
- gondola-fria-iogurtes.jpg: Eduardo Soares, unsplash.com/photos/NRP0iTFLzPk (Unsplash License)
- corredor-refrigerados.jpg: ilja Freiberg, unsplash.com/photos/FWRnXmQQV8U (Unsplash License)

## Pendências

- **Verba:** a divisão recebida soma 110%; a proposta 30/30/25/15 precisa de aprovação e da confirmação do que R$ 1 milhão inclui (ativos, frete, instalação, operação, degustação, tecnologia e mensuração).
- **Codice:** confirmar o escopo contratado. Temperatura, geolocalização em tempo real, integração de venda e dados pessoais aparecem só como guardrails.
- **Posicionamento:** *Do seu jeito, à sua mesa* vem do briefing; não foi encontrado em fontes públicas. Confirmar se pode aparecer para o cliente nesta forma.
- **Dados de mercado:** a ABIQ tem duas leituras públicas de consumo per capita (cerca de 7 kg via eDairyNews e 5,6 kg via AgFeed), e por isso o número não aparece. O “1 em 3 que degustam compram” é um dado da NielsenIQ citado pelo Assaí, sem o estudo original.
- **Leituras 75LAB:** posições do mapa de concorrência, curva de atrito do shopper, barras dos territórios, intensidade por cluster e mapa produto × ocasião precisam de validação com Trade e Categoria.
- **Custo por posição (tela 19):** cálculo 75LAB sobre o ponto médio das faixas do catálogo, sem frete e sem a geladeira.
- **Cronograma:** só em semanas; datas e responsáveis saem do workshop.
- **Contatos:** telefone institucional da 75LAB em `[a preencher]`.
- **3D e AR:** não há modelo 3D (.glb/.usdz) do bloco, então não há experiência de AR; a vista explodida é uma ilustração em CSS 3D. Com o modelo, dá para incluir `<model-viewer>` com AR e QR Code.

# Galbani 2027 × 75LAB · Da geladeira à mesa

Apresentação comercial da 75LAB para o trade de **Galbani** em 2027. O objetivo é vender os serviços e produtos da 75LAB: estratégia, criação do bloco de marca, 3D e engenharia, produção e instalação, Plano de Rastreamento e mensuração. Base: documento *Planejamento Estratégico Galbani 75LAB 2027* (22/10/2026) e o Catálogo de Ativos DPA 2027.

- **Apresentação:** https://projetos.75lab.com.br/galbani-planejamento-2027/
- Apresentadora: Vanessa Morelli, Diretora Comercial 75LAB

## Roteiro: 12 telas

Desafio → solução → por que a 75LAB → plano e investimento.

| Tela | Takeaway |
|---|---|
| 01 · Capa | Trailer de abertura e a tese: *ser encontrada antes de ser escolhida*. |
| 02 · O desafio | O briefing pede giro; o desafio real começa antes: presença. Encontrada → entendida → experimentada → recomprada. |
| 03 · Mercado e shopper | A categoria cresce e se consolida, mas o carrinho encolhe: cada item precisa justificar seu lugar. |
| 04 · Concorrência | Mapa de territórios: o espaço livre é a italianidade prática do dia a dia. |
| 05 · Estratégia | Cinco movimentos, nesta ordem: entrar, agrupar, ativar, provar e aprender. |
| 06 · A plataforma | **Da geladeira à mesa**, que nasce de um arco: a geladeira Galbani (onde se escolhe) e o prato (onde se serve). |
| 07 · O bloco | Render do bloco por ocasião na geladeira, com quatro pontos (régua por ocasião, bloco de marca, preço legível e stopper) que acendem junto com a lista. |
| 08 · Peças por cluster | Cobertura: kit de comunicação e display de porta com ventosa. Crescimento: geladeira 1 porta e displays de chão P e M. Âncora: geladeira 2 portas, ilha refrigerada e ponta de gôndola. Balcão de degustação em todos. Sem preços; todas as peças abrem em galeria. |
| 09 · Plano de Rastreamento 75LAB | One Shot (fotografia da implantação) × On Timing (filme da permanência). |
| 10 · Por que a 75LAB | Um só parceiro da estratégia à loja: credenciais, cases (inclusive para o Grupo Lactalis) e O Método 75 aplicado a Galbani. |
| 11 · Cronograma | Doze semanas, do workshop à regra de escala. |
| 12 · Investimento | Serviços 75LAB (seis entregáveis) e as nove peças de PDV, todos em R$ 0,00 por enquanto, total, condições e os contatos da Vanessa. Única tela com preços. |

**Material de apoio** (fora da contagem, abre pelo índice `M`): decupagem do briefing, jornada do shopper, clusters de loja, Codice, indicadores, pré-mortem, workshop de 90 minutos e fontes.

## Navegação

`→` `↓` `PageDown` `espaço` avançam e `←` `↑` `PageUp` voltam. Clicar na lateral direita (10% da largura) avança e na esquerda volta. Também funcionam roda do mouse, deslizar no tablet, as setas do cabeçalho e os marcos de capítulo na régua de progresso. `Home`/`End`, `M` índice, `N` notas da apresentadora, `F` tela cheia, `Esc` fecha. Deep link: `#inv`, `#lab`, `#s17`. Toda imagem amplia em lightbox (`Esc`, clique fora ou `×` fecham; setas navegam na galeria).

O trailer de abertura roda uma vez por sessão do navegador; qualquer tecla ou clique pula. Até 820 px de largura (e em tablet em retrato) a apresentação vira rolagem vertical. Com `prefers-reduced-motion`, as animações viram transições curtas.

QA: `?desktop` força o modo apresentação, `&ar=2.2` simula outra proporção, `?static` mostra cada tela no estado final e `?solo=lab` (no celular) mostra só uma tela.

## Arquitetura

HTML, CSS e JavaScript puros, sem build e sem dependências (fontes do Google Fonts). O palco tem 900 de altura e acompanha a proporção da janela (1600 a 2100 de largura), sem faixas vazias. As transições imitam papel: entre páginas claras a nova folha desliza por cima da anterior; páginas de outra cor (azul, tinta) sobem como uma lâmina; a plataforma nasce de um arco.

```
index.html              telas, material de apoio, notas da apresentadora, índice e lightbox
assets/css/deck.css     sistema visual, telas, celular e movimento reduzido
assets/js/deck.js       ícones SVG animados, navegação e transições, trailer, contadores,
                        bloco 3D, matriz de clusters, lightbox, modo celular
assets/img/brand/       logos Galbani (galbani.com.br) e 75LAB
assets/img/produtos/    embalagens Galbani (galbani.com.br)
assets/img/cenas/       receitas Galbani (galbani.com.br) e gôndolas (Unsplash)
assets/img/cases/       pranchas do portfólio 75LAB (75lab.com.br)
assets/img/pecas/       renders das peças de PDV propostas pela 75LAB para Galbani
assets/img/og.jpg       imagem de compartilhamento
serve.ps1               servidor local (powershell -File serve.ps1 -Port 8791)
```

Direção de arte editorial, como uma revista de gastronomia: papel creme `#F5EFE3`, tinta `#1D1A16`, títulos em Fraunces (serifa, com itálico para a ideia-chave), texto em Manrope e o script Lobster só nos códigos de marca. As cores vêm do selo Galbani: vermelho `#CD1232` como acento, azul `#094DA4` e verde `#009649`, mais um pêssego `#F2B880` para a luz quente da mesa. O arco, forma da janela e do forno, aparece nas fotos e no selo. Cabeçalho fixo com logos, folio e régua de progresso; o índice abre como sumário de revista.

## Fontes

- Briefing: *Planejamento Estratégico Galbani 75LAB 2027* (22/10/2026); DPA, Catálogo de Ativos 2027 (14/10/2026)
- Galbani: galbani.com.br, produtos, receitas e nossa-historia (22/10/2026); lactalisculinary.com/about-us/galbani-history
- Mercado: ABIQ e Nielsen via eDairyNews (18/07/2025); Scanntech via Giro News (09/12/2024); ABIQ via AgFeed (04/09/2025)
- Shopper: Kantar, consumo massivo 2º tri 2025 (04/11/2025); Worldpanel by Numerator via Mercado&Consumo (20/01/2026)
- Concorrência: sites oficiais Tirolez e Vigor; Mercado&Consumo (03/11/2025, Tirolez; 06/03/2026, Savencia e Quatá)
- 75LAB: 75lab.com.br, credenciais, cases e O Método 75 (consulta em 07/10/2026)

## Créditos das fotos

- Embalagens e receitas: galbani.com.br (uso interno em apresentação ao cliente)
- Cases: portfólio 75LAB (Lactalis/Parmalat, Seara, Unilever, O Boticário, Whirlpool)
- Peças de PDV: renders ilustrativos enviados pela 75LAB (bloco por ocasião, kit de comunicação, display de porta, displays de chão P e M, geladeiras 1 e 2 portas, ilha, ponta de gôndola e balcão de degustação)
- gondola-fria-iogurtes.jpg: Eduardo Soares, unsplash.com/photos/NRP0iTFLzPk (Unsplash License)
- corredor-refrigerados.jpg: ilja Freiberg, unsplash.com/photos/FWRnXmQQV8U (Unsplash License)

## Pendências

- **Investimento (tela 12):** os seis entregáveis estão em R$ 0,00 de propósito. Preencher os valores, as condições de pagamento e a validade antes de enviar. A verba de R$ 1 milhão do briefing não aparece mais no deck.
- **Cases (tela 10):** confirmar a autorização para mostrar Seara, Unilever, O Boticário e Whirlpool a Galbani. Os cases de Lactalis/Parmalat são do próprio grupo.
- **Codice:** confirmar o escopo contratado. Temperatura, geolocalização em tempo real, integração de venda e dados pessoais aparecem só como guardrails.
- **Posicionamento:** *Do seu jeito, à sua mesa* vem do briefing; não foi encontrado em fontes públicas.
- **Leituras 75LAB:** posições do mapa de concorrência e a intensidade por cluster precisam de validação com Trade e Categoria.
- **Cronograma:** só em semanas; datas e responsáveis saem do workshop.
- **3D e AR:** não há modelo 3D (.glb/.usdz) das peças, então não há experiência de AR; as peças aparecem como renders.
- **Peças:** quantidades por cluster e valores de cada peça na tela 12 saem do workshop. Os renders mostram produtos que não estão no portfólio-base (Burrata, Fior di Latte, Mascarpone): confirmar se a Galbani os vende no Brasil antes de enviar.

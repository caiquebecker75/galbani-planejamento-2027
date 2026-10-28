# Galbani 2027 × 75LAB · Da geladeira à mesa

Apresentação comercial da 75LAB para o trade de **Galbani** em 2027. O objetivo é vender os serviços e produtos da 75LAB: estratégia, criação do bloco de marca, 3D e engenharia, produção e instalação, Plano de Rastreamento e mensuração. Base: documento *Planejamento Estratégico Galbani 75LAB 2027* (22/10/2026) e o Catálogo de Ativos DPA 2027.

- **Apresentação:** https://projetos.75lab.com.br/galbani-planejamento-2027/
- Apresentadora: Vanessa Morelli, Diretora Comercial 75LAB

## Roteiro: 15 telas

Desafio → solução → por que a 75LAB → plano e investimento.

| Tela | Takeaway |
|---|---|
| 01 · Capa | Trailer de abertura e a tese: *ser encontrada antes de ser escolhida*. |
| 02 · O desafio | O briefing pede giro; o desafio real começa antes: presença. Encontrada → entendida → experimentada → recomprada. |
| 03 · Mercado e shopper | A categoria cresce e se consolida, mas o carrinho encolhe: cada item precisa justificar seu lugar. |
| 04 · Concorrência | Mapa de territórios: o espaço livre é a italianidade prática do dia a dia. Inclui nacionais (Tirolez, Vigor e Faixa Azul, Polenghi, Gran Mestri, regionais) e importados da Itália (Grana Padano e Parmigiano Reggiano DOP de Rar, Soresina, Boni e Granarolo, e o Galbani DOP), com legenda nacional × importado. |
| 05 · Portfólio em dois papéis | Linha do dia a dia (mussarela, parmesão, creme de ricota, requeijão, manteiga) para entrada, giro e bloco; topo importado DOP (Grana Padano, Parmigiano Reggiano) como credencial italiana no cluster A. |
| 06 · Escolhas estratégicas | Onde jogar (lojas, ocasiões, portfólio, shopper), como ganhar (encontrada, entendida, experimentada, recomprada) e do que abrimos mão (guerra de preço, estrutura sem operação, degustação sem estoque, ponto extra sem dono). |
| 07 · Estratégia | Cinco movimentos, nesta ordem: entrar, agrupar, ativar, provar e aprender. |
| 08 · A plataforma | **Da geladeira à mesa**, que nasce de um arco: a geladeira Galbani (onde se escolhe) e o prato (onde se serve). |
| 09 · O bloco | Render do bloco por ocasião na geladeira, com quatro pontos (régua por ocasião, bloco de marca, preço legível e stopper) que acendem junto com a lista. |
| 10 · Peças por cluster | Cobertura: kit de comunicação e display de porta com ventosa. Crescimento: geladeira 1 porta e displays de chão P e M. Âncora: geladeira 2 portas, ilha refrigerada e ponta de gôndola. Balcão de degustação em todos. Sem preços; todas as peças abrem em galeria. |
| 11 · Mais peças | Quinze peças especiais além do kit base, em quatro famílias: na prateleira (régua com losango 3D, régua queijo derretido, divisória de acrílico, régua de puxar), para parar o olhar (stopper iluminado, stopper holográfico, wobbler lenticular, disco de receitas), na geladeira (geladeira trattoria, moldura de porta, móbile e testeira) e no corredor (portal, pórtico, adesivo de piso 3D, display nas massas). Cada peça indica o cluster em que faz mais sentido; todas abrem em galeria. |
| 12 · Plano de Rastreamento 75LAB | One Shot (fotografia da implantação) × On Timing (filme da permanência). |
| 13 · Por que a 75LAB | Um só parceiro da estratégia à loja: credenciais, cases (inclusive para o Grupo Lactalis) e O Método 75 aplicado a Galbani. |
| 14 · Cronograma | Doze semanas, do workshop à regra de escala. |
| 15 · Investimento | Os seis serviços 75LAB em R$ 0,00, total, condições e os contatos da Vanessa. A lista de preços peça a peça saiu em 28/10/2026; os novos valores de peças entram quando chegarem. Única tela com preços. |

**Material de apoio** (fora da contagem, abre pelo índice `M`): decupagem do briefing, jornada do shopper, clusters de loja, Codice, indicadores, pré-mortem, workshop de 90 minutos e fontes.

## Navegação

`→` `↓` `PageDown` `espaço` avançam e `←` `↑` `PageUp` voltam. Uma seta discreta no canto inferior direito avança (some na última tela). Também funcionam roda do mouse, deslizar no tablet, as setas do cabeçalho e os marcos de capítulo na régua de progresso. `Home`/`End`, `M` índice, `N` notas da apresentadora, `F` tela cheia, `Esc` fecha. Deep link: `#inv`, `#lab`, `#s17`. Toda imagem amplia em lightbox (`Esc`, clique fora ou `×` fecham; setas navegam na galeria).

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

Direção de arte editorial, como uma revista de gastronomia, ajustada ao KV *Do seu jeito, à sua mesa* (27/10/2026): papel de pergaminho `#F6EEDB`, tinta azul-marinho `#0F1F3D` (texto e páginas escuras), títulos em azul do KV `#11305F` em Fraunces (serifa, com itálico vermelho para a ideia-chave), texto em Manrope e o script Lobster só nos códigos de marca. Vermelho `#CD1232` como acento, azul `#094DA4` e verde `#009649` do selo, pêssego `#F2B880` para a luz quente da mesa. Do KV vêm o toldo listrado (capa e plataforma), a janela em arco com moldura dupla, os ramos de oliveira em traço de gravura (capa e estratégia), a pincelada sob o título da capa e a cena da mesa na janela da capa (`assets/img/cenas/kv-mesa.jpg`, recorte de `kv-galbani.webp`). Cabeçalho fixo com logos, folio e régua de progresso; o índice abre como sumário de revista.

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
- Peças de PDV: renders ilustrativos enviados pela 75LAB (bloco por ocasião, kit de comunicação, display de porta, displays de chão P e M, geladeiras 1 e 2 portas, ilha, ponta de gôndola e balcão de degustação) e as quinze peças especiais da tela 09. O bloco e o kit já trazem o stopper em nuvem; no kit, a testeira sem clipes e o stopper novo foram montados sobre o render original (`-v2`)
- gondola-fria-iogurtes.jpg: Eduardo Soares, unsplash.com/photos/NRP0iTFLzPk (Unsplash License)
- corredor-refrigerados.jpg: ilja Freiberg, unsplash.com/photos/FWRnXmQQV8U (Unsplash License)

## Pendências

- **Investimento (tela 15):** os seis serviços estão em R$ 0,00 de propósito. A lista de peças com preço saiu; os novos valores serão enviados pela 75LAB. Preencher também condições de pagamento e validade antes de enviar. A verba de R$ 1 milhão do briefing não aparece no deck.
- **Cases (tela 13):** confirmar a autorização para mostrar Seara, Unilever, O Boticário e Whirlpool a Galbani. Os cases de Lactalis/Parmalat são do próprio grupo.
- **Codice:** confirmar o escopo contratado. Temperatura, geolocalização em tempo real, integração de venda e dados pessoais aparecem só como guardrails.
- **Posicionamento:** *Do seu jeito, à sua mesa* vem do briefing; não foi encontrado em fontes públicas.
- **Origem dos produtos:** confirmado em SuperVarejo (05/04/2024), Gironews (09/04/2024) e galbani.com.br que Grana Padano e Parmigiano Reggiano são importados da Itália (DOP). Nenhuma fonte pública diz onde mussarela, parmesão, creme de ricota, manteiga e requeijão são fabricados: a lista "produzidos no Brasil" vem da 75LAB e deve ser checada no rótulo (SIF/endereço do fabricante) ou com a DPA. O requeijão e o Crema di Queijo estão no site atual, mas não no lançamento de 2024.
- **Concorrentes importados:** marcas vistas em sites de varejo (Rar e Soresina no Pão de Açúcar, Boni no Zona Sul, Granarolo em loja própria) em 28/10/2026; validar sortimento por rede no workshop.
- **Leituras 75LAB:** posições do mapa de concorrência e a intensidade por cluster precisam de validação com Trade e Categoria.
- **Cronograma:** só em semanas; datas e responsáveis saem do workshop.
- **3D e AR:** não há modelo 3D (.glb/.usdz) das peças, então não há experiência de AR; as peças aparecem como renders.
- **Peças:** quantidades por cluster e valores de cada peça saem do workshop. Os renders mostram produtos que não estão no portfólio-base (Burrata, Fior di Latte, Mascarpone): confirmar se a Galbani os vende no Brasil antes de enviar. As peças especiais também mostram Parmigiano Reggiano e Mozzarella de Búfala; o display nas massas só funciona com item fora do frio (parmesão ralado, se for o caso); o stopper iluminado pede energia.

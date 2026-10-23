# specs.md — Site pessoal de Júlia Buffon

Especificações gerais do projeto. **Fonte da verdade** para escopo, design e requisitos.
Última atualização: 2026-10-23 · Status: **planejamento aprovado, implementação não iniciada**

---

## 1. Resumo

Site pessoal e portfólio de **Júlia Buffon**, estudante de Ciência da Computação que também faz design,
publicado no GitHub Pages em `https://buffoneu12.github.io`. Objetivo: apresentar quem ela é, o que está
aprendendo e os projetos que vai construindo — servindo tanto para processos seletivos (estágio e
posições júnior) quanto para contato de clientes.

| Item | Decisão |
|---|---|
| Nome exibido | Júlia Buffon |
| Perfil | Estudante de Ciência da Computação (em formação) |
| Área | Desenvolvimento + Design |
| URL | `https://buffoneu12.github.io` |
| Repositório | `Buffoneu12/Buffoneu12.github.io` (user site) |
| Stack | HTML + CSS + JavaScript nativos, sem build |
| Idiomas | Português (padrão) e Inglês |
| Tema | Escuro por padrão, alternável para claro |
| Direção visual | B — Dark técnico |
| Contato | E-mail e LinkedIn |
| Seções | Hero, Sobre, Projetos |

---

## 2. Objetivos

1. Comunicar em **menos de 10 segundos** quem é a Júlia, o que ela faz e como contratá-la.
2. Servir de vitrine viva: cada projeto novo é adicionado sem refatorar o site.
3. Ser rápido, acessível e funcionar bem em celular — o portfólio de alguém que faz front-end precisa
   provar competência técnica no próprio código.
4. Manter custo zero: hospedagem no GitHub Pages, sem serviços pagos.
5. Posicionar com honestidade: **estudante de Ciência da Computação em formação**, que já entrega design
   e código. Sem inflar currículo, sem se apresentar como sênior, sem inventar experiência de mercado.

## 3. Não-objetivos (v1)

- Blog / artigos (seção prevista para v2, não implementar agora).
- Formulário de contato com backend (só `mailto:`).
- Currículo em PDF para download.
- Área administrativa, CMS ou banco de dados.
- Domínio próprio (decidido depois; a arquitetura deve permitir migrar sem retrabalho).
- Analytics de terceiros.

---

## 4. Público

| Persona | O que procura | O que o site deve entregar |
|---|---|---|
| Recrutadora de estágio/júnior | Potencial, base técnica, vontade de aprender | Hero claro, formação visível, stack, links de repositório, LinkedIn |
| Liderança de engenharia | Qualidade de execução | Site rápido, acessível, código limpo |
| Cliente em potencial | Confiança e estética | Identidade visual coerente, cases legíveis, contato fácil |
| Colega dev | Referência técnica | Links de projeto, detalhes de stack |

Nenhuma persona espera senioridade. O site vende **potencial, base técnica e execução** — não anos de
mercado. Qualquer texto que sugira experiência profissional sênior está errado e deve ser corrigido.

---

## 5. Arquitetura de informação

Página única (`index.html`), com navegação por âncoras:

```
1. Header (fixo, discreto)      logo/nome · Sobre · Projetos · seletor de idioma · toggle de tema
2. Hero                         nome, formação/cargo, frase de posicionamento, CTA principal
3. Sobre                        bio curta, trajetória, stack em chips, foto opcional
4. Projetos                     grade de cards + estado vazio
5. Footer                       e-mail, LinkedIn, GitHub, ano, "feito com HTML/CSS/JS"
```

Ordem justificada: identidade → credibilidade → prova → contato.

---

## 6. Conteúdo — inventário

| Bloco | Status | Observação |
|---|---|---|
| Nome e formação | ✅ definido | "Júlia Buffon" · Estudante de Ciência da Computação · dev + design |
| Curso, instituição e previsão de conclusão | ✅ definido | Ciências da Computação · Atitus Educação · 2030 (Sobre + JSON-LD `affiliation`) |
| Objetivo profissional | ⛔ pendente | estágio, júnior ou freelance — define a promessa do hero |
| Frase de posicionamento (hero) | ✅ definido | 91 caracteres, PT e EN, em `data/i18n` |
| Bio (sobre) | ✅ definido | 3 parágrafos · 126 palavras PT / 108 EN |
| Stack / skills | ⛔ pendente | lista de tecnologias + nível |
| Foto | ⛔ pendente | opcional; se não houver, usar monograma tipográfico |
| Projetos | ⛔ vazio | Júlia ainda não tem projetos publicados |
| E-mail | ✅ definido | `juliabuffon7@gmail.com` |
| LinkedIn | ✅ definido | `https://www.linkedin.com/in/juliabuffon` |
| GitHub | ✅ definido | `https://github.com/Buffoneu12` |

### 6.1 Estado vazio de projetos (obrigatório na v1)

Como ainda não há projetos, a seção **não pode** parecer quebrada nem conter projetos falsos.
Comportamento definido:

- Título e texto honesto: algo como "Primeiros projetos em construção".
- Três cards em estado `placeholder`, visualmente distintos (borda tracejada, sem hover, `aria-hidden`).
- CTA para o GitHub: "Acompanhar no GitHub".
- Quando `projetos.json` tiver ao menos 1 item, os placeholders desaparecem automaticamente.

---

## 7. Direção visual — B: Dark técnico

Personalidade: precisa, contida, com cara de ferramenta bem-feita. Contraste alto, tipografia
monoespaçada como acento, quase nenhum ornamento.

### 7.1 Princípios

- O conteúdo é o protagonista; a interface é o suporte.
- Monoespaçada só em rótulos, metadados, números e tags — nunca em parágrafos.
- Um único acento de cor. Se tudo tem acento, nada tem.
- Bordas de 1px e superfícies levemente elevadas no lugar de sombras pesadas.
- Grid visível apenas como sugestão (linhas a 4–6% de opacidade), nunca como textura chamativa.

### 7.2 Tokens de cor — tema escuro (padrão)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0B0D10` | fundo da página |
| `--bg-elevated` | `#12161B` | seções alternadas |
| `--surface` | `#171C22` | cards |
| `--surface-hover` | `#1D232B` | hover de card |
| `--border` | `#232A32` | divisórias, bordas de card |
| `--border-strong` | `#2F3945` | borda em hover/foco |
| `--text` | `#E6E8EB` | texto principal |
| `--text-muted` | `#9BA6B2` | texto secundário |
| `--text-faint` | `#7C8794` | legendas, metadados (5,3:1 no fundo) |
| `--accent` | `#22D3EE` | links, destaques, foco |
| `--accent-contrast` | `#0B0D10` | texto sobre o acento |
| `--accent-soft` | `rgba(34, 211, 238, 0.12)` | fundo de chip/tag |
| `--danger` | `#F87171` | erros (raro) |

### 7.3 Tokens de cor — tema claro

| Token | Valor |
|---|---|
| `--bg` | `#F7F8FA` |
| `--bg-elevated` | `#FFFFFF` |
| `--surface` | `#FFFFFF` |
| `--surface-hover` | `#F1F3F6` |
| `--border` | `#E2E5EA` |
| `--border-strong` | `#C9CFD8` |
| `--text` | `#101317` |
| `--text-muted` | `#55606D` |
| `--text-faint` | `#66707C` |
| `--accent` | `#0E7490` |
| `--accent-contrast` | `#FFFFFF` |
| `--accent-soft` | `rgba(14, 116, 144, 0.10)` |

Regra: o mesmo nome de token nos dois temas. Componentes nunca referenciam hex direto.

### 7.4 Tipografia

| Papel | Fonte | Pesos |
|---|---|---|
| Display / títulos | Inter (variable) | 600, 700 |
| Corpo | Inter | 400 |
| Rótulos, tags, metadados | JetBrains Mono | 400, 500 |

- Fallback: `system-ui, -apple-system, "Segoe UI", sans-serif` e `ui-monospace, "Cascadia Code", monospace`.
- Fontes self-hosted em `assets/fonts/` (woff2, subset latin + latin-ext) com `font-display: swap`.
  **v1 usa apenas o stack de sistema** (decisão registrada em `TODO.md` T05); self-hosted fica para a v2.
- Se o peso extra não couber no orçamento, priorizar o stack de sistema em vez de baixar fonte.

Escala (mobile → desktop via `clamp`):

| Token | Valor | Uso |
|---|---|---|
| `--fs-xs` | `0.75rem` | legendas, metadados |
| `--fs-sm` | `0.875rem` | texto auxiliar |
| `--fs-base` | `1rem` | corpo |
| `--fs-lg` | `1.125rem` | lead |
| `--fs-xl` | `clamp(1.5rem, 4vw, 2rem)` | h2 |
| `--fs-2xl` | `clamp(2rem, 6vw, 3rem)` | h1 de seção |
| `--fs-hero` | `clamp(2.5rem, 9vw, 4.5rem)` | nome no hero |

- Corpo: `line-height: 1.65`. Títulos: `1.1`. Display: `letter-spacing: -0.02em`.
- Largura de linha do corpo: máximo `68ch`.

### 7.5 Espaçamento, raios, sombras, movimento

- Escala (4px base): `4, 8, 12, 16, 24, 32, 48, 64, 96, 128` → `--space-1` … `--space-10`.
- Seções: `padding-block` de `--space-9` no mobile, `--space-10` no desktop.
- Raios: `--radius-sm: 6px`, `--radius-md: 10px`, `--radius-lg: 16px`, `--radius-full: 999px`.
- Sombra (só no tema claro e em elementos flutuantes): `0 8px 24px rgba(16,19,23,.08)`.
- Transições: `--dur-fast: 150ms`, `--dur-base: 220ms`, `--ease: cubic-bezier(.2,.8,.2,1)`.
- Animações de entrada: `fade + translateY(8px)`, uma vez, via `IntersectionObserver`,
  desativadas em `prefers-reduced-motion: reduce`.

### 7.6 Layout

- Container: `max-width: 1120px`, gutter `--space-5` (mobile) / `--space-7` (desktop).
- Grid de projetos: 1 coluna (< 640px), 2 colunas (≥ 640px), 3 colunas (≥ 1024px).
- Breakpoints: `480px`, `768px`, `1024px`, `1280px` (mobile-first, `min-width`).
- Header fixo com `backdrop-filter: blur(12px)` e fundo semitransparente; altura 64px.

---

## 8. Componentes

| Componente | Requisitos |
|---|---|
| `header` | sticky, blur, borda inferior de 1px ao rolar, skip-link antes dele |
| `nav` | âncoras com scroll suave (respeitando reduced-motion), item ativo destacado |
| `lang-switch` | botão PT/EN com `aria-pressed`; persiste em `localStorage` |
| `theme-toggle` | sol/lua, `aria-label` dinâmico, respeita `prefers-color-scheme` na primeira visita |
| `hero` | nome, formação em mono (`Estudante de Ciência da Computação`), frase, CTA primário + secundário, links sociais |
| `section` | rótulo mono numerado (ex.: `01 — Sobre`), h2, conteúdo |
| `chip` | tecnologia, mono, fundo `--accent-soft`, borda `--border` |
| `project-card` | imagem (16:9), título, resumo, tags, links; card inteiro clicável, foco visível |
| `project-card--empty` | borda tracejada, sem hover, não focável |
| `footer` | contatos, ano dinâmico, assinatura técnica |

Estados obrigatórios por elemento interativo: `default`, `hover`, `focus-visible`, `active`, `disabled`.

---

## 9. Bilíngue

- Arquivos: `data/i18n/pt.json` e `data/i18n/en.json`, mesma estrutura de chaves.
- Marcação: `data-i18n="chave"` para texto, `data-i18n-attr="aria-label:chave"` para atributos.
- Sem JavaScript, o site exibe o português já embutido no HTML (conteúdo padrão).
- Idioma padrão: PT. Detecção: `localStorage` → `navigator.language` → PT.
- Ao trocar: atualiza textos, `<html lang>`, `<title>`, `aria-label`s e o botão ativo.
- Sem `hreflang` nem rotas separadas (site de página única). SEO internacional fica limitado ao
  `og:locale` — limitação aceita na v1.
- Nomes próprios, tecnologias e títulos de projeto não são traduzidos.

---

## 10. Modelo de dados de projetos

Arquivo: `data/projetos.json`. O site lê, renderiza e cai no estado vazio se a lista for vazia.

```json
{
  "projetos": [
    {
      "id": "slug-do-projeto",
      "titulo": { "pt": "Nome do projeto", "en": "Project name" },
      "resumo": { "pt": "Uma frase objetiva.", "en": "One objective sentence." },
      "stack": ["HTML", "CSS", "JavaScript"],
      "ano": 2026,
      "status": "publicado",
      "imagem": "assets/img/projetos/slug.webp",
      "links": { "repo": "https://github.com/...", "demo": "https://..." },
      "destaque": true
    }
  ]
}
```

Regras:
- `status`: `publicado` | `em-andamento` | `arquivado` (exibido como rótulo mono).
- `destaque: true` → card ocupa 2 colunas no desktop.
- `imagem` ausente → placeholder tipográfico com as iniciais do projeto, nunca imagem quebrada.
- Ordenação: `destaque` primeiro, depois `ano` decrescente.
- Validação: se o JSON falhar, logar aviso e exibir o estado vazio — nunca tela em branco.
- Manutenção: a Júlia pede ao agente, que edita o JSON (sem CMS).

---

## 11. Estrutura de arquivos

```
/
├─ index.html
├─ 404.html
├─ AGENTS.md
├─ specs.md
├─ README.md
├─ .nojekyll
├─ data/
│  ├─ projetos.json
│  └─ i18n/
│     ├─ pt.json
│     └─ en.json
└─ assets/
   ├─ css/
   │  ├─ tokens.css
   │  ├─ base.css
   │  ├─ layout.css
   │  └─ components.css
   ├─ js/
   │  ├─ theme.js
   │  ├─ i18n.js
   │  ├─ projetos.js
   │  └─ main.js
   ├─ fonts/
   └─ img/
      └─ projetos/
```

---

## 12. Requisitos técnicos

- HTML5 válido, um único `<h1>`, landmarks semânticos.
- CSS com custom properties, sem `!important` (exceto utilitário de acessibilidade justificado),
  sem seletores por ID, especificidade máxima de 2 níveis.
- JS em ES modules (`type="module"`), sem globais, sem `innerHTML` com dados externos.
- `prefers-color-scheme` respeitado na primeira visita; escolha manual prevalece depois.
- Nenhuma requisição a domínios de terceiros (fontes, ícones e scripts são locais).
- Ícones: SVG inline, `currentColor`, `aria-hidden="true"` quando decorativos.

---

## 13. Acessibilidade — WCAG 2.2 AA

- Contraste: 4.5:1 (texto normal), 3:1 (texto grande, bordas de foco, ícones).
- Skip-link visível ao receber foco.
- Foco: `outline: 2px solid var(--accent); outline-offset: 3px`, nunca `outline: none`.
- Navegação completa por teclado; ordem de tabulação = ordem visual.
- Alvos de toque ≥ 44×44px.
- `prefers-reduced-motion` desativa scroll suave e animações de entrada.
- Formulários (se houver no futuro): label explícito, erro associado por `aria-describedby`.
- Tema claro e escuro ambos aprovados no contraste.

---

## 14. Performance

| Métrica | Meta |
|---|---|
| JS total (não comprimido) | ≤ 20 KB |
| CSS total | ≤ 30 KB |
| Peso da página inicial | ≤ 300 KB sem imagens de projeto |
| LCP em 4G simulado | < 2,0 s |
| CLS | < 0,1 |
| Lighthouse (mobile) | ≥ 95 em Performance, Acessibilidade, Boas práticas, SEO |

- Imagens em WebP/AVIF, com `width`/`height` declarados, `loading="lazy"` abaixo da dobra.
- Fontes: no máximo 2 arquivos woff2, `preload` apenas do peso 400 do corpo.
- CSS crítico inline é permitido apenas se a medição exigir; preferir CSS único e pequeno.

---

## 15. SEO e metadados

- `<title>`: "Júlia Buffon — Estudante de Ciência da Computação e Design" (PT) / tradução em EN.
- `meta description` (≤ 155 caracteres), `canonical`, `og:title`, `og:description`, `og:image` (1200×630),
  `og:locale` (`pt_BR` / `en_US`), `twitter:card`.
- JSON-LD `Person` com `name`, `jobTitle`, `url`, `sameAs` (GitHub, LinkedIn).
- `robots.txt` e `sitemap.xml` na raiz.
- Favicon: SVG + PNG 32/180 (apple-touch-icon).
- `404.html` estilizado, com link para a home.

---

## 16. Publicação — GitHub Pages

- Repositório: **`Buffoneu12/Buffoneu12.github.io`**, público, branch `main`, raiz (`/`).
- URL final: `https://buffoneu12.github.io`.
- Deploy por branch (sem GitHub Actions): Pages configurado em *Settings → Pages → Deploy from a branch*.
- `.nojekyll` na raiz para evitar processamento do Jekyll.
- HTTPS forçado.
- Migração futura para domínio próprio: apenas `CNAME` + ajuste de `canonical`/`og:url`.

**Pendência:** existe hoje o repositório `Buffoneu12/pagina-pessoal` (público, com um commit de README).
Decisão necessária: usar `Buffoneu12.github.io` como repositório do site e manter `pagina-pessoal`
como está, ou apagá-lo. Não publicar nada antes de resolver isso.

---

## 17. Riscos e pendências

| # | Item | Impacto | Ação |
|---|---|---|---|
| 1 | Sem projetos publicados | Seção principal vazia | Estado vazio bem desenhado + CTA para GitHub |
| 2 | Bio, frase e stack pendentes | Hero e Sobre não podem ser finalizados | Entrevista de conteúdo antes da Fase 2 |
| 3 | Sem foto | Hero mais impessoal | Monograma tipográfico como padrão; foto é opcional |
| 4 | Bilíngue dobra o custo de manutenção | Texto esquecido em um idioma | Regra em `AGENTS.md` §6 + checklist |
| 5 | Nome de usuário `Buffoneu12` no domínio | Marca pessoal "Júlia Buffon" vs. handle | Aceito na v1; domínio próprio resolve depois |
| 6 | Pasta local dentro do OneDrive | Risco de conflito na pasta `.git` | Mover o projeto para fora do OneDrive antes do desenvolvimento |
| 7 | Posicionamento | Site pode soar sênior demais (perde credibilidade) ou genérico (não diz nada) | Todo texto declara estudante de CC em formação, com foco em aprendizado e entrega concreta |

---

## 18. Critérios de aceite (v1)

- [ ] `https://buffoneu12.github.io` carrega com HTTPS e sem erro 404 de recurso.
- [ ] Hero responde em 10s: quem é, o que faz, como contatar.
- [ ] Seção Sobre com bio, stack e links funcionando.
- [ ] Projetos renderiza do JSON; com lista vazia mostra o estado vazio definido em §6.1.
- [ ] PT/EN alterna todos os textos, sem sobras, e persiste a escolha.
- [ ] Tema escuro padrão, claro alternativo, sem flash de tema errado no carregamento.
- [ ] Layout íntegro em 320, 768 e 1440px.
- [ ] Navegação completa por teclado com foco visível.
- [ ] Contraste AA nos dois temas.
- [ ] Lighthouse mobile ≥ 95 nas quatro categorias.
- [ ] Nenhuma dependência externa, nenhum build step.

---

## 19. Roadmap

| Fase | Entrega | Depende de |
|---|---|---|
| 0 | Planejamento: `AGENTS.md`, `specs.md` e `TODO.md` | — ✅ |
| 1 | Estrutura, tokens, tema, layout base | Aprovação das specs |
| 2 | Hero + Sobre com conteúdo real | Conteúdo da Júlia (§6) |
| 3 | Projetos + estado vazio | — |
| 4 | Bilíngue PT/EN | Fase 2 |
| 5 | Acessibilidade, performance, SEO | Fases 1–4 |
| 6 | Publicação no GitHub Pages | Repositório resolvido (§16) |
| 7 | v2: blog e/ou domínio próprio | v1 no ar |

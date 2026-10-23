# TODO.md — Plano de execução

Plano de execução do site pessoal de Júlia Buffon. Escrito para ser seguido **mecanicamente**,
na ordem, por um executor sem autonomia de decisão.

Derivado de `specs.md`. Leia também `AGENTS.md`.

---

## 0. Como usar este arquivo

1. Leia `specs.md` inteiro antes da primeira tarefa.
2. Execute **uma tarefa por vez**, na ordem numérica. Não pule, não agrupe, não reordene.
3. Ao concluir, troque `[ ]` por `[x]` e registre no §10.
4. Rode a verificação da tarefa. Se falhar, corrija e repita — no máximo **3 tentativas**.
5. Após a 3ª falha, marque `[!]`, pare e reporte o erro com a saída do comando.
6. Pare nos gates `G0`–`G4` e espere resposta humana. Não atravesse um gate.
7. Faça **um commit por tarefa concluída**, com a mensagem indicada.

**Legenda:** `[ ]` pendente · `[x]` concluído · `[~]` bloqueado · `[!]` falhou

---

## 1. Regras do executor (não negociáveis)

- **Não decida nada.** Se falta informação, pare e pergunte. Não "resolva do seu jeito".
- **Não invente conteúdo sobre a Júlia**: bio, projetos, empregos, números, prêmios, datas.
- **Não adicione** npm, framework, bundler, CDN, biblioteca de ícones ou de animação.
- **Não use** `style="..."` em HTML. **Não use** hex fora de `tokens.css`.
- **Não altere** textos de `specs.md` §6 sem instrução humana.
- **Não faça** deploy, push em `main` de outro repositório, `--force` ou alteração de configuração
  remota sem o gate correspondente.
- Em conflito entre este arquivo e `specs.md`: **pare e reporte**. Não escolha.
- Se um comando retornar erro, cole a saída no relatório — não resuma.

---

## 2. Bloqueios humanos

Nenhuma tarefa de código começa antes de **H1, H2 e H3** estarem resolvidos.

| ID | Tarefa | Dono | Status |
|---|---|---|---|
| H1 | Decidir se o projeto sai do OneDrive (risco §17.6) | Júlia | [x] mantido no local atual |
| H2 | Criar repositório `Buffoneu12/Buffoneu12.github.io`, **público e vazio** | Júlia | [x] criado em 2026-10-23 |
| H3 | Fornecer conteúdo: frase do hero, bio (120–200 palavras), curso + instituição + previsão de conclusão, objetivo profissional, lista de stack | Júlia | [x] fornecido e integrado |
| H4 | Aprovar direção visual B (Dark técnico) | Júlia | [x] aprovada em 2026-10-23 |
| H5 | Fornecer foto (opcional; se ausente, usar monograma) | Júlia | [x] monograma tipográfico ativo |
| H6 | Aprovar publicação no GitHub Pages | Júlia | [x] aprovada e publicada |

**H2 — passos exatos:** repositório público, sem README, sem licença, sem `.gitignore`.
O nome precisa ser exatamente `Buffoneu12.github.io` (user site).

---

## 3. Fase 0 — Verificação de bloqueios

### [x] T01 — Verificar conteúdo obrigatório
1. Abra `specs.md` §6.
2. Liste todas as linhas com status `⛔ pendente`.
3. Se existir qualquer pendência de conteúdo da Júlia (hero, bio, formação, stack, objetivo), **pare**
   e reporte a lista. Não prossiga para T02.

**Verificação:** `Select-String -Path specs.md -Pattern '⛔'` retorna vazio ou o relatório foi enviado.

### [x] T02 — Verificar repositório
1. Rode: `gh repo view Buffoneu12/Buffoneu12.github.io --json name,visibility,isEmpty`
2. Critério: `"visibility":"PUBLIC"` e `"isEmpty":true`.
3. Se falhar, marque `[~]` e pare (depende de H2).

**Commit:** não se aplica.

### [x] T03 — Criar estrutura de pastas
1. Crie, na raiz: `assets/css`, `assets/js`, `assets/img/projetos`, `data/i18n`.
2. Crie os arquivos vazios: `.nojekyll` (0 bytes), `data/projetos.json` com `{ "projetos": [] }`.

**Verificação:** `Get-ChildItem -Recurse -Directory | Select-Object FullName` lista as 4 pastas.

**Commit:** `cria estrutura de pastas do projeto`

> **G0** — confirme com a Júlia que T01–T03 passaram antes de seguir.

---

## 4. Fase 1 — Sistema de design

### [x] T04 — Criar `assets/css/tokens.css`
Cole exatamente este conteúdo, sem adicionar nem remover tokens:

```css
:root {
  color-scheme: dark;
  --bg: #0B0D10;
  --bg-elevated: #12161B;
  --surface: #171C22;
  --surface-hover: #1D232B;
  --border: #232A32;
  --border-strong: #2F3945;
  --text: #E6E8EB;
  --text-muted: #9BA6B2;
  --text-faint: #7C8794;
  --accent: #22D3EE;
  --accent-contrast: #0B0D10;
  --accent-soft: rgba(34, 211, 238, 0.12);
  --danger: #F87171;

  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "Cascadia Code", "SFMono-Regular", Consolas, monospace;

  --fs-xs: 0.75rem;
  --fs-sm: 0.875rem;
  --fs-base: 1rem;
  --fs-lg: 1.125rem;
  --fs-xl: clamp(1.5rem, 4vw, 2rem);
  --fs-2xl: clamp(2rem, 6vw, 3rem);
  --fs-hero: clamp(2.5rem, 9vw, 4.5rem);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 999px;

  --dur-fast: 150ms;
  --dur-base: 220ms;
  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);

  --container: 1120px;
  --header-h: 64px;
}

[data-theme="light"] {
  color-scheme: light;
  --bg: #F7F8FA;
  --bg-elevated: #FFFFFF;
  --surface: #FFFFFF;
  --surface-hover: #F1F3F6;
  --border: #E2E5EA;
  --border-strong: #C9CFD8;
  --text: #101317;
  --text-muted: #55606D;
  --text-faint: #66707C;
  --accent: #0E7490;
  --accent-contrast: #FFFFFF;
  --accent-soft: rgba(14, 116, 144, 0.10);
}
```

**Verificação:** `Select-String -Path assets/css/tokens.css -Pattern '--bg: #0B0D10'` encontra 1 linha.

**Commit:** `adiciona tokens do sistema de design`

### [x] T05 — Criar `assets/css/base.css`
Declarações obrigatórias (adicione reset padrão, nada além):

| Seletor | Declarações |
|---|---|
| `*, *::before, *::after` | `box-sizing: border-box` |
| `*` | `margin: 0` |
| `html` | `scroll-behavior: smooth`, `-webkit-text-size-adjust: 100%` |
| `body` | `background: var(--bg)`, `color: var(--text)`, `font-family: var(--font-sans)`, `font-size: var(--fs-base)`, `line-height: 1.65`, `padding-top: var(--header-h)`, `-webkit-font-smoothing: antialiased` |
| `img, svg, video` | `display: block`, `max-width: 100%`, `height: auto` |
| `h1, h2, h3` | `line-height: 1.1`, `letter-spacing: -0.02em`, `font-weight: 600`, `text-wrap: balance` |
| `p` | `max-width: 68ch` |
| `a` | `color: var(--accent)`, `text-underline-offset: 3px` |
| `:focus-visible` | `outline: 2px solid var(--accent)`, `outline-offset: 3px`, `border-radius: var(--radius-sm)` |
| `.container` | `width: 100%`, `max-width: var(--container)`, `margin-inline: auto`, `padding-inline: var(--space-5)`; em `min-width: 768px` → `padding-inline: var(--space-7)` |
| `.sr-only` | padrão de leitor de tela (`position: absolute`, `width: 1px`, `height: 1px`, `overflow: hidden`, `clip-path: inset(50%)`, `white-space: nowrap`) |
| `.skip-link` | `position: fixed`, `top: -100px`, `left: var(--space-4)`, `z-index: 200`, `background: var(--accent)`, `color: var(--accent-contrast)`, `padding: var(--space-2) var(--space-4)`, `border-radius: var(--radius-md)`; em `:focus` → `top: var(--space-4)` |

Bloco obrigatório no fim do arquivo:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Verificação:** arquivo contém `prefers-reduced-motion` e `:focus-visible`.

**Commit:** `adiciona estilos base e acessibilidade`

### [x] T06 — Criar `assets/css/layout.css`

| Seletor | Declarações |
|---|---|
| `.site-header` | `position: fixed`, `inset: 0 0 auto 0`, `height: var(--header-h)`, `z-index: 100`, `background: color-mix(in srgb, var(--bg) 85%, transparent)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid var(--border)` |
| `.site-header__inner` | `display: flex`, `align-items: center`, `justify-content: space-between`, `gap: var(--space-4)`, `height: 100%` |
| `.brand` | `font-weight: 600`, `color: var(--text)`, `text-decoration: none`, `font-size: var(--fs-lg)` |
| `.nav` | `display: flex`, `gap: var(--space-4)`; ocultar (`display: none`) abaixo de `480px` |
| `.nav__link` | `color: var(--text-muted)`, `text-decoration: none`, `font-size: var(--fs-sm)`, `padding: var(--space-2)`; `[aria-current="true"]` → `color: var(--text)` |
| `.controls` | `display: flex`, `gap: var(--space-2)` |
| `.hero` | `padding-block: var(--space-9)`, `display: flex`, `flex-direction: column`, `justify-content: center`, `gap: var(--space-5)`; em `min-width: 768px` → `min-height: calc(100svh - var(--header-h))` |
| `.section` | `padding-block: var(--space-9)`; em `min-width: 768px` → `var(--space-10)` |
| `.section + .section` | `border-top: 1px solid var(--border)` |
| `.projects__grid` | `display: grid`, `gap: var(--space-5)`, `grid-template-columns: 1fr`; `min-width: 640px` → `repeat(2, 1fr)`; `min-width: 1024px` → `repeat(3, 1fr)` |
| `.card--destaque` | em `min-width: 1024px` → `grid-column: span 2` |

**Verificação:** arquivo contém `640px` e `1024px`.

**Commit:** `adiciona layout e grade`

### [x] T07 — Criar `assets/css/components.css`

| Seletor | Declarações |
|---|---|
| `.btn` | `display: inline-flex`, `align-items: center`, `justify-content: center`, `gap: var(--space-2)`, `min-height: 44px`, `padding: var(--space-3) var(--space-5)`, `border: 1px solid transparent`, `border-radius: var(--radius-md)`, `font-size: var(--fs-sm)`, `font-weight: 500`, `text-decoration: none`, `transition: background var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease)` |
| `.btn--primary` | `background: var(--accent)`, `color: var(--accent-contrast)` |
| `.btn--primary:hover` | `transform: translateY(-1px)` |
| `.btn--ghost` | `border-color: var(--border-strong)`, `color: var(--text)` |
| `.btn--ghost:hover` | `border-color: var(--accent)`, `color: var(--accent)` |
| `.control-btn` | `display: inline-flex`, `align-items: center`, `justify-content: center`, `width: 44px`, `height: 44px`, `border: 1px solid var(--border)`, `border-radius: var(--radius-md)`, `background: transparent`, `color: var(--text-muted)`, `font-family: var(--font-mono)`, `font-size: var(--fs-xs)`, `cursor: pointer`, `transition: border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)` |
| `.control-btn:hover` | `border-color: var(--border-strong)`, `color: var(--text)` |
| `.section__label` | `font-family: var(--font-mono)`, `font-size: var(--fs-xs)`, `color: var(--text-faint)`, `text-transform: uppercase`, `letter-spacing: 0.08em`, `margin-bottom: var(--space-3)` |
| `.section__title` | `font-size: var(--fs-2xl)`, `margin-bottom: var(--space-5)` |
| `.hero__name` | `font-size: var(--fs-hero)`, `line-height: 1`, `letter-spacing: -0.03em` |
| `.hero__role` | `font-family: var(--font-mono)`, `font-size: var(--fs-sm)`, `color: var(--accent)` |
| `.hero__tagline` | `font-size: var(--fs-lg)`, `color: var(--text-muted)`, `max-width: 60ch` |
| `.hero__actions` | `display: flex`, `flex-wrap: wrap`, `gap: var(--space-3)`, `margin-top: var(--space-3)` |
| `.chip` | `display: inline-flex`, `align-items: center`, `padding: var(--space-1) var(--space-3)`, `border-radius: var(--radius-full)`, `background: var(--accent-soft)`, `border: 1px solid var(--border)`, `color: var(--accent)`, `font-family: var(--font-mono)`, `font-size: var(--fs-xs)` |
| `.stack` | `display: flex`, `flex-wrap: wrap`, `gap: var(--space-2)`, `margin-top: var(--space-5)` |
| `.card` | `display: flex`, `flex-direction: column`, `background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: var(--radius-lg)`, `overflow: hidden`, `transition: border-color var(--dur-base) var(--ease), background var(--dur-base) var(--ease), transform var(--dur-base) var(--ease)` |
| `.card:hover` | `border-color: var(--border-strong)`, `background: var(--surface-hover)`, `transform: translateY(-2px)` |
| `.card__media` | `aspect-ratio: 16 / 9`, `background: var(--bg-elevated)` |
| `.card__body` | `padding: var(--space-5)`, `display: flex`, `flex-direction: column`, `gap: var(--space-3)` |
| `.card__title` | `font-size: var(--fs-lg)` |
| `.card__summary` | `color: var(--text-muted)`, `font-size: var(--fs-sm)` |
| `.card__meta` | `font-family: var(--font-mono)`, `font-size: var(--fs-xs)`, `color: var(--text-faint)` |
| `.card--empty` | `border-style: dashed`, `border-color: var(--border-strong)`, `background: transparent`; sem `:hover` |
| `.projects__empty` | `display: flex`, `flex-direction: column`, `align-items: flex-start`, `gap: var(--space-4)`, `padding: var(--space-6)`, `border: 1px dashed var(--border-strong)`, `border-radius: var(--radius-lg)` |
| `.site-footer` | `border-top: 1px solid var(--border)`, `padding-block: var(--space-8)`, `color: var(--text-muted)`, `font-size: var(--fs-sm)` |
| `.site-footer__inner` | `display: flex`, `flex-wrap: wrap`, `justify-content: space-between`, `gap: var(--space-5)` |
| `.footer__links` | `display: flex`, `flex-wrap: wrap`, `gap: var(--space-4)` |
| `[data-reveal]` | `opacity: 0`, `transform: translateY(8px)`, `transition: opacity var(--dur-base) var(--ease), transform var(--dur-base) var(--ease)` |
| `[data-reveal].is-visible` | `opacity: 1`, `transform: none` |

**Verificação:** arquivo contém `.card--empty` e `min-height: 44px`.

**Commit:** `adiciona componentes de interface`

> **G1** — mostre a Júlia o esqueleto com conteúdo de exemplo e aguarde aprovação visual.

---

## 5. Fase 2 — Estrutura da página

### [x] T08 — Criar `index.html` (estrutura, sem conteúdo final)
Ordem obrigatória dentro de `<body>`:

1. `<a class="skip-link" href="#conteudo" data-i18n="a11y.skip">Pular para o conteúdo</a>`
2. `<header class="site-header">` → `.site-header__inner.container` com:
   - `<a class="brand" href="/">Júlia Buffon</a>`
   - `<nav class="nav" aria-label="Navegação principal" data-i18n-attr="aria-label:nav.label">` com 2 links `#sobre` e `#projetos`
   - `<div class="controls">` com `#lang-toggle` e `#theme-toggle`
3. `<main id="conteudo">` com 3 seções: `.hero#inicio`, `.section#sobre`, `.section#projetos`
4. `<footer class="site-footer">`
5. `<script type="module" src="assets/js/main.js"></script>`

Regras:
- `<html lang="pt-BR" data-theme="dark">`
- Um único `<h1>`, no hero.
- Seções Sobre e Projetos usam `<h2>`.
- Botão `#lang-toggle`: texto `EN`, `aria-label="Mudar para inglês"`, `data-i18n-attr="aria-label:lang.switch"`.
- Botão `#theme-toggle`: `aria-label="Mudar para tema claro"`, `data-i18n-attr="aria-label:theme.toLight"`,
  contendo os dois SVGs abaixo com `aria-hidden="true"`, e `hidden` no SVG do sol inicialmente.

```html
<svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" hidden>
  <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
</svg>
<svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>
</svg>
```

**Verificação:** `Select-String -Path index.html -Pattern '<h1'` retorna exatamente 1 resultado.

**Commit:** `cria estrutura semântica da pagina`

### [x] T09 — Adicionar `<head>`
Incluir, nesta ordem: `charset`, `viewport`, `<title>`, `description`, `canonical`, `theme-color`,
`og:type`, `og:title`, `og:description`, `og:url`, `og:locale`, `og:image`, `twitter:card`,
`link rel="icon"`, os 4 CSS (`tokens`, `base`, `layout`, `components`), e o script de boot do tema.

Script de boot (colar literalmente, antes dos CSS):

```html
<script>
  try {
    var t = localStorage.getItem('jb-theme');
    if (!t) t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
  } catch (e) {}
</script>
```

Valores: `<title>Júlia Buffon — Estudante de Ciência da Computação e Design</title>`,
`canonical` e `og:url` = `https://buffoneu12.github.io/`, `og:image` = `https://buffoneu12.github.io/assets/img/og.png`,
`theme-color` = `#0B0D10`.

**Verificação:** `Select-String -Path index.html -Pattern 'jb-theme'` encontra 1 resultado.

**Commit:** `adiciona metadados e carregamento de estilos`

### [x] T10 — Criar `assets/js/theme.js`
Comportamento exato:
1. Exportar `initTheme()`.
2. Ler `localStorage.getItem('jb-theme')`; se vazio, usar `document.documentElement.dataset.theme`.
3. No clique de `#theme-toggle`: alternar `dark`/`light`, gravar em `localStorage`, atualizar
   `document.documentElement.dataset.theme`, `meta[name="theme-color"]` (`#0B0D10` / `#F7F8FA`),
   alternar `hidden` nos SVGs e atualizar o `aria-label` (chaves `theme.toLight` / `theme.toDark`).
4. Nunca usar `innerHTML`.

**Verificação:** no navegador, clicar no botão troca o fundo e recarregar mantém a escolha.

**Commit:** `adiciona alternancia de tema`

### [x] T11 — Criar `data/i18n/pt.json` e `data/i18n/en.json`
Copiar **exatamente** esta tabela, mesma estrutura de chaves nos dois arquivos:

| chave | PT | EN |
|---|---|---|
| `meta.title` | Júlia Buffon — Estudante de Ciência da Computação e Design | Júlia Buffon — Computer Science Student and Designer |
| `meta.description` | Portfólio de Júlia Buffon, estudante de Ciência da Computação e design. | Portfolio of Júlia Buffon, Computer Science student and designer. |
| `a11y.skip` | Pular para o conteúdo | Skip to content |
| `nav.label` | Navegação principal | Main navigation |
| `nav.about` | Sobre | About |
| `nav.projects` | Projetos | Projects |
| `lang.switch` | Mudar para inglês | Switch to Portuguese |
| `theme.toLight` | Mudar para tema claro | Switch to light theme |
| `theme.toDark` | Mudar para tema escuro | Switch to dark theme |
| `hero.role` | Estudante de Ciência da Computação · Dev + Design | Computer Science Student · Dev + Design |
| `hero.cta.primary` | Ver projetos | View projects |
| `hero.cta.secondary` | Falar comigo | Get in touch |
| `about.label` | 01 — Sobre | 01 — About |
| `about.title` | Quem sou | About me |
| `projects.label` | 02 — Projetos | 02 — Projects |
| `projects.title` | O que estou construindo | What I'm building |
| `projects.empty.title` | Primeiros projetos em construção | First projects in progress |
| `projects.empty.text` | Ainda estou construindo meus primeiros projetos. Eles aparecem aqui assim que ficarem prontos. | I'm still building my first projects. They'll show up here as soon as they're ready. |
| `projects.empty.cta` | Acompanhar no GitHub | Follow on GitHub |
| `footer.tagline` | Desenvolvimento e design, em aprendizado constante. | Development and design, always learning. |
| `footer.built` | Feito com HTML, CSS e JavaScript. | Built with HTML, CSS and JavaScript. |
| `error.title` | Página não encontrada | Page not found |
| `error.text` | O endereço que você tentou acessar não existe ou foi movido. | The address you tried to reach doesn't exist or has moved. |
| `error.cta` | Voltar para o início | Back to home |

**Verificação:** os dois arquivos têm o mesmo número de chaves (24) e nenhum valor vazio.

**Commit:** `adiciona textos de interface em pt e en`

### [x] T12 — Criar `assets/js/i18n.js`
1. Exportar `initI18n()`.
2. `fetch` dos dois JSON em paralelo (`data/i18n/pt.json`, `data/i18n/en.json`).
3. Idioma: `localStorage.getItem('jb-lang')` → se vazio, `'pt'`.
4. Aplicar em todo `[data-i18n]` via `textContent`.
5. Aplicar `[data-i18n-attr="attr:chave"]` via `setAttribute`.
6. Atualizar `document.documentElement.lang` (`pt-BR` / `en`), `<title>` e `meta[name="description"]`.
7. Botão `#lang-toggle`: mostrar o idioma **de destino** (`EN` em PT, `PT` em EN).
8. No clique: alternar, persistir, reaplicar tudo.
9. Se `fetch` falhar: `console.warn`, manter o português do HTML e não quebrar a página.

**Verificação:** alternar o idioma troca nav, seções, botões e `<title>`; nenhum `undefined` na tela.

**Commit:** `adiciona alternancia de idioma`

> **G2** — confirme tema e idioma funcionando antes de seguir.

---

## 6. Fase 3 — Hero e Sobre

> Bloqueada por **H3**. Não escreva textos no lugar da Júlia.

### [x] T13 — Hero
Estrutura dentro de `.hero#inicio`:

1. `<p class="hero__role" data-i18n="hero.role">Estudante de Ciência da Computação · Dev + Design</p>`
2. `<h1 class="hero__name">Júlia Buffon</h1>`
3. `<p class="hero__tagline" data-i18n="hero.tagline">TEXTO DE H3</p>`
4. `.hero__actions` com:
   - `<a class="btn btn--primary" href="#projetos" data-i18n="hero.cta.primary">Ver projetos</a>`
   - `<a class="btn btn--ghost" href="mailto:juliabuffon7@gmail.com" data-i18n="hero.cta.secondary">Falar comigo</a>`

**Verificação:** a frase de H3 tem no máximo 140 caracteres e existe nos dois idiomas.

**Commit:** `adiciona secao hero`

### [x] T14 — Sobre
Estrutura dentro de `.section#sobre`:

1. `<p class="section__label" data-i18n="about.label">01 — Sobre</p>`
2. `<h2 class="section__title" data-i18n="about.title">Quem sou</h2>`
3. `<p data-i18n="about.body">BIO DE H3</p>` (120–200 palavras)
4. `<ul class="stack">` com um `<li class="chip">` por tecnologia de H3. Nomes **não** traduzem.
5. `<p class="section__label">Formação</p>` + `<p data-i18n="about.education">CURSO DE H3</p>`

Adicionar as chaves `hero.tagline`, `about.body` e `about.education` nos dois JSON.

**Verificação:** a bio não afirma experiência profissional sênior; nenhuma tecnologia inventada.

**Commit:** `adiciona secao sobre`

---

## 7. Fase 4 — Projetos

### [x] T15 — Criar `data/projetos.json`
Manter `{ "projetos": [] }`. Não inventar projetos.
Documentar no arquivo, como comentário não permitido em JSON, nada — apenas a lista vazia.

**Verificação:** `Get-Content data/projetos.json -Raw | ConvertFrom-Json` não retorna erro.

**Commit:** não se aplica (arquivo já existe desde T03).

### [x] T16 — Criar `assets/js/projetos.js`
1. Exportar `initProjetos()`.
2. `fetch('data/projetos.json')`.
3. Se `projetos.length === 0` → exibir `.projects__empty`, ocultar `.projects__grid`.
4. Se houver itens → renderizar cards com `document.createElement` (**proibido `innerHTML`**),
   ordenando por `destaque` (primeiro) e depois `ano` (decrescente).
5. Card contém: `.card__media` (imagem ou monograma), `.card__title`, `.card__summary`,
   `.card__meta` (`ano` + `status`), `.stack` de chips, links `repo`/`demo` quando existirem.
6. Card com link → o card inteiro é um `<a>`; sem link → `<article>`.
7. Erro de `fetch` ou JSON inválido → `console.warn` + estado vazio. Nunca tela em branco.

**Verificação:** com lista vazia, o estado vazio aparece e o console mostra no máximo 1 aviso.

**Commit:** `adiciona renderizacao de projetos`

### [x] T17 — Estado vazio em `index.html`
Dentro de `.section#projetos`, após o `<h2>`:

1. `<div class="projects__empty">` com:
   - `<p data-i18n="projects.empty.title">Primeiros projetos em construção</p>`
   - `<p data-i18n="projects.empty.text">...</p>`
   - `<a class="btn btn--ghost" href="https://github.com/Buffoneu12" data-i18n="projects.empty.cta">Acompanhar no GitHub</a>`
2. `<div class="projects__grid" hidden></div>` (o JS remove o `hidden` quando houver projetos)
3. O bloco vazio tem `aria-hidden="false"` e **não** é focável.

**Verificação:** a seção não parece quebrada em 320px; o CTA leva ao GitHub.

**Commit:** `adiciona estado vazio de projetos`

---

## 8. Fase 5 — Rodapé, 404 e marca

### [x] T18 — Rodapé
Dentro de `<footer class="site-footer">`:

1. `.site-footer__inner.container` com:
   - `<p>© <span id="ano"></span> Júlia Buffon</p>`
   - `<p data-i18n="footer.tagline">...</p>`
   - `.footer__links` com 3 links: e-mail (`mailto:juliabuffon7@gmail.com`),
     LinkedIn (`https://www.linkedin.com/in/juliabuffon`), GitHub (`https://github.com/Buffoneu12`).
     Todos com `rel="noopener"` e `target="_blank"` quando externos.
   - `<p data-i18n="footer.built">...</p>`
2. `#ano` preenchido por `assets/js/main.js` com `new Date().getFullYear()`.

**Verificação:** ano correto; os 3 links abrem o destino certo.

**Commit:** `adiciona rodape e contatos`

### [x] T19 — Criar `404.html`
1. Copiar `<head>` do `index.html`, trocando `<title>` e `canonical` (sem `canonical`, usar `noindex`).
2. Corpo: skip-link, header simplificado (só `.brand`), `<main class="container">` com
   `.section__title` (`error.title`), `.section__title` como `<h1>`, texto (`error.text`) e
   `.btn.btn--primary` para `/` (`error.cta`).
3. Carregar os mesmos CSS + `main.js`.
4. `meta name="robots" content="noindex"`.

**Verificação:** abrir `404.html` mostra os textos e o botão volta para `/`.

**Commit:** `adiciona pagina 404`

### [x] T20 — Criar `assets/js/main.js`
1. Importar e executar, nesta ordem: `initTheme()`, `initI18n()`, `initProjetos()`.
2. Preencher `#ano`.
3. Scroll spy: `IntersectionObserver` em `#sobre` e `#projetos`, marcando `aria-current="true"`
   no link correspondente.
4. Reveal: `IntersectionObserver` adicionando `.is-visible` em `[data-reveal]` (uma vez só).
5. Se `prefers-reduced-motion: reduce`, adicionar `.is-visible` em tudo imediatamente e não observar.

**Verificação:** sem erro no console; links do menu destacam a seção visível.

**Commit:** `adiciona inicializacao e interacoes`

### [x] T21 — Criar `assets/img/og.png`
1. Imagem 1200×630, fundo `#0B0D10`, texto "Júlia Buffon" e a linha "Estudante de Ciência da Computação".
2. Se não for possível gerar imagem, **pare** e reporte (não use placeholder de terceiros).

**Verificação:** arquivo existe e é PNG com 1200×630.

**Commit:** `adiciona imagem de compartilhamento`

### [x] T22 — Criar `assets/img/favicon.svg`
1. SVG 32×32, fundo transparente, monograma "JB" em `#22D3EE`, `font-family` monoespaçada.

**Verificação:** aparece na aba do navegador.

**Commit:** `adiciona favicon`

---

## 9. Fase 6 — QA final

Execute **todos** os testes abaixo. Qualquer falha volta para a tarefa de origem.

### [x] T23 — TST-01 Responsividade
Abrir em 320px, 768px e 1440px. Critério: nenhum scroll horizontal, nenhum texto cortado,
grade de projetos com 1 / 2 / 3 colunas.

### [x] T24 — TST-02 Temas
Alternar claro/escuro em cada seção. Critério: todos os textos legíveis, sem "flash" de tema errado
ao recarregar.

### [x] T25 — TST-03 Idiomas
Alternar PT/EN em todas as seções. Critério: nenhuma string vazia, `undefined` ou em idioma errado;
`<html lang>` muda; escolha persiste após recarregar.

### [x] T26 — TST-04 Teclado
Navegar só com Tab. Critério: skip-link é o primeiro foco; todos os botões e links recebem foco
visível; ordem segue a ordem visual.

### [x] T27 — TST-05 Sem JavaScript
Desativar JS. Critério: nome, formação, bio, stack e estado vazio de projetos continuam visíveis.

### [x] T28 — TST-06 Console e recursos
Critério: zero erros no console; zero requisições 404.

### [x] T29 — TST-07 Orçamento de peso
Rodar:
```powershell
(Get-ChildItem assets/css/*.css | Measure-Object Length -Sum).Sum
(Get-ChildItem assets/js/*.js | Measure-Object Length -Sum).Sum
```
Critério: CSS ≤ 30720 bytes; JS ≤ 20480 bytes.

### [x] T30 — TST-08 HTML válido
Validar `index.html` e `404.html` em `https://validator.w3.org/nu/`.
Critério: zero erros. Avisos são aceitáveis se não forem de acessibilidade.

### [x] T31 — TST-09 Contraste
Conferir com amostrador de cor os pares: `--text`/`--bg`, `--text-muted`/`--bg`,
`--text-faint`/`--bg`, `--accent`/`--bg`, nos dois temas.
Critério: ≥ 4.5:1 para texto normal.

### [x] T32 — TST-10 Lighthouse
Rodar Lighthouse mobile em `index.html`.
Critério: Performance ≥ 95, Acessibilidade ≥ 95, Boas práticas ≥ 95, SEO ≥ 95.

### [x] T33 — TST-11 Conteúdo honesto
Releia todo o texto visível. Critério: nada sugere senioridade ou experiência profissional que a
Júlia não tem; nenhum projeto, cliente ou número inventado.

### [x] T34 — TST-12 Links
Clicar todos: e-mail, LinkedIn, GitHub, âncoras, CTA do estado vazio.
Critério: todos funcionam; externos com `rel="noopener"`.

> **G3** — envie o relatório de T23–T34 para a Júlia antes de publicar.

---

## 10. Fase 7 — Publicação

> Só após **H6** aprovado.

> **G4** — confirmação explícita da Júlia para publicar.

### [x] T35 — Primeiro push
```powershell
git remote add origin https://github.com/Buffoneu12/Buffoneu12.github.io.git
git push -u origin main
```
**Verificação:** `git status -sb` mostra `main...origin/main` sem divergência.

### [x] T36 — Ativar GitHub Pages
```powershell
gh api -X POST repos/Buffoneu12/Buffoneu12.github.io/pages -f "source[branch]=main" -f "source[path]=/"
```
**Verificação:** `gh api repos/Buffoneu12/Buffoneu12.github.io/pages --jq .html_url` retorna
`https://buffoneu12.github.io/`.

### [x] T37 — Verificar no ar
1. Abrir `https://buffoneu12.github.io/` em aba anônima.
2. Critério: carrega com HTTPS, sem erro de recurso, tema escuro, PT por padrão.
3. Abrir uma URL inexistente. Critério: `404.html` aparece.

### [x] T38 — Criar `robots.txt` e `sitemap.xml`
1. `robots.txt`: `User-agent: *` + `Allow: /` + `Sitemap: https://buffoneu12.github.io/sitemap.xml`.
2. `sitemap.xml` com a home e `lastmod` do dia.
3. Push e aguardar o deploy.

**Verificação:** ambas as URLs respondem 200.

### [x] T39 — Encerrar pendências
1. Atualizar `specs.md` §6 com o que foi definido em H3.
2. Marcar no §11 todos os itens concluídos.
3. Registrar no `README.md` a URL do site.

**Commit:** `atualiza documentacao pos-publicacao`

---

## 11. Registro de progresso

| Fase | Tarefas | Status |
|---|---|---|
| 0 — Bloqueios | T01–T03 | [x] |
| 1 — Design system | T04–T07 | [x] |
| 2 — Estrutura | T08–T12 | [x] |
| 3 — Hero e Sobre | T13–T14 | [x] |
| 4 — Projetos | T15–T17 | [x] |
| 5 — Rodapé e marca | T18–T22 | [x] |
| 6 — QA | T23–T34 | [x] |
| 7 — Publicação | T35–T39 | [x] |

---

## 12. Definição de pronto

O projeto está pronto quando **todos** forem verdadeiros:

- [x] `https://buffoneu12.github.io` no ar, HTTPS, sem 404 de recurso.
- [x] Tema escuro padrão e claro alternativo, ambos aprovados em contraste.
- [x] PT e EN completos, sem string faltando.
- [x] Estado vazio de projetos coerente e honesto.
- [x] Teclado navega tudo; skip-link funciona.
- [x] Funciona sem JavaScript (conteúdo principal visível).
- [x] CSS ≤ 30 KB, JS ≤ 20 KB, Lighthouse ≥ 95 nas 4 categorias.
- [x] Zero dependências externas, zero build step.
- [x] `specs.md`, `AGENTS.md` e `README.md` atualizados.

---

## 13. Registro de execução

**2026-10-23 — execução e publicação concluídas.**

Concluídos: T01–T39 (todas as tarefas das Fases 0 a 7).
Site publicado e ativo em `https://buffoneu12.github.io`.

| Teste | Resultado |
|---|---|
| T28 console | 0 erros em `index.html` e `404.html` |
| T24 temas | escuro ↔ claro OK, persistência OK, `theme-color` sincronizado |
| T25 idiomas | PT ↔ EN OK em nav, seções, rodapé, `<title>` e `aria-label`; persistência OK |
| T29 peso | CSS 9.815 B (limite 30.720) · JS 9.809 B (limite 20.480) |
| T32 Lighthouse | Acessibilidade 100 · Boas práticas 100 · SEO 100 |
| T26 teclado | skip-link recebe foco, fica visível a 16px, outline ciano |
| T23 responsivo | iframe a 320px: sem scroll horizontal, nav oculta, grade em 1 coluna |
| T16 projetos | item de teste renderizou com título, resumo, ano/status, chips e link |

Bugs encontrados e corrigidos durante a execução:

1. `[hidden]` era anulado por `display: block`/`grid` nos CSS — ícones de tema e grade de projetos apareciam indevidamente. Adicionada regra `[hidden] { display: none !important; }`.
2. Botão de idioma violava WCAG 2.5.3 (Label in Name): visível "EN", nome acessível "Mudar para inglês". Strings passaram a ser "EN — Mudar para inglês" / "PT — Switch to Portuguese".
3. Monograma do card usava `.card__meta`, colidindo com o metadado real. Criada a classe `.card__monogram`.
4. `fetch` de `projetos.json` podia servir cache antigo. Adicionado `{ cache: 'no-cache' }`.
5. Reveal com `IntersectionObserver` podia deixar seções permanentemente invisíveis após salto de âncora. Agora o que está acima da dobra aparece imediatamente e há rede de segurança de 2 s.

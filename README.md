# Página pessoal

Site pessoal e portfólio de **Júlia Buffon** — estudante de Ciência da Computação e design.

- **Site:** https://buffoneu12.github.io
- **Stack:** HTML, CSS e JavaScript nativos. Sem build, sem dependências.
- **Idiomas:** português e inglês.
- **Tema:** escuro por padrão, com alternância para claro.

## Documentação

| Arquivo | Conteúdo |
|---|---|
| `specs.md` | Especificações do projeto: escopo, design system, requisitos |
| `AGENTS.md` | Regras de conduta para agentes de IA |
| `TODO.md` | Plano de execução com tarefas e testes |

## Rodar localmente

Como o site usa `fetch` para carregar JSON, é preciso um servidor estático:

```powershell
python -m http.server 8765
```

Depois abra http://127.0.0.1:8765.

## Estrutura

```
index.html · 404.html
assets/css  · tokens, base, layout, components
assets/js   · theme, i18n, projetos, main
data/       · projetos.json, i18n/{pt,en}.json
```

## Status

A versão 1.0 do site foi concluída, testada e publicada no GitHub Pages.

## Próximos passos

- Adicionar projetos em `data/projetos.json` conforme forem sendo concluídos.
- Foto pessoal (opcional; atualmente usando monograma tipográfico).
- Artigos e blog pessoal (planejados para a v2).

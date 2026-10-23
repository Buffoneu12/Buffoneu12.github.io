const STATUS_LABELS = {
  publicado: 'publicado',
  'em-andamento': 'em andamento',
  arquivado: 'arquivado'
};

function initials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

function createMedia(project, title) {
  const media = document.createElement('div');
  media.className = 'card__media';

  if (project.imagem) {
    const image = document.createElement('img');
    image.src = project.imagem;
    image.alt = '';
    image.loading = 'lazy';
    image.width = 640;
    image.height = 360;
    media.append(image);
    return media;
  }

  const fallback = document.createElement('p');
  fallback.className = 'card__monogram';
  fallback.textContent = initials(title);
  media.append(fallback);
  return media;
}

function createCard(project) {
  const title = project.titulo?.pt || project.titulo?.en || project.id || '';
  const summary = project.resumo?.pt || project.resumo?.en || '';
  const hasLink = Boolean(project.links?.repo || project.links?.demo);

  const card = document.createElement(hasLink ? 'a' : 'article');
  card.className = 'card' + (project.destaque ? ' card--destaque' : '');
  if (hasLink) {
    card.href = project.links.repo || project.links.demo;
    card.rel = 'noopener';
    card.target = '_blank';
  }

  const body = document.createElement('div');
  body.className = 'card__body';

  const heading = document.createElement('h3');
  heading.className = 'card__title';
  heading.textContent = title;

  const paragraph = document.createElement('p');
  paragraph.className = 'card__summary';
  paragraph.textContent = summary;

  const meta = document.createElement('p');
  meta.className = 'card__meta';
  const status = STATUS_LABELS[project.status] || '';
  meta.textContent = [project.ano, status].filter(Boolean).join(' · ');

  body.append(heading, paragraph, meta);

  if (Array.isArray(project.stack) && project.stack.length > 0) {
    const list = document.createElement('ul');
    list.className = 'stack';
    project.stack.forEach((technology) => {
      const item = document.createElement('li');
      item.className = 'chip';
      item.textContent = technology;
      list.append(item);
    });
    body.append(list);
  }

  if (hasLink) {
    const links = document.createElement('div');
    links.className = 'card__links';
    if (project.links.repo) {
      const repo = document.createElement('span');
      repo.textContent = 'repositório →';
      links.append(repo);
    }
    if (project.links.demo) {
      const demo = document.createElement('span');
      demo.textContent = 'demo →';
      links.append(demo);
    }
    body.append(links);
  }

  card.append(createMedia(project, title), body);
  return card;
}

function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    if (Boolean(b.destaque) !== Boolean(a.destaque)) return b.destaque ? 1 : -1;
    return (Number(b.ano) || 0) - (Number(a.ano) || 0);
  });
}

export async function initProjetos() {
  const grid = document.querySelector('.projects__grid');
  const empty = document.querySelector('.projects__empty');
  if (!grid) return;

  let projects = [];

  try {
    const response = await fetch('data/projetos.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('projetos.json: ' + response.status);
    const data = await response.json();
    projects = Array.isArray(data.projetos) ? data.projetos : [];
  } catch (error) {
    console.warn('[projetos] não foi possível carregar a lista:', error.message);
    projects = [];
  }

  grid.replaceChildren();

  if (projects.length === 0) {
    grid.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;
  sortProjects(projects).forEach((project) => grid.append(createCard(project)));
  grid.hidden = false;
}

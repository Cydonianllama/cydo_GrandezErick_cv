const PROJECTS = [
  {
    id: "cydoflow",
    title: "Cydoflow — Automatismos",
    tagline: "Plataforma de flujos conversacionales con IA",
    description:
      "Plataforma para diseñar automatizaciones conversacionales: editor visual de agentes IA, triggers por intención o palabra clave, gestión de contactos e inbox multicanal.",
    stack: ["NextJS", "Typescript", "Express", "Integraciones IA"],
    highlights: [
      "Editor visual de agentes IA con tareas, variables y modelos configurables (OpenAI / DeepSeek).",
      "Automatizaciones con triggers por intención IA, palabra clave o mensaje directo, con estados en vivo y borrador.",
      "Gestión de contactos con etiquetas e inbox multicanal con automatizaciones pausables.",
    ],
    images: [
      { src: "./assets/cydoflow1-editor.jpeg", alt: "Editor visual de agente IA en Cydoflow", caption: "Editor de agentes" },
      { src: "./assets/cydoflow2-automations.jpeg", alt: "Lista de automatizaciones en Cydoflow", caption: "Automatizaciones" },
      { src: "./assets/cydoflow3-contacts.jpeg", alt: "Gestión de contactos en Cydoflow", caption: "Contactos" },
      { src: "./assets/cydoflow4-chat.jpeg", alt: "Inbox de chat multicanal en Cydoflow", caption: "Chat" },
    ],
    landing: "https://monorepo-cydonianllama-web.vercel.app/",
    repo: "",
  },
  {
    id: "cydoworkflows",
    title: "Cydoworkflows",
    tagline: "Orquestador de procesos automatizados",
    description:
      "Sistema para configurar procesos automatizados con canvas visual: triggers, ramas condicionales, llamadas API e integraciones (Google Sheets, Gmail, agentes IA), con versionado de publicaciones.",
    stack: ["React Flow", "Nodos", "APIs", "Automatización"],
    highlights: [
      "Canvas de workflows con triggers, condicionales, llamadas API y aprobación humana.",
      "Nodos de integración con servicios externos y agentes IA.",
      "Versionado de publicaciones para iterar flujos con seguridad.",
    ],
    images: [
      { src: "./assets/cydoworkflows.png", alt: "Canvas de workflow en Cydoworkflows", caption: "Workflow" },
    ],
    landing: "",
    repo: "https://github.com/Cydonianllama/cydoworkflows",
  },
];

const EXPERIENCE = [
  {
    role: "Desarrollador",
    company: "Plazbot",
    period: "2016 May — 2021 May",
    description:
      "Desarrollo de módulos, mantenimiento de producto, comunicación con clientes y soporte de producto.",
    tags: [
      "Flujos conversacionales",
      "Integraciones IA",
      "NextJS",
      "Express",
      "Alta concurrencia",
      "Legacy",
    ],
  },
  {
    role: "Soporte",
    company: "Temputronic SAC",
    period: "2018 Feb — 2018 Jun",
    description: "Validación de datos para el usuario.",
    tags: ["Soporte", "Validación de datos"],
  },
];

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p) => {
    const links = [
      `<a href="#proyecto-${p.id}">Ver detalle →</a>`,
      p.landing
        ? `<a href="${p.landing}" target="_blank" rel="noopener">Landing →</a>`
        : "",
      p.repo
        ? `<a href="${p.repo}" target="_blank" rel="noopener">Repositorio →</a>`
        : "",
    ]
      .filter(Boolean)
      .join("");

    return `
      <article class="card">
        <h3>${p.title}</h3>
        <p>${p.tagline || p.description}</p>
        ${links ? `<div class="card-links">${links}</div>` : ""}
      </article>
    `;
  }).join("");
}

function renderProjectSpotlights() {
  const mount = document.getElementById("project-spotlights");
  if (!mount) return;

  mount.innerHTML = PROJECTS.map((p, index) => {
    const exterior = [
      p.landing
        ? `<a class="btn primary" href="${p.landing}" target="_blank" rel="noopener">Landing →</a>`
        : "",
      p.repo
        ? `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">Repositorio →</a>`
        : "",
    ]
      .filter(Boolean)
      .join("");

    const cover = p.images && p.images[0] ? p.images[0] : null;
    const thumbs =
      p.images && p.images.length > 1
        ? `<div class="gallery-thumbs" role="tablist" aria-label="Vistas de ${p.title}">
            ${p.images
              .map(
                (img, i) => `
              <button class="thumb${i === 0 ? " active" : ""}" data-project="${p.id}" data-index="${i}" aria-label="Ver ${img.caption || `vista ${i + 1}`}">
                <img src="${img.src}" alt="" loading="lazy" />
              </button>`
              )
              .join("")}
          </div>`
        : "";

    return `
      <article id="proyecto-${p.id}" class="project-spotlight${index % 2 ? " reverse" : ""}">
        <div class="spotlight-text">
          <p class="spotlight-kicker">${p.tagline || "Proyecto"}</p>
          <h3>${p.title}</h3>
          <p class="muted">${p.description}</p>
          ${
            p.stack && p.stack.length
              ? `<ul class="spotlight-stack">${p.stack.map((s) => `<li>${s}</li>`).join("")}</ul>`
              : ""
          }
          ${
            p.highlights && p.highlights.length
              ? `<ul class="spotlight-highlights">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>`
              : ""
          }
          ${exterior ? `<div class="actions">${exterior}</div>` : ""}
        </div>
        <div class="spotlight-gallery">
          ${
            cover
              ? `<button class="gallery-cover" data-project="${p.id}" data-index="0" aria-label="Ampliar ${cover.caption || p.title}">
                  <img src="${cover.src}" alt="${cover.alt || p.title}" loading="lazy" />
                  ${cover.caption ? `<span class="gallery-caption">${cover.caption} · clic para ampliar</span>` : ""}
                </button>`
              : ""
          }
          ${thumbs}
        </div>
      </article>
    `;
  }).join("");

  // Miniaturas: cambian la imagen principal
  mount.querySelectorAll(".thumb").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project-spotlight");
      const project = PROJECTS.find((p) => p.id === btn.dataset.project);
      const img = project && project.images[Number(btn.dataset.index)];
      if (!card || !img) return;
      const coverBtn = card.querySelector(".gallery-cover");
      const coverImg = card.querySelector(".gallery-cover img");
      const caption = card.querySelector(".gallery-caption");
      if (coverImg) {
        coverImg.src = img.src;
        coverImg.alt = img.alt || project.title;
      }
      if (coverBtn) coverBtn.dataset.index = btn.dataset.index;
      if (caption && img.caption) caption.textContent = `${img.caption} · clic para ampliar`;
      card.querySelectorAll(".thumb").forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Click en la principal abre el lightbox
  mount.querySelectorAll(".gallery-cover").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn.dataset.project, Number(btn.dataset.index || 0)));
  });
}

let lightboxState = { projectId: null, index: 0 };

function openLightbox(projectId, index) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project || !project.images || !project.images.length) return;
  lightboxState = { projectId, index: Math.min(index, project.images.length - 1) };
  paintLightbox();
  const lb = document.getElementById("lightbox");
  if (lb) {
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const closeBtn = lb.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
  }
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (lb) {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  lightboxState = { projectId: null, index: 0 };
}

function stepLightbox(dir) {
  const project = PROJECTS.find((p) => p.id === lightboxState.projectId);
  if (!project || project.images.length < 2) return;
  const n = project.images.length;
  lightboxState.index = (lightboxState.index + dir + n) % n;
  paintLightbox();
}

function paintLightbox() {
  const project = PROJECTS.find((p) => p.id === lightboxState.projectId);
  const lb = document.getElementById("lightbox");
  if (!project || !lb) return;
  const img = project.images[lightboxState.index];
  const el = lb.querySelector(".lightbox-img");
  const cap = lb.querySelector(".lightbox-caption");
  const count = lb.querySelector(".lightbox-count");
  if (el) {
    el.src = img.src;
    el.alt = img.alt || project.title;
  }
  if (cap) cap.textContent = img.caption ? `${project.title} — ${img.caption}` : project.title;
  if (count && project.images.length > 1) count.textContent = `${lightboxState.index + 1} / ${project.images.length}`;
  else if (count) count.textContent = "";
  const prev = lb.querySelector(".lightbox-prev");
  const next = lb.querySelector(".lightbox-next");
  const multi = project.images.length > 1;
  if (prev) prev.style.display = multi ? "" : "none";
  if (next) next.style.display = multi ? "" : "none";
}

function initLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb) return;
  lb.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lb.querySelector(".lightbox-prev").addEventListener("click", (e) => {
    e.stopPropagation();
    stepLightbox(-1);
  });
  lb.querySelector(".lightbox-next").addEventListener("click", (e) => {
    e.stopPropagation();
    stepLightbox(1);
  });
  lb.querySelector(".lightbox-backdrop").addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });
}

function renderExperience() {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;

  timeline.innerHTML = EXPERIENCE.map(
    (job) => `
      <article class="timeline-item">
        <span class="timeline-period">${job.period}</span>
        <h3>${job.role}</h3>
        <p class="timeline-company">${job.company}</p>
        <p>${job.description}</p>
        <ul class="timeline-tags">
          ${job.tags.map((t) => `<li>${t}</li>`).join("")}
        </ul>
      </article>
    `
  ).join("");
}

function initSectionIndex() {
  const links = Array.from(document.querySelectorAll(".section-index a"));
  const sections = links
    .map((a) => document.getElementById(a.dataset.section))
    .filter(Boolean);
  if (!links.length || !sections.length) return;

  const setActive = (id) => {
    links.forEach((a) => {
      const isActive = a.dataset.section === id;
      a.classList.toggle("active", isActive);
      if (isActive) {
        a.setAttribute("aria-current", "true");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  };

  // Scroll suave + marcar activo al hacer clic (feedback inmediato)
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.getElementById(a.dataset.section);
      if (!target) return;
      e.preventDefault();
      setActive(a.dataset.section);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${a.dataset.section}`);
    });
  });

  // Detectar sección visible (scroll-spy robusto, funciona con la última sección)
  const spyPoint = () => window.innerHeight * 0.4;

  const currentFromScroll = () => {
    let current = sections[0].id;
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top <= spyPoint()) current = s.id;
    });
    // Al llegar al fondo, forzar la última sección (contacto)
    const doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 8) {
      current = sections[sections.length - 1].id;
    }
    return current;
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActive(currentFromScroll());
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  setActive(currentFromScroll());
}

function initTheme() {
  const btn = document.getElementById("theme-toggle");
  const icon = btn ? btn.querySelector(".theme-icon") : null;
  const mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;

  const effectiveTheme = () =>
    document.documentElement.dataset.theme ||
    (mq && mq.matches ? "light" : "dark");

  const paint = () => {
    if (!btn) return;
    const theme = effectiveTheme();
    const isLight = theme === "light";
    if (icon) icon.textContent = isLight ? "☀" : "☾";
    btn.setAttribute("aria-pressed", String(isLight));
    btn.setAttribute(
      "aria-label",
      isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"
    );
  };

  if (btn) {
    btn.addEventListener("click", () => {
      const next = effectiveTheme() === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      paint();
    });

    // Doble clic: volver a automático (sistema)
    btn.addEventListener("dblclick", () => {
      delete document.documentElement.dataset.theme;
      try {
        localStorage.removeItem("theme");
      } catch (e) {}
      paint();
    });
  }

  if (mq && mq.addEventListener) {
    mq.addEventListener("change", () => {
      let stored = null;
      try {
        stored = localStorage.getItem("theme");
      } catch (e) {}
      if (!stored) paint();
    });
  }

  paint();
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderProjectSpotlights();
  renderExperience();
  initTheme();
  initNav();
  initSectionIndex();
  initLightbox();
  initYear();
});

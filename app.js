const PROJECTS = [
  {
    title: "Cydoflow — Automatismos",
    description:
      "Plataforma orientada al desarrollo de flujos conversacionales. Próximamente subiré docs para desglosar la plataforma desarrollada.",
    url: "https://monorepo-cydonianllama-web.vercel.app/",
  },
  // {
  //   title: "Project Two",
  //   description: "Short description of what it does and what you learned.",
  //   url: "#projects",
  // },
  // {
  //   title: "Project Three",
  //   description: "Short description of what it does and what you learned.",
  //   url: "#projects",
  // },
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

  grid.innerHTML = PROJECTS.map(
    (p) => `
      <article class="card">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <a href="${p.url}" target="_blank" rel="noopener">View →</a>
      </article>
    `
  ).join("");
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
  renderExperience();
  initNav();
  initYear();
});

const PROJECTS = [
  {
    title: "Project One",
    description: "Short description of what it does and what you learned.",
    url: "#projects",
  },
  {
    title: "Project Two",
    description: "Short description of what it does and what you learned.",
    url: "#projects",
  },
  {
    title: "Project Three",
    description: "Short description of what it does and what you learned.",
    url: "#projects",
  },
];

const EXPERIENCE = [
  {
    role: "Frontend Developer",
    company: "Company Name",
    period: "2024 — Present",
    description: "What you did, impact and technologies used.",
    tags: ["JavaScript", "CSS"],
  },
  {
    role: "Web Developer",
    company: "Previous Company",
    period: "2022 — 2024",
    description: "What you did, impact and technologies used.",
    tags: ["HTML", "JavaScript"],
  },
  {
    role: "Freelancer",
    company: "Self-employed",
    period: "2021 — 2022",
    description: "What you did, impact and technologies used.",
    tags: ["HTML", "CSS"],
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

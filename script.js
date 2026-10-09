const applications = {
  about: { title: "Sobre mim", icon: "👤", content: `
    <div class="window-kicker">UM POUCO SOBRE MIM</div>
    <div class="profile-head"><div class="profile-avatar">✦</div><div><h2>Luiz Gustavo Pereira</h2><p>Estudante de informática · 17 anos</p></div></div>
    <p>Tenho 17 anos e estou cursando o ensino médio integrado ao curso técnico de informática. Estou finalizando o 3º ano do ensino médio e construindo minha trajetória na área de tecnologia.</p>
    <div class="info-banner">🎓 <strong>Formação:</strong> Ensino médio integrado ao curso técnico de informática — 3º ano em conclusão.</div>
    <h3>Sobre mim</h3><p>Nascimento: 20/01/2009.</p>` },
  projects: { title: "Meus projetos", icon: "🗂️", content: `
    <div class="window-kicker">TRABALHOS SELECIONADOS</div><h2>Coisas que criei<span class="accent">.</span></h2>
    <p>Seus projetos ganham vida aqui. Substitua estes exemplos pelos trabalhos que mais representam você.</p>
    <div class="project-grid">
      <article class="project-card"><span class="project-icon">🪄</span><h3>Projeto em destaque</h3><p>Conte em uma frase o desafio e a solução que você criou.</p><div class="tag-list"><span class="tag">Sua tecnologia</span><span class="tag">2026</span></div></article>
      <article class="project-card"><span class="project-icon">🌱</span><h3>Um projeto especial</h3><p>Adicione o contexto, seu papel e o resultado alcançado.</p><div class="tag-list"><span class="tag">Seu papel</span><span class="tag">2025</span></div></article>
      <article class="project-card"><span class="project-icon">💡</span><h3>Ideia que virou produto</h3><p>Apresente outro trabalho, estudo ou projeto pessoal.</p><div class="tag-list"><span class="tag">Design</span><span class="tag">Web</span></div></article>
      <article class="project-card"><span class="project-icon">🚀</span><h3>Em construção</h3><p>Este espaço está pronto para sua próxima grande ideia.</p><div class="tag-list"><span class="tag">Em breve</span></div></article>
    </div>` },
  skills: { title: "Habilidades", icon: "⚡", content: `
    <div class="window-kicker">O QUE EU TRAGO PARA A MESA</div><h2>Minhas habilidades<span class="accent">.</span></h2>
    <p>Uma visão das ferramentas, conhecimentos e competências que fazem parte do meu dia a dia.</p>
    <div class="skill-group"><h3>🛠️ Ferramentas e tecnologias</h3><div class="skill-chip-list"><span class="skill-chip">Adicione uma tecnologia</span><span class="skill-chip">Outra ferramenta</span><span class="skill-chip">Seu conhecimento</span><span class="skill-chip">Mais uma habilidade</span></div></div>
    <div class="skill-group"><h3>✦ Competências</h3><div class="skill-chip-list"><span class="skill-chip">Comunicação</span><span class="skill-chip">Criatividade</span><span class="skill-chip">Trabalho em equipe</span><span class="skill-chip">Resolução de problemas</span></div></div>
    <div class="info-banner" style="margin-top:20px">Edite as etiquetas com as habilidades que melhor representam seu perfil.</div>` },
  resume: { title: "Currículo", icon: "📄", content: `
    <div class="window-kicker">FORMAÇÃO</div><h2>Meu currículo<span class="accent">.</span></h2>
    <p>Luiz Gustavo Pereira · 17 anos · Nascimento: 20/01/2009</p>
    <div class="resume-placeholder"><div><div class="resume-icon">🎓</div><h3>Ensino médio integrado</h3><p>Curso técnico de informática — cursando e finalizando o 3º ano do ensino médio.</p></div></div>` },
  contact: { title: "Contato", icon: "✉️", content: `
    <div class="window-kicker">VAMOS CONVERSAR?</div><h2>Entre em contato<span class="accent">.</span></h2>
    <div class="contact-layout"><div><p>Tem uma ideia, oportunidade ou só quer dizer oi? Vou adorar ouvir de você.</p><a class="contact-method" href="mailto:pluizgustavo478@gmail.com"><span>✉</span> pluizgustavo478@gmail.com</a><a class="contact-method" href="tel:+5547997818323"><span>☎</span> (47) 99781-8323</a></div>
    <form class="contact-form" id="contactForm"><label for="visitorName">Seu nome</label><input id="visitorName" name="name" placeholder="Como posso te chamar?" required><label for="visitorMessage">Sua mensagem</label><textarea id="visitorMessage" name="message" placeholder="Escreva sua mensagem..." required></textarea><button class="secondary-button" type="submit">Enviar mensagem ✦</button></form></div>` },
  notes: { title: "Meu bloco", icon: "📝", content: `
    <div class="window-kicker">MINHA APLICAÇÃO EXCLUSIVA</div><h2>Bloco de ideias<span class="accent">.</span></h2>
    <p>Um cantinho só seu para guardar ideias, lembretes ou rascunhos. Suas notas ficam salvas neste navegador.</p>
    <textarea class="notes-area" id="notesArea" aria-label="Suas anotações" placeholder="Comece a escrever..."></textarea><div class="notes-footer"><span id="notesStatus">Salvamento automático ativado</span><span id="notesCount">0 caracteres</span></div>` }
};

const windowsLayer = document.getElementById("windowsLayer");
const taskbarApps = document.getElementById("taskbarApps");
const launcherMenu = document.getElementById("launcherMenu");
const openWindows = new Map();
let topZIndex = 20;
let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function focusWindow(id) {
  const entry = openWindows.get(id);
  if (!entry || entry.minimized) return;
  topZIndex += 1;
  entry.window.style.zIndex = topZIndex;
  entry.taskButton.classList.add("active");
  openWindows.forEach((other, otherId) => {
    if (otherId !== id) other.taskButton.classList.remove("active");
  });
}

function openApplication(id) {
  const app = applications[id];
  if (!app) return;
  launcherMenu.classList.remove("open");
  const existing = openWindows.get(id);
  if (existing) {
    existing.window.hidden = false;
    existing.minimized = false;
    focusWindow(id);
    return;
  }

  const windowElement = document.createElement("section");
  windowElement.className = "app-window";
  windowElement.setAttribute("role", "dialog");
  windowElement.setAttribute("aria-label", app.title);
  windowElement.innerHTML = `
    <header class="window-titlebar"><div class="window-title"><span>${app.icon}</span>${app.title}</div>
      <div class="window-controls">
        <button type="button" data-action="minimize" aria-label="Minimizar">−</button>
        <button type="button" data-action="maximize" aria-label="Maximizar">□</button>
        <button type="button" class="close-window" data-action="close" aria-label="Fechar">×</button>
      </div>
    </header><div class="window-content">${app.content}</div>`;

  const taskButton = document.createElement("button");
  taskButton.className = "taskbar-app active";
  taskButton.type = "button";
  taskButton.title = app.title;
  taskButton.setAttribute("aria-label", `Mostrar ${app.title}`);
  taskButton.textContent = app.icon;
  taskButton.addEventListener("click", () => {
    const entry = openWindows.get(id);
    if (entry.minimized) {
      entry.window.hidden = false;
      entry.minimized = false;
      focusWindow(id);
    } else if (entry.taskButton.classList.contains("active")) {
      entry.window.hidden = true;
      entry.minimized = true;
      entry.taskButton.classList.remove("active");
    } else {
      focusWindow(id);
    }
  });

  windowsLayer.appendChild(windowElement);
  taskbarApps.appendChild(taskButton);
  openWindows.set(id, { window: windowElement, taskButton, minimized: false });
  focusWindow(id);

  windowElement.addEventListener("mousedown", () => focusWindow(id));
  windowElement.querySelector(".window-controls").addEventListener("click", (event) => {
    const action = event.target.closest("button")?.dataset.action;
    if (action === "minimize") {
      windowElement.hidden = true;
      openWindows.get(id).minimized = true;
      taskButton.classList.remove("active");
    } else if (action === "maximize") {
      windowElement.classList.toggle("maximized");
    } else if (action === "close") {
      windowElement.remove();
      taskButton.remove();
      openWindows.delete(id);
    }
  });

  if (id === "notes") setupNotes();
  if (id === "contact") {
    windowElement.querySelector("#contactForm").addEventListener("submit", (event) => {
      event.preventDefault();
      showToast("O formulário está pronto para conectar ao seu e-mail.");
      event.target.reset();
    });
  }
  windowElement.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.toast));
  });
  makeDraggable(windowElement);
}

function setupNotes() {
  const area = document.getElementById("notesArea");
  const status = document.getElementById("notesStatus");
  const counter = document.getElementById("notesCount");
  area.value = localStorage.getItem("portfolio-notes") || "";
  const updateCounter = () => { counter.textContent = `${area.value.length} caracteres`; };
  updateCounter();
  area.addEventListener("input", () => {
    localStorage.setItem("portfolio-notes", area.value);
    status.textContent = "Salvo automaticamente";
    updateCounter();
  });
}

function makeDraggable(windowElement) {
  const titlebar = windowElement.querySelector(".window-titlebar");
  let startX = 0, startY = 0, originX = 0, originY = 0, dragging = false;
  titlebar.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".window-controls") || windowElement.classList.contains("maximized")) return;
    dragging = true;
    const bounds = windowElement.getBoundingClientRect();
    startX = event.clientX;
    startY = event.clientY;
    originX = bounds.left + bounds.width / 2;
    originY = bounds.top + bounds.height / 2;
    windowElement.style.left = `${originX}px`;
    windowElement.style.top = `${originY - windowsLayer.getBoundingClientRect().top}px`;
    titlebar.setPointerCapture(event.pointerId);
  });
  titlebar.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const bounds = windowElement.getBoundingClientRect();
    const halfWidth = bounds.width / 2, halfHeight = bounds.height / 2;
    const x = Math.max(halfWidth + 8, Math.min(window.innerWidth - halfWidth - 8, originX + event.clientX - startX));
    const layerTop = windowsLayer.getBoundingClientRect().top;
    const y = Math.max(halfHeight + layerTop, Math.min(window.innerHeight - halfHeight - 75, originY + event.clientY - startY));
    windowElement.style.left = `${x}px`;
    windowElement.style.top = `${y - layerTop}px`;
    windowElement.style.transform = "translate(-50%, -50%)";
  });
  titlebar.addEventListener("pointerup", () => { dragging = false; });
  titlebar.addEventListener("pointercancel", () => { dragging = false; });
}

document.querySelectorAll("[data-open]").forEach((button) => {
  if (!button.classList.contains("desktop-icon")) {
    button.addEventListener("click", () => openApplication(button.dataset.open));
  }
});
document.querySelectorAll(".desktop-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    document.querySelectorAll(".desktop-icon").forEach((other) => other.classList.remove("selected"));
    icon.classList.add("selected");
  });
  icon.addEventListener("dblclick", () => openApplication(icon.dataset.open));
  icon.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openApplication(icon.dataset.open);
    }
  });
});
document.getElementById("launcher").addEventListener("click", () => launcherMenu.classList.toggle("open"));
document.addEventListener("click", (event) => {
  if (!event.target.closest("#launcher") && !event.target.closest("#launcherMenu")) launcherMenu.classList.remove("open");
});

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  document.getElementById("date").textContent = now.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
updateClock();
setInterval(updateClock, 1000);

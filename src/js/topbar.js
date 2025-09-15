document.addEventListener("DOMContentLoaded", () => {
  const topbarHTML = `
    <header class="topbar">
      <div class="topbar-container">
        <a href="/" class="logo-link">
          <img
            src="/src/images/logo-rede-talentos.png"
            alt="Logo Rede de Talentos"
            class="logo-img"
          />
        </a>
        <div class="dropdown">
          <button class="btn-adm" id="dropdownToggle">Administrador ▾</button>
          <button class="btn-adm mobile" id="dropdownToggle">Adm ▾</button>
          <div class="dropdown-menu" id="dropdownMenu">
            <a href="/src/pages/area-atuacao.html">Áreas de atuação</a>
            <a href="/src/pages/talentos.html">Talentos</a>
          </div>
        </div>
      </div>
    </header>
  `;

  const topbarContainer = document.createElement("div");
  topbarContainer.innerHTML = topbarHTML;
  document.body.insertBefore(topbarContainer, document.body.firstChild);

  // Após inserir no DOM, adicionar comportamento ao botão
  document.addEventListener("click", (e) => {
    const toggle = document.getElementById("dropdownToggle");
    const menu = document.getElementById("dropdownMenu");

    if (toggle.contains(e.target)) {
      menu.classList.toggle("show-dropdown");
    } else if (!menu.contains(e.target)) {
      menu.classList.remove("show-dropdown");
    }
  });
});

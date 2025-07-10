export async function renderizarTalentos({ containerId, filtrosId, exibirAcoes = true }) {
    const grid = document.getElementById(containerId);
    const filtros = document.getElementById(filtrosId);
    let areasSelecionadas = new Set();
    let areasMap = {};
  
    async function carregarAreas() {
      const areas = await window.supabaseApi.getAll("atuacao");
      filtros.innerHTML = "";
      areasMap = areas.reduce((map, area) => {
        map[area.id] = area.nome;
        return map;
      }, {});
  
      areas.forEach((area) => {
        const span = document.createElement("span");
        span.textContent = area.nome;
        span.dataset.areaId = area.id;
        span.classList.add("filtro-tag");
        span.addEventListener("click", () => alternarFiltro(area.id, span));
        filtros.appendChild(span);
      });
    }
  
    function alternarFiltro(areaId, span) {
      if (areasSelecionadas.has(areaId)) {
        areasSelecionadas.delete(areaId);
        span.classList.remove("filtro-selecionado");
      } else {
        areasSelecionadas.add(areaId);
        span.classList.add("filtro-selecionado");
      }
      carregarTalentos([...areasSelecionadas]);
    }
  
    async function carregarTalentos(areaIds = []) {
      let talentos = await window.supabaseApi.getAll("talento");
      const totalTalentos = document.getElementById("total-talentos");
      if (totalTalentos) totalTalentos.textContent = talentos.length;
      if (areaIds.length > 0) {
        talentos = talentos.filter((t) => areaIds.includes(t.atuacao));
      }
  
      grid.innerHTML = talentos.length === 0
        ? "<p>Nenhum talento encontrado.</p>"
        : "";
  
      talentos.forEach((talento) => {
        const areaNome = areasMap[talento.atuacao] || "Área não encontrada";
        const card = document.createElement("div");
        card.className = "card-talento";
        card.innerHTML = `
  <img src="${talento.foto_url || "/src/images/default-user.png"}" alt="${talento.nome}" class="img-talento" />
  <h3>${talento.nome}</h3>
  <div class="tags">
    <span class="tag">${areaNome}</span>
  </div>
  <div class="card-actions">
    <button class="btn" onclick="verPerfil('${talento.id}')">Ver Perfil</button>
    ${exibirAcoes ? `
      <button class="icon-btn" onclick="editarTalento('${talento.id}')" title="Editar">
        <i class="fas fa-pen"></i>
      </button>
      <button class="icon-btn" onclick="excluirTalento('${talento.id}')" title="Excluir">
        <i class="fas fa-trash"></i>
      </button>
    ` : ""}
  </div>
`;

        grid.appendChild(card);
      });
  
      // ATUALIZA ícones do Lucide após inserir no DOM
      lucide.createIcons();
    }
  
    window.verPerfil = function (id) {
      window.location.href = `/src/pages/ver-perfil.html?id=${id}`;
    };
  
    window.editarTalento = function (id) {
      window.location.href = `/src/pages/cadastro-talento.html?id=${id}`;
    };
  
    window.excluirTalento = async function (id) {
      const confirmar = confirm("Tem certeza que deseja excluir este talento?");
      if (!confirmar) return;
  
      try {
        await window.supabaseApi.remove("talento", `id=eq.${id}`);
        alert("Talento excluído com sucesso.");
        carregarTalentos([...areasSelecionadas]);
      } catch (err) {
        console.error("Erro ao excluir talento:", err);
        alert("Erro ao excluir talento.");
      }
    };
  
    await carregarAreas();
    await carregarTalentos();
  }
  
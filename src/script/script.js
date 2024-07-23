const frm = document.getElementById("form");
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

frm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nomeCliente = frm.clientName.value;
  const numeroCliente = frm.clientPhone.value;
  addClient(nomeCliente, numeroCliente);
  atualizarListaClientes();
});

function addClient(nome, numero) {
  clientes.push({
    nome: nome,
    numero: numero,
  });
  localStorage.setItem("clientes", JSON.stringify(clientes));
}
function atualizarListaClientes() {
  const clientList = document.getElementById("clientList");
  clientList.innerHTML = ""; // Limpa a lista antes de renderizar os clientes
  clientes.forEach((item, index) => {
    const clientElement = document.createElement("div");
    clientElement.classList.add("client-container");
    clientElement.innerHTML = `
      <div class="container-agendamentos">
        <p class="font-medium">Nome: ${item.nome}</p>
        <p>Telefone: ${item.numero}</p>
        <button class="remove-client-btn"  data-index="${index}">Remover Cliente</button>
        <button class="add-lembrete-btn"  data-index="${index}">Lembrete</button>
      </div>
    `;
    clientList.appendChild(clientElement);
  });
  // Adiciona os event listeners para os botões de remover
  document.querySelectorAll(".remove-client-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      clientes.splice(index, 1);
      localStorage.setItem("clientes", JSON.stringify(clientes));
      atualizarListaClientes();
    });
  });
  // Adiciona os event listeners para os botões de lembrete
  document.querySelectorAll(".add-lembrete-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      if (index !== null && index !== undefined) {
        const cliente = clientes[index];
        const mensagem = `Olá ${cliente.nome}, este é um lembrete para o seu agendamento, faltam 5 minutos para o seu atendimento!`;
        const message = encodeURIComponent(mensagem);
        const phone = cliente.numero.replace(/\D/g, ""); // Remove caracteres não numéricos do telefone
        window.open(`https://wa.me/55${phone}?text=${message}`, "_blank");
      }
    });
  });
}

// Atualiza a lista de clientes ao carregar a página
window.onload = atualizarListaClientes;
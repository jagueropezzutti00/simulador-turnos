// VARIABLES
let medicos = [];
let turnos = [];

// CARGAR TURNOS DESDE LOCALSTORAGE
const turnosGuardados = JSON.parse(localStorage.getItem("turnos"));
if (turnosGuardados) {
  turnos = turnosGuardados;
}

// FETCH JSON
fetch("data/medicos.json")
  .then(res => res.json())
  .then(data => {
    medicos = data;
    mostrarMedicos(medicos);
    mostrarTurnos();
  })
  .catch(() => {
    Swal.fire("Error", "No se pudieron cargar los médicos", "error");
  });

// MOSTRAR MÉDICOS
function mostrarMedicos(lista) {
  const contenedor = document.getElementById("medicos");
  contenedor.innerHTML = "";

  lista.forEach(medico => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${medico.nombre}</h3>
      <p>${medico.especialidad}</p>
      <button data-id="${medico.id}">Sacar turno</button>
    `;

    contenedor.appendChild(card);
  });
}

// EVENTO GLOBAL (DELEGACIÓN)
document.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.dataset.id;
    sacarTurno(id);
  }
});

// SACAR TURNO
function sacarTurno(id) {
  const medico = medicos.find(m => m.id == id);

  turnos.push(medico);

  guardarTurnos();
  mostrarTurnos();

  Swal.fire({
    title: "Turno confirmado",
    text: `Reservaste con ${medico.nombre}`,
    icon: "success"
  });
}

// MOSTRAR TURNOS
function mostrarTurnos() {
  const lista = document.getElementById("turnos");
  lista.innerHTML = "";

  turnos.forEach(turno => {
    const li = document.createElement("li");
    li.textContent = `${turno.nombre} - ${turno.especialidad}`;
    lista.appendChild(li);
  });
}

// GUARDAR EN LOCALSTORAGE
function guardarTurnos() {
  localStorage.setItem("turnos", JSON.stringify(turnos));
}

// FILTRO
document.getElementById("filtro").addEventListener("change", e => {
  const valor = e.target.value;

  if (valor === "todos") {
    mostrarMedicos(medicos);
  } else {
    const filtrados = medicos.filter(m => m.especialidad === valor);
    mostrarMedicos(filtrados);
  }
});
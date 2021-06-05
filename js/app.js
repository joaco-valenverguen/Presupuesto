const ingresos = [
  new Ingreso("Salario", 2100.0),
  new Ingreso("Venta carro", 1500),
  new Ingreso("Salario", 2100.0),
  new Ingreso("Venta carro", 1500),
  new Ingreso("Salario", 2100.0),
  new Ingreso("Venta carro", 1500),
];

const egresos = [
  new Egreso("Renta", 900),
  new Egreso("Ropa", 400),
  new Egreso("Renta", 900),
  new Egreso("Ropa", 400),
  new Egreso("Renta", 900),
  new Egreso("Ropa", 400),
];

function cargarApp() {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
}

function totalIngresos() {
  let totalIngreso = 0;
  for (ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
}

function totalEgresos() {
  let totalEgreso = 0;
  for (egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
}

function cargarCabecero() {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

function formatoMoneda(valor) {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}
function formatoPorcentaje(valor) {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
}

function cargarIngresos() {
  let ingresosHTML = "";
  for (ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

function crearIngresoHTML(ingreso) {
  let ingresoHtml = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn">
          <ion-icon name="close-circle" onclick='eliminarIngreso(${
            ingreso.id
          })'></ion-icon>
        </button>
      </div>
    </div>
  </div>`;
  return ingresoHtml;
}
function eliminarIngreso(id) {
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarApp();
}

function cargarEgresos() {
  let egresosHTML = "";
  for (egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
}
function crearEgresoHTML(egreso) {
  let egresoHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">+ ${formatoMoneda(egreso.valor)}</div>
      <div class="elemento_porcentaje">${formatoPorcentaje(
        egreso.valor / totalEgresos()
      )}</div>
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn">
        <ion-icon name="close-circle" onclick='eliminarEgreso(${
          egreso.id
        })'></ion-icon>        </button>
      </div>
    </div>
  </div>`;
  return egresoHTML;
}
function eliminarEgreso(id) {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  egresos.splice(indiceEliminar, 1);
  cargarApp();
}

function agregarDato() {
  let forma = document.forms["forma"];
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];
  if ((descripcion.value != "") & (valor.value != "")) {
    if (tipo.value === "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
      cargarApp();
    } else if (tipo.value === "egreso") {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarApp();
    }
  }
}

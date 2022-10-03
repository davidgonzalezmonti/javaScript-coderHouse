let carrito = [];

const contenedorDeStickers = document.getElementById("contenedorStickers");
const tablaCarrito = document.getElementById("tablaCarrito");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const formBuscador = document.getElementById("formBuscador");
const botonMsjComprar = document.getElementById("botonComprar");

//--------------------------------------------------------------------------------------------------------------------------------------------
 
fetch ("/stockStickers.json")
.then((respuesta) => respuesta.json())
.then ((stockStickers => dataStickers(stockStickers)))

const dataStickers = (stockStickers) => {
  
stockStickers.forEach((sticker) => insertarStock(sticker));

formBuscador.addEventListener("submit", (e) => {
  e.preventDefault();
  let opcionesBusquedaUI = document.getElementById("opcionesBusqueda").value;
  filtradoPorAnime(opcionesBusquedaUI);
  formBuscador.reset();
});

  const filtradoPorAnime =  (opcionesBusqueda) => {
    contenedorDeStickers.innerHTML = "";
    stockStickers.find((sticker) => sticker.anime === opcionesBusqueda) !== undefined ? (stockStickerFiltrado = stockStickers.filter((sticker) => sticker.anime === opcionesBusqueda)) : (stockStickerFiltrado = stockStickers);
    stockStickerFiltrado.forEach((sticker) => insertarStock(sticker));
  };

  const agregarAlCarrito = (stickerId) => {
    const existe = carrito.some((producto) => producto.id === stickerId);
    if (existe) {
      const sticker = carrito.map((producto) => {producto.id === stickerId && producto.cantidad++});
    } else {
      const sticker = stockStickers.find((producto) => producto.id === stickerId);
      carrito.push(sticker);
    }
    visualizarCarrito();
  };

  function insertarStock(sticker) {
    const divSticker = document.createElement("div");
    divSticker.classList.add("card","m-4","p-3","mb-5","bg-body","rounded","diseñoCard");
    divSticker.style = "width: 18rem";
    divSticker.innerHTML = `
     <img src="${sticker.imagen}" class="card-img-top" alt="${sticker.nombre}" />
     <div class="card-body">
        <h5 class="card-title">${sticker.nombre}</h5>
        <p class="card-text">
          Precio: <b>$${sticker.precio}</b> <br />
          Tamaño: ${sticker.tamaño}<br />
          Anime: ${sticker.anime}
        </p>
        <button href="#" id="agregar${sticker.id}" class="btn btn-primary">Agregar al carrito</button>
     </div>`;
  
    contenedorDeStickers.appendChild(divSticker);
  
    const buttonAgregar = document.getElementById(`agregar${sticker.id}`);
    buttonAgregar.addEventListener("click", () => {agregarAlCarrito(sticker.id);});
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    visualizarCarrito();
  }
});

vaciarCarrito.addEventListener("click", () => {
  Swal.fire({
    title: 'Desea vaciar el carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, vaciar el carrito!'
  }).then((result) => {  
    if (result.isConfirmed) {
      Swal.fire(
        'Carrito vacio',
        'Has vaciado el carrito',
        'success'
      )
      carrito.length = 0;
      localStorage.removeItem("carrito");
      visualizarCarrito();
    }
  })
});

botonMsjComprar.addEventListener("click", () => {
  carrito == 0 ? Swal.fire({position: 'center', icon: 'error', title: '¡Upss! Su carrito esta vacio.', showConfirmButton: false, timer: 1500}) : 
  Swal.fire({position: 'center', icon: 'success', title: '¡Compra realizada con exito!', showConfirmButton: false, timer: 1500})
  carrito.length = 0;
  localStorage.removeItem("carrito");
  visualizarCarrito();
})

const eliminarDelCarrito = (stickerId) => {
  const sticker = carrito.find((producto) => producto.id === stickerId);
  const indice = carrito.indexOf(sticker);
  sticker.cantidad == 1 ? carrito.splice(indice, 1) : sticker.cantidad--;
  localStorage.removeItem("carrito");

  visualizarCarrito();
};

const visualizarCarrito = () => {
  tablaCarrito.innerHTML = "";
  carrito.forEach((sticker) => {
    const trVisualizarCarrito = document.createElement("tr");
    trVisualizarCarrito.classList.add("productoCarrito");
    trVisualizarCarrito.innerHTML = `
<th scope="row">${sticker.id}</th>
<td>${sticker.nombre}</td>
<td>${sticker.tamaño}</td>
<td>${sticker.cantidad} </td>
<td>${sticker.precio * sticker.cantidad}</td>
<td><i onclick="eliminarDelCarrito(${sticker.id})" class="fas fa-trash-alt"></i></p></td>`;
    
tablaCarrito.appendChild(trVisualizarCarrito);
localStorage.setItem("carrito", JSON.stringify(carrito));
  });
  totalCarrito();
};

const totalCarrito = () => {
  let total = 0;
  const precioTotal = document.getElementById("precioTotal");
  carrito.forEach((producto) => {
    const precio = Number(producto.precio);
    total = total + precio * producto.cantidad;
  });
  precioTotal.innerHTML = `$${total}`;
};

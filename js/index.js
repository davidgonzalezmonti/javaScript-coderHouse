const stockStickers = [

  { id: 1, cantidad: 1, nombre: "Mugiwara", tamaño: "10x10", precio: 200, imagen: "./img/mugiwara.jpg", anime: "One Piece" },
  { id: 2, cantidad: 1, nombre: "Luffy", tamaño: "8x8", precio: 150, imagen: "./img/luffy.png", anime: "One Piece" },
  { id: 3, cantidad: 1, nombre: "Zoro", tamaño: "8x8", precio: 150, imagen: "./img/zoro.jpg", anime: "One Piece" },
  { id: 4, cantidad: 1, nombre: "Goku", tamaño: "8x8", precio: 150, imagen: "./img/goku.png", anime: "Dragon Ball Z" },
  { id: 5, cantidad: 1, nombre: "Vegeta", tamaño: "6x6", precio: 120, imagen: "./img/vegeta.png", anime: "Dragon Ball Z" },
  { id: 6, cantidad: 1, nombre: "Kid Buu", tamaño: "6x6", precio: 120, imagen: "./img/boo.jpg", anime: "Dragon Ball Z" },
  { id: 7, cantidad: 1, nombre: "Tanjiro", tamaño: "8x8", precio: 150, imagen: "./img/tanjiro.png", anime: "Kimetsu no Yaiba" },
  { id: 8, cantidad: 1, nombre: "Inosuke", tamaño: "6x6", precio: 120, imagen: "./img/inosuke.png", anime: "Kimetsu no Yaiba" },
  { id: 9, cantidad: 1, nombre: "Zenitsu", tamaño: "6x6", precio: 120, imagen: "./img/zenitsu.png", anime: "Kimetsu no Yaiba" },

];

let carrito = []

const contenedorDeStickers = document.getElementById("contenedorStickers")
const tablaCarrito = document.getElementById("tablaCarrito")
const vaciarCarrito = document.getElementById("vaciarCarrito")
const formBuscador = document.getElementById("formBuscador")

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    visualizarCarrito()
  }
})

stockStickers.forEach(sticker => {
  const divSticker = document.createElement("div");
  divSticker.classList.add("card", "m-4", "p-3", "mb-5", "bg-body", "rounded", "diseñoCard");
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
   </div>
        `

  contenedorDeStickers.appendChild(divSticker);


  //* Boton para agregar al carrito
  const button = document.getElementById(`agregar${sticker.id}`)
  button.addEventListener("click", () => {
    agregarAlCarrito(sticker.id)
  })


})

const agregarAlCarrito = (stickerId) => {
  const existe = carrito.some(prod => prod.id === stickerId)

  if (existe) {
    const sticker = carrito.map(prod => {
      if (prod.id === stickerId) {
        prod.cantidad++
      }
    })
  } else {
    const sticker = stockStickers.find((prod) => prod.id === stickerId)
    carrito.push(sticker)
  }
  visualizarCarrito()
}

const eliminarDelCarrito = (stickerId) => {
  const sticker = carrito.find((prod) => prod.id === stickerId)
  const indice = carrito.indexOf(sticker)
  if (sticker.cantidad === 1) {
    carrito.splice(indice, 1)
  } else {
    sticker.cantidad--
  }
  visualizarCarrito()

}

vaciarCarrito.addEventListener("click", () => {
  carrito.length = 0
  visualizarCarrito()
})


//* Genero un carrito con su estructura HTML
const visualizarCarrito = () => {
  tablaCarrito.innerHTML = ""
  carrito.forEach((sticker) => {
    const trVisualizarCarrito = document.createElement("tr")
    trVisualizarCarrito.classList.add("productoCarrito")
    trVisualizarCarrito.innerHTML = `
<th scope="row">${sticker.id}</th>
<td>${sticker.nombre}</td>
<td>${sticker.tamaño}</td>
<td>${sticker.cantidad} </td>
<td>${sticker.precio * sticker.cantidad}</td>
<td><i onclick="eliminarDelCarrito(${sticker.id})" class="fas fa-trash-alt"></i></p></td>


`
    tablaCarrito.appendChild(trVisualizarCarrito)

    localStorage.setItem("carrito", JSON.stringify(carrito))

  })

  totalCarrito()

}

const totalCarrito = () => {
  let total = 0
  const precioTotal = document.getElementById("precioTotal")
  carrito.forEach((sticker) => {
    const precio = Number(sticker.precio)
    total = total + precio * sticker.cantidad
  })

  precioTotal.innerHTML = `$${total}`
}

const botonComprar = document.getElementById("botonComprar")
botonComprar.addEventListener("click", () => {
  alert("GRACIAS POR SU COMPRA")
})


formBuscador.addEventListener("submit", (e) => {
  e.preventDefault();
  let opcionesBusquedaUI = document.getElementById("opcionesBusqueda").value;
  console.log(opcionesBusquedaUI);
  filtradoPorAnime(opcionesBusquedaUI)

  formBuscador.reset()
})

const filtradoPorAnime = (opcionesBusqueda) => {
  contenedorDeStickers.innerHTML = ""
let stockStickerFiltrado;
  if(stockStickers.find(sticker => sticker.anime === opcionesBusqueda) !== undefined){
    stockStickerFiltrado = stockStickers.filter(sticker => sticker.anime === opcionesBusqueda)
  } else {
    stockStickerFiltrado = stockStickers
  }

  stockStickerFiltrado.forEach(sticker => {
  const divSticker = document.createElement("div");
  divSticker.classList.add("card", "m-4", "p-3", "mb-5", "bg-body", "rounded", "diseñoCard");
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
   </div>
        `

  contenedorDeStickers.appendChild(divSticker);

  const button = document.getElementById(`agregar${sticker.id}`)
  button.addEventListener("click", () => {
    agregarAlCarrito(sticker.id)
  })
  
})

}


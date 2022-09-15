
let carrito = []

  const stickers = [

    { nombre: "Mugiwara", tamaño: "10x10", precio: 200, imagen: "./img/mugiwara.jpg" },
    { nombre: "Luffy", tamaño: "8x8", precio: 150, imagen: "./img/luffy.png" },
    { nombre: "Zoro", tamaño: "8x8", precio: 150, imagen: "./img/zoro.jpg" },
    { nombre: "Goku", tamaño: "8x8", precio: 150, imagen: "./img/goku.png" },
    { nombre: "Vegeta", tamaño: "6x6", precio: 120, imagen: "./img/vegeta.png" },
    { nombre: "Kid Buu", tamaño: "6x6", precio: 120, imagen: "./img/boo.jpg" },
    { nombre: "Tanjiro", tamaño: "8x8", precio: 150, imagen: "./img/tanjiro.png" },
    { nombre: "Inosuke", tamaño: "6x6", precio: 120, imagen: "./img/inosuke.png" },
    { nombre: "Zenitsu", tamaño: "6x6", precio: 120, imagen: "./img/zenitsu.png" },
    
    ];
    

function mostrarStickers(stickers) {
    const contenedorDeStickers = document.querySelector(".row")
    contenedorDeStickers.innerHTML = ""

    //por cada una
    stickers.forEach(sticker => {
        const divSticker = document.createElement("div"); 
        divSticker.classList.add("card", "m-4", "shadow-lg", "p-3", "mb-5", "bg-body","rounded");
        divSticker.style = "width: 18rem";
        divSticker.innerHTML = `
  
    <img src="${sticker.imagen}" class="card-img-top" alt="${sticker.titulo}" />
    <div class="card-body">
      <h5 class="card-title">${sticker.nombre}</h5>
      <p class="card-text">
        Precio: $${sticker.precio}</b> <br />
        Tamaño: ${sticker.tamaño}<br />
        Anime: One Piece
      </p>
      <a href="#" class="btn button btn-primary">Agregar al carrito</a>
    </div>
        `

      contenedorDeStickers.appendChild(divSticker);
    
    })


}

mostrarStickers(stickers)


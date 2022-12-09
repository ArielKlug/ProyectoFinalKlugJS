const stockProductos = [
    {
      id: 1,
      nombre: "Placa de video RTX 3070ti",
      cantidad: 1,
      desc: "Placa de video RTX 3070ti casi cualquier juego funciona con ella",
      precio: 1200,
      img: "img/PlacaRTX3070ti.webp",
    },
    {
      id: 2,
      nombre: "Procesador i5 11va Generación",
      cantidad: 1,
      desc: "Procesador potente",
      precio: 1500,
      img: "img/coreI511GEN.jpg",
    },
    {
      id: 3,
      nombre: "Procesador i5 12va Generación",
      cantidad: 1,
      desc: "Última generación de la saga Core i5",
      precio: 1570,
      img: "img/Corei512GEN.jpg",
    },
    {
      id: 4,
      nombre: "Procesador i7 10ma Generación",
      cantidad: 1,
      desc: "Procesador ideal para ediciones multimedia",
      precio: 1000,
      img: "img/Corei710maGEN.webp",
    },
    {
      id: 5,
      nombre: "Procesador i7 11va Generación",
      cantidad: 1,
      desc: "Para ediciones multimedia potentes, incluso desarrollo de videojuegos",
      precio: 1200,
      img: "img/Corei711GEN.webp",
    },
    {
      id: 6,
      nombre: "Placa de video GTX 1650",
      cantidad: 1,
      desc: "Una buena placa para gamers y económica",
      precio: 1200,
      img: "img/PlacaGTX1650.jpg",
    },
    {
      id: 7,
      nombre: "Placa de video RTX 3050",
      cantidad: 1,
      desc: "Placa de video RTX 3050",
      precio: 1400,
      img: "img/PlacaRTX3050.png",
    },
    {
      id: 8,
      nombre: "Placa de video RTX 3060",
      cantidad: 1,
      desc: "Placa de video RTX 3060",
      precio: 1200,
      img: "img/PlacaRTX3060.webp",
    },
    {
      id: 9,
      nombre: "Placa de video RTX 3080",
      cantidad: 1,
      desc: "Placa de video RTX 3080",
      precio: 1400,
      img: "img/PlacaRTX3080.png",
    },
    {
      id: 10,
      nombre: "Placa de video RTX 3080ti",
      cantidad: 1,
      desc: "Placa de video RTX 3080ti aún mas pontente que su versión común",
      precio: 1200,
      img: "img/PlacaRTX3080ti.jpg",
    },
  ];
  let carrito = [];
  
  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  const activarFuncion = document.querySelector("#activarFuncion");
  const procesarCompra = document.querySelector("#procesarCompra");
  const totalProceso = document.querySelector("#totalProceso");
  const formulario = document.querySelector('#procesar-pago')
  
  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
  });
  if(formulario){
    formulario.addEventListener('submit', enviarCompra)
  }
  
  
  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }
  
  if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        location.href = "compra.html";
      }
    });
  }
  
  stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
  });
  
  const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)
  
    if(existe){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carrito.push(item)
    }
    mostrarCarrito()
  
  };
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
    
        `;
      });
    }
  
    if (carrito.length === 0) {
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } 
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  function eliminarProducto(id) {
    const componenteId = id;
    carrito = carrito.filter((componente) => componente.id !== componenteId);
    mostrarCarrito();
  }
  function procesarPedido() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  
   function enviarCompra(e){
     e.preventDefault()
     const cliente = document.querySelector('#cliente').value
     const email = document.querySelector('#correo').value
  
     if(email === '' || cliente == ''){
       Swal.fire({
         title: "¡Debes completar tu email y nombre!",
         text: "Rellena el formulario",
         icon: "error",
         confirmButtonText: "Aceptar",
     })
   } else {
  
    const btn = document.querySelector('#button');

  
     btn.value = 'Enviando...';
      
     const spinner = document.querySelector('#spinner')
     spinner.classList.add('d-flex')
     spinner.classList.remove('d-none')
  
     setTimeout(() => {
       spinner.classList.remove('d-flex')
       spinner.classList.add('d-none')
       formulario.reset()
  
       const alertExito = document.createElement('p')
       alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
       alertExito.textContent = 'Compra realizada correctamente'
       formulario.appendChild(alertExito)
  
       setTimeout(() => {
         alertExito.remove()
         carritoContenedor.reset
       }, 3000)
         
       
       const listaCompra = document.querySelector("#lista-compra tbody");
         listaCompra.remove()
       btn.value = 'Finalizar compra';
       
       totalProceso.remove()
       
     }, 3000)    
   }
   localStorage.clear()
  
   }
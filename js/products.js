document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/productos.json')
      .then(res => res.json())
      .then(data => mostrarProductos(data))
      .catch(err => console.error('Error cargando productos:', err));
  });
  
  function mostrarProductos(productos) {
    const contenedor = document.getElementById('productos-lista');
    contenedor.innerHTML = '';
  
    productos.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'producto-card';
  
      card.innerHTML = `
        <img src="../assets/img/${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p class="precio">S/ ${prod.precio}</p>
        <p class="descripcion">${prod.descripcion}</p>
        <input type="number" min="1" value="1" class="cantidad-input" />
        <button class="btn-comprar">Agregar</button>
      `;
  
      const btn = card.querySelector('.btn-comprar');
      const inputCantidad = card.querySelector('.cantidad-input');
  
      btn.addEventListener('click', () => {
        const cantidad = parseInt(inputCantidad.value) || 1;
        agregarAlCarrito({ ...prod, cantidad });
      });
  
      contenedor.appendChild(card);
    });
  }
  
  function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    producto.precio = Number(producto.precio); // Asegura que sea número
    producto.cantidad = Number(producto.cantidad); // Asegura que sea número
  
    const index = carrito.findIndex(item => item.nombre === producto.nombre);
    if (index >= 0) {
      carrito[index].cantidad += producto.cantidad;
    } else {
      carrito.push(producto);
    }
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${producto.nombre} x${producto.cantidad} agregado al carrito`);
    actualizarContadorCarrito();
  }
  
  
  
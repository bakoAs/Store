window.addEventListener('DOMContentLoaded', () => {
    cargarComponente('header', '../components/header.html');
    cargarComponente('footer', '../components/footer.html');
    cargarComponente('whatsapp', '../components/whatsapp.html');
  });
  
  function cargarComponente(nombre, url) {
    fetch(url)
      .then(res => res.text())
      .then(html => {
        document.getElementById(`${nombre}-container`).innerHTML = html;
      })
      .catch(err => console.error(`Error cargando ${nombre}:`, err));
  }

  /*Mostrar el cierre de sesión si esta logeado */

  setTimeout(() => {
    const nav = document.getElementById('nav-links');
    if (localStorage.getItem('loggedIn') === 'true') {
      nav.innerHTML = `
        <a href="index.html">Inicio</a>
        <a href="categoria.html">Productos</a>
        <a href="#" id="cerrar-sesion">Cerrar Sesión</a>
      `;
    }
  }, 300); // Esperamos a que el header cargue
  
  /* Para actualizar el contador del carrito */
  function actualizarContadorCarrito() {
    const contador = document.getElementById('carrito-contador');
    if (contador) {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      contador.textContent = carrito.length;
  
      // Animación
      contador.classList.add('bounce');
      setTimeout(() => contador.classList.remove('bounce'), 300);
    }
  }

  setTimeout(() => {
    const nav = document.getElementById('nav-links');
    if (localStorage.getItem('loggedIn') === 'true') {
      nav.innerHTML = `
        <a href="index.html">Inicio</a>
        <a href="categoria.html">Productos</a>
        <a href="carrito.html" class="carrito-link">🛒 <span id="carrito-contador">0</span></a>
        <a href="#" id="cerrar-sesion">Cerrar Sesión</a>
      `;
    } else {
      nav.innerHTML = `
        <a href="index.html">Inicio</a>
        <a href="categoria.html">Productos</a>
        <a href="carrito.html" class="carrito-link">🛒 <span id="carrito-contador">0</span></a>
        <a href="login.html">Iniciar Sesión</a>
      `;
    }
  
    actualizarContadorCarrito(); // Mostrar cantidad actual
  }, 300);
  
  
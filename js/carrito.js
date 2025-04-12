document.addEventListener('DOMContentLoaded', () => {
    const carritoLista = document.getElementById('carrito-lista');
    const totalSpan = document.getElementById('carrito-total');
    const form = document.getElementById('form-entrega');
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    renderizarCarrito();
  
    if (usuario) {
      document.getElementById('entrega-nombres').value = usuario.nombres || '';
      document.getElementById('entrega-apellidos').value = usuario.apellidos || '';
      document.getElementById('entrega-dni').value = usuario.dni || '';
      document.getElementById('entrega-telefono').value = usuario.telefono || '';
      document.getElementById('entrega-region').value = usuario.region || '';
      document.getElementById('entrega-provincia').value = usuario.provincia || '';
      document.getElementById('entrega-distrito').value = usuario.distrito || '';
      document.getElementById('entrega-direccion').value = usuario.direccion || '';
      document.getElementById('entrega-referencia').value = usuario.referencia || '';
    }
  
    form.addEventListener('submit', e => {
      e.preventDefault();
  
      const nombre = document.getElementById('entrega-nombres').value;
      const apellidos = document.getElementById('entrega-apellidos').value;
      const telefono = document.getElementById('entrega-telefono').value;
      const direccion = document.getElementById('entrega-direccion').value;
      const distrito = document.getElementById('entrega-distrito').value;
      const provincia = document.getElementById('entrega-provincia').value;
      const region = document.getElementById('entrega-region').value;
  
      const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2);
      const listaProductos = carrito.map(p => `- ${p.nombre} x${p.cantidad} (S/ ${p.precio})`).join('\n');
  
      const mensaje = `
  Pedido Realizado: Total S/ ${total}
  ${nombre} ${apellidos}
  ${telefono}
  ${direccion}, ${distrito}, ${provincia}, ${region}
  
  ${listaProductos}
      `.trim();
  
      const url = `https://wa.me/51908974202?text=${encodeURIComponent(mensaje)}`;
      alert("Se abrirá WhatsApp para completar el pedido. Adjunta tu constancia de pago en el chat.");
      localStorage.removeItem('carrito');
      window.open(url, '_blank');
    });
  
    function renderizarCarrito() {
      if (carrito.length === 0) {
        carritoLista.innerHTML = '<p>¡Malas noticias! Tu carrito está vacío🙁 </p>';
        totalSpan.textContent = 'S/ 0.00';
        return;
      }
  
      let total = 0;
      carritoLista.innerHTML = carrito.map((item, index) => {
        const cantidad = Number(item.cantidad) || 1;
        const precio = Number(item.precio) || 0;
        const subtotal = cantidad * precio;
        total += subtotal;
  
        return `
          <div class="item-carrito">
            <div>
              <strong>${item.nombre}</strong> x${cantidad} - S/ ${subtotal.toFixed(2)}
            </div>
            <div class="carrito-botones">
              <button class="btn-aumentar" data-index="${index}" title="Aumentar">➕</button>
              <button class="btn-eliminar" data-index="${index}" title="Disminuir/Eliminar">🗑️</button>
            </div>
          </div>`;
      }).join('');
  
      totalSpan.textContent = `S/ ${total.toFixed(2)}`;
  
      document.querySelectorAll('.btn-aumentar').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          carrito[index].cantidad += 1;
          guardarYActualizar();
        });
      });
  
      document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
          } else {
            carrito.splice(index, 1);
          }
          guardarYActualizar();
        });
      });
    }
  
    function guardarYActualizar() {
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderizarCarrito();
    }
  });
  
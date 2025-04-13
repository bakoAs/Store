document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
  
        if (storedUser && storedUser.email === email && storedUser.password === password) {
          alert('Inicio de sesión exitoso');
          localStorage.setItem('loggedIn', 'true');
          window.location.href = 'index.html';
        } else {
          alert('Correo o contraseña incorrectos');
        }
      });
    }
  
    if (registerForm) {
      registerForm.addEventListener('submit', e => {
        e.preventDefault();
  
        const usuario = {
          nombres: document.getElementById('nombres').value,
          apellidos: document.getElementById('apellidos').value,
          dni: document.getElementById('dni').value,
          telefono: document.getElementById('telefono').value,
          email: document.getElementById('email').value,
          region: document.getElementById('region').value,
          distrito: document.getElementById('distrito').value,
          direccion: document.getElementById('direccion').value,
          referencia: document.getElementById('referencia').value,
          password: document.getElementById('password').value
        };
  
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert('Registro exitoso, ahora puedes iniciar sesión');
        window.location.href = 'login.html';
      });
    }
  
    // Cierre de sesión desde cualquier página
    const cerrarSesionBtn = document.getElementById('cerrar-sesion');
    if (cerrarSesionBtn) {
      cerrarSesionBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        alert('Sesión cerrada');
        window.location.href = 'index.html';
      });
    }
  });
  
  
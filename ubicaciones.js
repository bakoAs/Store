document.addEventListener('DOMContentLoaded', () => {
    const regionSelect = document.getElementById('region');
    const provinciaSelect = document.getElementById('provincia');
    const distritoSelect = document.getElementById('distrito');
  
    fetch('../data/ubicaciones.json')
      .then(res => res.json())
      .then(data => {
        cargarRegiones(data);
  
        regionSelect.addEventListener('change', () => {
          const region = regionSelect.value;
          cargarProvincias(data, region);
          provinciaSelect.disabled = false;
          distritoSelect.innerHTML = '<option value="">Selecciona un distrito</option>';
          distritoSelect.disabled = true;
        });
  
        provinciaSelect.addEventListener('change', () => {
          const region = regionSelect.value;
          const provincia = provinciaSelect.value;
          cargarDistritos(data, region, provincia);
          distritoSelect.disabled = false;
        });
      })
      .catch(error => console.error('Error cargando ubicaciones:', error));
  
    function cargarRegiones(data) {
      for (const region in data) {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
      }
    }
  
    function cargarProvincias(data, region) {
      provinciaSelect.innerHTML = '<option value="">Selecciona una provincia</option>';
      for (const provincia in data[region]) {
        const option = document.createElement('option');
        option.value = provincia;
        option.textContent = provincia;
        provinciaSelect.appendChild(option);
      }
    }
  
    function cargarDistritos(data, region, provincia) {
      distritoSelect.innerHTML = '<option value="">Selecciona un distrito</option>';
      data[region][provincia].forEach(distrito => {
        const option = document.createElement('option');
        option.value = distrito;
        option.textContent = distrito;
        distritoSelect.appendChild(option);
      });
    }
  });
  
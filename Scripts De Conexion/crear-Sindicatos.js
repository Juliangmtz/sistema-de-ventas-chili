
    const API_URL = 'https://pruebachiliwings.onrender.com/sindicato'; // Cambia la URL a la de tu servidor

    // Función para crear un nuevo Sindicato
    async function createSindicato() {
      const folio = document.getElementById('folio').value;
      const descripcion = document.getElementById('descripcion').value;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folio, descripcion })
      });

      if (response.ok) {
        alert('Sindicato creado exitosamente');
        getAllSindicatos();
      } else {
        const error = await response.json();
        alert('Error: ' + error.message);
      }
    }

    // Función para obtener y mostrar todos los Sindicatos
    async function getAllSindicatos() {
      const response = await fetch(API_URL);
      const sindicatos = await response.json();

      const sindicatosList = document.getElementById('sindicatosList');
      sindicatosList.innerHTML = '';
      sindicatos.forEach(sindicato => {
        const listItem = document.createElement('li');
        listItem.textContent = `Folio: ${sindicato.folio}, Descripción: ${sindicato.descripcion}`;
        sindicatosList.appendChild(listItem);
      });
    }

    // Función para actualizar un Sindicato por folio
    async function updateSindicato() {
      const folio = document.getElementById('folio').value;
      const descripcion = document.getElementById('descripcion').value;

      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folio, descripcion })
      });

      if (response.ok) {
        alert('Sindicato actualizado exitosamente');
        getAllSindicatos();
      } else {
        const error = await response.json();
        alert('Error: ' + error.message);
      }
    }

    // Función para eliminar un Sindicato por folio
    async function deleteSindicato(folio) {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folio })
      });

      if (response.ok) {
        alert('Sindicato eliminado exitosamente');
        getAllSindicatos();
      } else {
        const error = await response.json();
        alert('Error: ' + error.message);
      }
    }

    // Llamar a la función para cargar todos los Sindicatos al cargar la página
    document.addEventListener('DOMContentLoaded', getAllSindicatos);
  
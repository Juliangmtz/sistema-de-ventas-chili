// Método GET para cargar y mostrar empleados al iniciar la página
async function getAllEmpleados() {
    try {
      const response = await fetch('https://pruebachiliwings.onrender.com/empleado'); // Verifica que esta URL sea correcta
      if (!response.ok) throw new Error("Error en la respuesta de la API");

      const empleados = await response.json();
      displayEmpleados(empleados); // Mostrar empleados en el HTML
    } catch (error) {
      console.error("Error al cargar empleados:", error);
    }
  }

  // Función para mostrar los empleados en el listado
  function displayEmpleados(empleados) {
    const empleadosList = document.getElementById("empleadosList");
    empleadosList.innerHTML = ''; // Limpiar la lista antes de cargar nuevos datos
    empleados.forEach(emp => {
      const li = document.createElement("li");
      li.textContent = `${emp.folio} - ${emp.empleado} (${emp.tipo_empleado}) - Sindicato: ${emp.sindicato} - Ganancia: ${emp.ganancia}`;
      empleadosList.appendChild(li);
    });
  }

  // Ejecutar getAllEmpleados al cargar la página
  document.addEventListener("DOMContentLoaded", getAllEmpleados);


    // Función para crear un nuevo empleado
    async function createEmpleado() {
      const folio = document.getElementById('folio').value;
      const tipo_empleado = document.getElementById('tipo_empleado').value;
      const empleado = document.getElementById('empleado').value;
      const sindicato = document.getElementById('sindicato').value;
      const ganancia = document.getElementById('ganancia').value;

      const response = await fetch('https://pruebachiliwings.onrender.com/empleado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folio, tipo_empleado, empleado, sindicato, ganancia })
      });

      if (response.ok) {
        alert('Empleado creado');
        getAllEmpleados(); // Recargar la lista después de crear
        clearForm();
      } else {
        const error = await response.json();
        alert(`Error al crear empleado: ${error.message}`);
      }
    }

   // Función para actualizar un empleado existente
async function updateEmpleado() {
    const folio = document.getElementById('folio').value;
    const tipo_empleado = document.getElementById('tipo_empleado').value;
    const empleado = document.getElementById('empleado').value;
    const sindicato = document.getElementById('sindicato').value;
    const ganancia = document.getElementById('ganancia').value;
  
    try {
      // Enviar la solicitud PUT al servidor para actualizar el empleado
      const response = await fetch(`https://pruebachiliwings.onrender.com/empleado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folio, tipo_empleado, empleado, sindicato, ganancia })
      });
  
      if (response.ok) {
        alert('Empleado actualizado');
        
        // Recargar los empleados después de la actualización
        getAllEmpleados();  // Asegúrate de que esta función esté definida correctamente
  
        // Limpiar el formulario
        clearForm();
      } else {
        const error = await response.json();
        alert(`Error al actualizar empleado: ${error.message}`);
      }
    } catch (error) {
      alert(`Error en la solicitud: ${error.message}`);
    }
  }
  
  // Función para limpiar el formulario
  function clearForm() {
    document.getElementById('folio').value = '';
    document.getElementById('tipo_empleado').value = '';
    document.getElementById('empleado').value = '';
    document.getElementById('sindicato').value = '';
    document.getElementById('ganancia').value = '';
  }
  

   // Función para eliminar un empleado por folio
async function deleteEmpleado(folio) {
    try {
        const response = await fetch('https://pruebachiliwings.onrender.coms/empleado', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ folio }) // Enviamos el folio en el cuerpo de la solicitud
        });

        if (response.ok) {
            alert('Empleado eliminado');
            getAllEmpleados(); // Recargar la lista después de eliminar
        } else {
            const error = await response.json();
            alert(`Error al eliminar empleado: ${error.message}`);
        }
    } catch (error) {
        console.error("Error al eliminar empleado:", error);
    }
}

  // Función para mostrar los empleados en el listado
function displayEmpleados(empleados) {
    const empleadosList = document.getElementById("empleadosList");
    empleadosList.innerHTML = ''; // Limpiar la lista antes de cargar nuevos datos
  
    empleados.forEach(emp => {
      const li = document.createElement("li");
      li.textContent = `${emp.folio} - ${emp.empleado} (${emp.tipo_empleado}) - Sindicato: ${emp.sindicato} - Ganancia: ${emp.ganancia}`;
  
     // Crear el botón de eliminar
const deleteButton = document.createElement("button");
deleteButton.textContent = "Eliminar";
deleteButton.onclick = () => deleteEmpleado(emp.folio);  // Llamamos a deleteEmpleado con el folio del empleado

// Aplicar estilos al botón
deleteButton.style.fontWeight = "500";
deleteButton.style.padding = "10px 30px";
deleteButton.style.fontSize = "16px";
deleteButton.style.border = "none";
deleteButton.style.borderRadius = "8px";
deleteButton.style.backgroundColor = "#d2691e";
deleteButton.style.color = "#ffffff";
deleteButton.style.cursor = "pointer";
deleteButton.style.transition = "background-color 0.3s ease";
deleteButton.style.marginRight = "40px";

// Agregar efecto de hover
deleteButton.onmouseover = () => deleteButton.style.backgroundColor = "#b34700";
deleteButton.onmouseout = () => deleteButton.style.backgroundColor = "#d2691e";

      li.appendChild(deleteButton);  // Añadir el botón al elemento de la lista
      empleadosList.appendChild(li);
    });
  }
  
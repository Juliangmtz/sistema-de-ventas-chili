// Cargar todos los clientes
async function loadClientes() {
    try {
      const response = await fetch('https://pruebachiliwings.onrender.com/clientes');
      const clientes = await response.json();
  
      const clientesList = document.getElementById("clientesList");
      clientesList.innerHTML = "";
  
      clientes.forEach(cliente => {
        const li = document.createElement("li");
        li.textContent = `Folio: ${cliente.folio} - Nombre: ${cliente.cliente} - Dirección: ${cliente.direccion} - Teléfono: ${cliente.telefono}`;
  
       // Crear contenedor para los botones y aplicar estilos
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";           // Alinea los botones horizontalmente
  buttonContainer.style.justifyContent = "flex-start"; // Alinea los botones a la izquierda
  buttonContainer.style.marginTop = "10px";         // Añade espacio entre la información y los botones

  // Crear el botón de editar
  const editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.onclick = () => loadClienteForEdit(cliente);

  // Aplicar estilos al botón de editar
  editButton.style.fontWeight = "500";
  editButton.style.padding = "10px 30px";
  editButton.style.fontSize = "16px";
  editButton.style.border = "none";
  editButton.style.borderRadius = "8px";
  editButton.style.backgroundColor = "#d2691e";
  editButton.style.color = "#ffffff";
  editButton.style.cursor = "pointer";
  editButton.style.transition = "background-color 0.3s ease";
  editButton.style.marginRight = "10px";
  editButton.style.display = "inline-block";

  // Crear el botón de eliminar
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.onclick = () => deleteCliente(cliente.folio);

  // Aplicar estilos al botón de eliminar
  deleteButton.style.fontWeight = "500";
  deleteButton.style.padding = "10px 30px";
  deleteButton.style.fontSize = "16px";
  deleteButton.style.border = "none";
  deleteButton.style.borderRadius = "8px";
  deleteButton.style.backgroundColor = "#d2691e";
  deleteButton.style.color = "#ffffff";
  deleteButton.style.cursor = "pointer";
  deleteButton.style.transition = "background-color 0.3s ease";
  deleteButton.style.display = "inline-block";

  // Agregar los botones al contenedor de botones
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

        clientesList.appendChild(li);
        li.appendChild(buttonContainer);
      });
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  }
  
  // Crear un nuevo cliente
  async function createCliente() {
    const folio = document.getElementById("folio").value;
    const cliente = document.getElementById("cliente").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
  
    try {
      const response = await fetch('https://pruebachiliwings.onrender.com/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folio, cliente, direccion, telefono })
      });
  
      if (response.ok) {
        alert('Cliente creado');
        loadClientes();
        document.getElementById("clienteForm").reset();
      } else {
        const error = await response.json();
        alert(`Error al crear cliente: ${error.message}`);
      }
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  }
  
  // Eliminar un cliente
  async function deleteCliente(folio) {
    try {
      const response = await fetch('https://pruebachiliwings.onrender.com/clientes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folio })
      });
  
      if (response.ok) {
        alert('Cliente eliminado');
        loadClientes();
      } else {
        const error = await response.json();
        alert(`Error al eliminar cliente: ${error.message}`);
      }
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  }
  
  // Cargar cliente para editar
  function loadClienteForEdit(cliente) {
    document.getElementById("folio").value = cliente.folio;
    document.getElementById("cliente").value = cliente.cliente;
    document.getElementById("direccion").value = cliente.direccion;
    document.getElementById("telefono").value = cliente.telefono;
  }
  
  // Actualizar un cliente
  async function updateCliente() {
    const folio = document.getElementById("folio").value;
    const cliente = document.getElementById("cliente").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
  
    try {
      const response = await fetch('https://pruebachiliwings.onrender.com/clientes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folio, cliente, direccion, telefono })
      });
  
      if (response.ok) {
        alert('Cliente actualizado');
        loadClientes();
        document.getElementById("clienteForm").reset();
      } else {
        const error = await response.json();
        alert(`Error al actualizar cliente: ${error.message}`);
      }
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
    }
  }
  
  // Llamar a loadClientes al cargar la página
  document.addEventListener("DOMContentLoaded", loadClientes);
  
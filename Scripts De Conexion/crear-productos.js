// Cargar todos los productos
async function loadProductos() {
  try {
    const response = await fetch('https://pruebachiliwings.onrender.com/productos');
    const productos = await response.json();

    console.log("Productos recibidos:", productos); 

    const productosList = document.getElementById("productosList");
    productosList.innerHTML = "";  // Limpiar el contenedor antes de agregar los nuevos productos

    productos.forEach(producto => {
      const li = document.createElement("li");
      li.textContent = `Folio: ${producto.folio} - Descripción: ${producto.descripcion}  - Costo: ${producto.costo} - Precio: ${producto.precio} - Venta: ${producto.venta} - menu: ${producto.menu} `; // Agregar Menu

      // Crear contenedor para los botones y aplicar estilos
      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.justifyContent = "flex-start";
      buttonContainer.style.marginTop = "10px";

      // Crear el botón de editar
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.onclick = () => loadProductoForEdit(producto);
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

      // Crear el botón de eliminar
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.onclick = () => deleteProducto(producto.folio);
      deleteButton.style.fontWeight = "500";
      deleteButton.style.padding = "10px 30px";
      deleteButton.style.fontSize = "16px";
      deleteButton.style.border = "none";
      deleteButton.style.borderRadius = "8px";
      deleteButton.style.backgroundColor = "#d2691e";
      deleteButton.style.color = "#ffffff";
      deleteButton.style.cursor = "pointer";
      deleteButton.style.transition = "background-color 0.3s ease";

      // Agregar los botones al contenedor de botones
      buttonContainer.appendChild(editButton);
      buttonContainer.appendChild(deleteButton);

      // Agregar el contenedor de botones al <li>
      li.appendChild(buttonContainer);
      productosList.appendChild(li);
    });

  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// Crear un nuevo producto
async function createProducto() {
  const folio = document.getElementById("folio").value;
  const descripcion = document.getElementById("descripcion").value;
  const costo = document.getElementById("costo").value;
  const precio = document.getElementById("precio").value;
  const venta = document.getElementById("venta").value;
  const menu = document.getElementById("menu").value; // Nuevo campo de Menu

  // Mostrar los valores obtenidos para verificar que todos se estén capturando correctamente
  console.log("Datos enviados:", { folio, descripcion, costo, precio, venta, menu: menu });

  try {
    const response = await fetch('https://pruebachiliwings.onrender.com/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folio, descripcion, costo, precio, venta, menu: menu }) // Incluir Menu
    });

    if (response.ok) {
      alert('Producto creado');
      loadProductos();
      document.getElementById("productoForm").reset();
    } else {
      const error = await response.json();
      alert(`Error al crear producto: ${error.message}`);
    }
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
}

// Eliminar un producto
async function deleteProducto(folio) {
  try {
    const response = await fetch('https://pruebachiliwings.onrender.com/productos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folio })
    });

    if (response.ok) {
      alert('Producto eliminado');
      loadProductos();
    } else {
      const error = await response.json();
      alert(`Error al eliminar producto: ${error.message}`);
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
}

// Cargar producto para editar
function loadProductoForEdit(producto) {
  document.getElementById("folio").value = producto.folio;
  document.getElementById("descripcion").value = producto.descripcion;
  document.getElementById("costo").value = producto.costo;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("venta").value = producto.venta;
  document.getElementById("menu").value = producto.menu; // Cargar Menu para edición
}

// Actualizar un producto
async function updateProducto() {
  const folio = document.getElementById("folio").value;
  const descripcion = document.getElementById("descripcion").value;
  const costo = document.getElementById("costo").value;
  const precio = document.getElementById("precio").value;
  const venta = document.getElementById("venta").value;
  const menu = document.getElementById("menu").value; // Nuevo campo de Menu

  try {
    const response = await fetch('https://pruebachiliwings.onrender.com/productos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folio, descripcion, costo, precio, venta, menu: menu }) // Incluir Menu
    });

    if (response.ok) {
      alert('Producto actualizado');
      loadProductos();
      document.getElementById("productoForm").reset();
    } else {
      const error = await response.json();
      alert(`Error al actualizar producto: ${error.message}`);
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error);
  }
}

// Llamar a loadProductos al cargar la página
document.addEventListener("DOMContentLoaded", loadProductos);

const apiUrl = 'http://localhost:8080/api/properties'; // Cambia esto según tu configuración

// Función para cargar propiedades desde el backend
async function loadProperties() {
    const response = await fetch(apiUrl);
    const properties = await response.json();
    const propertyList = document.getElementById('propertyList');
    propertyList.innerHTML = ''; // Limpiar la lista antes de cargar nuevas propiedades

    properties.forEach(property => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${property.address}</strong>
            <span>Precio: $${property.price}, Tamaño: ${property.size} m²</span>
            <button onclick="deleteProperty(${property.id})">Eliminar</button>
            <button onclick="showUpdateForm(${property.id}, '${property.address}', ${property.price}, ${property.size}, '${property.description}')">Actualizar</button>
        `;
        propertyList.appendChild(li);
    });
}

// Función para agregar una nueva propiedad
document.getElementById('propertyForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const property = {
        address: document.getElementById('address').value,
        price: parseFloat(document.getElementById('price').value),
        size: parseFloat(document.getElementById('size').value),
        description: document.getElementById('description').value
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(property)
    });

    document.getElementById('propertyForm').reset(); // Reiniciar el formulario
    loadProperties(); // Volver a cargar la lista de propiedades
});

// Función para eliminar una propiedad
async function deleteProperty(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    loadProperties(); // Volver a cargar la lista de propiedades
}

// Función para mostrar el formulario de actualización
function showUpdateForm(id, address, price, size, description) {
    document.getElementById('address').value = address;
    document.getElementById('price').value = price;
    document.getElementById('size').value = size;
    document.getElementById('description').value = description;

    const form = document.getElementById('propertyForm');
    form.onsubmit = async (e) => {
        e.preventDefault();

        const updatedProperty = {
            address: document.getElementById('address').value,
            price: parseFloat(document.getElementById('price').value),
            size: parseFloat(document.getElementById('size').value),
            description: document.getElementById('description').value
        };

        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProperty)
        });

        form.reset(); // Reiniciar el formulario
        loadProperties(); // Volver a cargar la lista de propiedades
    };
}

// Cargar las propiedades al iniciar la aplicación
loadProperties();

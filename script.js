// Referencias a los elementos del HTML
const form = document.getElementById('shoeForm');
const inventoryList = document.getElementById('inventoryList');

// Array para guardar los zapatos (Simula la base de datos)
// Intentamos cargar datos guardados previamente, si no hay, iniciamos vacío
let shoes = JSON.parse(localStorage.getItem('shoeStock')) || [];

// Función para renderizar (dibujar) la tabla
function renderTable() {
    inventoryList.innerHTML = ''; // Limpiar tabla antes de redibujar

    shoes.forEach((shoe, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${shoe.model}</td>
            <td>${shoe.size}</td>
            <td>$${shoe.price}</td>
            <td>${shoe.quantity}</td>
            <td>
                <button class="delete-btn" onclick="deleteShoe(${index})">Eliminar</button>
            </td>
        `;
        inventoryList.appendChild(row);
    });
}

// Función para agregar un zapato
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que la página se recargue sola

    // Obtener valores de los inputs
    const model = document.getElementById('model').value;
    const size = document.getElementById('size').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    // Crear objeto zapato
    const newShoe = {
        model: model,
        size: size,
        price: price,
        quantity: quantity
    };

    // Agregar al array
    shoes.push(newShoe);

    // Guardar en LocalStorage (Persistencia de datos)
    localStorage.setItem('shoeStock', JSON.stringify(shoes));

    // Actualizar la tabla visualmente
    renderTable();

    // Limpiar el formulario
    form.reset();
});

// Función para eliminar un zapato (Accesible globalmente)
window.deleteShoe = function (index) {
    // Confirmar acción
    if (confirm('¿Estás seguro de eliminar este zapato del inventario previamente?')) {
        shoes.splice(index, 1); // Eliminar del array
        localStorage.setItem('shoeStock', JSON.stringify(shoes)); // Actualizar memoria
        renderTable(); // Actualizar vista
    }
}

// Cargar la tabla al iniciar la página
renderTable();
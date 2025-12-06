

// Función que ordena precios y retorna extremos
// Parámetros: precios (array de números)
// Retorna: objeto con array ordenado y valores extremos
function ordenarPrecios(precios) {
  // Validar que se proporcione un array
  if (!Array.isArray(precios) || precios.length === 0) {
    return {
      exito: false,
      error: 'Debe proporcionar un array no vacío de precios',
      preciosOrdenados: [],
      precioMaximo: 0,
      precioMinimo: 0
    };
  }

  // Validar que todos sean números positivos
  for (let i = 0; i < precios.length; i++) {
    if (typeof precios[i] !== 'number' || precios[i] < 0) {
      return {
        exito: false,
        error: `Precio en posición ${i} inválido. Debe ser un número positivo`,
        preciosOrdenados: [],
        precioMaximo: 0,
        precioMinimo: 0
      };
    }
  }

  // Crear copia del array para no modificar el original
  const copiaPrecios = [...precios];

  // Ordenar de mayor a menor usando sort() con comparador numérico
  // Comparador: b - a ordena descendente (mayor a menor)
  copiaPrecios.sort((a, b) => b - a);

  // Extraer valores extremos del array ordenado
  const precioMaximo = copiaPrecios[0];
  const precioMinimo = copiaPrecios[copiaPrecios.length - 1];

  return {
    exito: true,
    preciosOriginales: precios.join(', '),
    preciosOrdenados: copiaPrecios,
    preciosFormateados: copiaPrecios.map(p => `$${p.toFixed(2)}`).join(', '),
    precioMaximo,
    precioMinimo,
    diferencia: (precioMaximo - precioMinimo).toFixed(2),
    cantidadProductos: precios.length,
    promedio: (precios.reduce((a, b) => a + b, 0) / precios.length).toFixed(2)
  };
}

// Función auxiliar para obtener datos de prueba
function obtenerDatosPrueba() {
  return {
    ejemplos: [
      {
        precios: [100, 50, 150, 200, 75],
        descripcion: 'Precios variados'
      },
      {
        precios: [1000, 2000, 500, 1500],
        descripcion: 'Productos premium'
      },
      {
        precios: [10, 20, 15, 25, 30],
        descripcion: 'Precios bajos'
      }
    ]
  };
}

// Exportar funciones para uso en el HTML
window.ejercicio4 = {
  ordenarPrecios,
  obtenerDatosPrueba
};

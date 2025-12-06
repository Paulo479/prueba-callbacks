

// Función que calcula el inventario final
// Parámetros: inicial (número), vendida (número), recibida (número)
// Retorna: objeto con inventario final y estado
function calcularInventario(inicial, vendida, recibida) {
  // Validar que todos los parámetros sean números válidos
  if (typeof inicial !== 'number' || typeof vendida !== 'number' || typeof recibida !== 'number') {
    return {
      exito: false,
      error: 'Todos los valores deben ser números',
      inventarioFinal: 0,
      estado: 'ERROR'
    };
  }

  // Validar que no haya valores negativos
  if (inicial < 0 || vendida < 0 || recibida < 0) {
    return {
      exito: false,
      error: 'No se permiten valores negativos',
      inventarioFinal: 0,
      estado: 'ERROR'
    };
  }

  // Validar que no se vendan más de lo disponible
  if (vendida > inicial + recibida) {
    return {
      exito: false,
      error: `No se pueden vender ${vendida} unidades. Stock disponible: ${inicial + recibida}`,
      inventarioFinal: 0,
      estado: 'ERROR'
    };
  }

  // Calcular inventario final: inicial - vendida + recibida
  const inventarioFinal = inicial - vendida + recibida;

  // Determinar estado del inventario
  let estado, mensaje;
  if (inventarioFinal < 5) {
    estado = 'CRÍTICO';
    mensaje = `⚠ Inventario crítico: Solo ${inventarioFinal} unidades disponibles`;
  } else if (inventarioFinal < 10) {
    estado = 'BAJO';
    mensaje = `⚠ Inventario bajo: ${inventarioFinal} unidades disponibles`;
  } else {
    estado = 'ESTABLE';
    mensaje = `✓ Inventario estable: ${inventarioFinal} unidades disponibles`;
  }

  return {
    exito: true,
    inventarioFinal,
    inicial,
    vendida,
    recibida,
    estado,
    mensaje
  };
}

// Función auxiliar para obtener datos de prueba
function obtenerDatosPrueba() {
  return {
    ejemplos: [
      { inicial: 50, vendida: 10, recibida: 5, descripcion: 'Caso normal' },
      { inicial: 10, vendida: 7, recibida: 0, descripcion: 'Caso crítico' },
      { inicial: 100, vendida: 0, recibida: 0, descripcion: 'Sin movimiento' },
      { inicial: 20, vendida: 5, recibida: 15, descripcion: 'Con reposición' }
    ]
  };
}

// Exportar funciones para uso en el HTML
window.ejercicio2 = {
  calcularInventario,
  obtenerDatosPrueba
};

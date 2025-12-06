

// Función que registra productos sin duplicados usando parámetros rest
// Parámetros: ...productos (argumentos variables de tipo string)
// Retorna: array de productos únicos
function registrarProductos(...productos) {
  // Validar que se proporcionen productos
  if (productos.length === 0) {
    return {
      exito: false,
      error: 'Debe proporcionar al menos un producto',
      productos: [],
      cantidadProductos: 0,
      cantidadDuplicados: 0
    };
  }

  // Validar que todos los argumentos sean strings no vacíos
  const productosValidos = [];
  const productosInvalidos = [];

  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    
    if (typeof producto !== 'string' || producto.trim() === '') {
      productosInvalidos.push({
        indice: i,
        valor: producto,
        razon: 'No es string o está vacío'
      });
    } else {
      // Normalizar: trim y convertir a minúsculas para comparación
      productosValidos.push(producto.trim().toLowerCase());
    }
  }

  // Si hay productos inválidos, reportarlos
  if (productosInvalidos.length > 0) {
    return {
      exito: false,
      error: 'Algunos productos son inválidos',
      productosInvalidos,
      cantidadInvalidos: productosInvalidos.length
    };
  }

  // Usar Set para eliminar duplicados automáticamente
  // Set solo almacena valores únicos
  const productosUnicos = [...new Set(productosValidos)];

  // Calcular cuántos duplicados fueron eliminados
  const cantidadDuplicados = productosValidos.length - productosUnicos.length;

  return {
    exito: true,
    productosIngresados: productos.length,
    cantidadProductos: productosUnicos.length,
    productos: productosUnicos.map(p => 
      p.charAt(0).toUpperCase() + p.slice(1) // Capitalizar primera letra
    ),
    cantidadDuplicados,
    estadisticas: {
      totalIngresados: productos.length,
      totalUnicos: productosUnicos.length,
      porcentajeDuplicados: cantidadDuplicados > 0 
        ? (cantidadDuplicados / productos.length * 100).toFixed(2) + '%'
        : '0%'
    }
  };
}

// Función auxiliar para obtener datos de prueba
function obtenerDatosPrueba() {
  return {
    ejemplos: [
      {
        argumentos: 'Laptop, Mouse, Teclado, Monitor',
        descripcion: 'Productos sin duplicados'
      },
      {
        argumentos: 'Laptop, Mouse, Laptop, Teclado, Mouse',
        descripcion: 'Productos con duplicados'
      },
      {
        argumentos: 'iPhone 14, iPad Pro, iPhone 14, AirPods, iPad Pro',
        descripcion: 'Productos Apple con duplicados'
      },
      {
        argumentos: 'Escritorio, Silla, Lámpara, Estante, Escritorio',
        descripcion: 'Muebles con duplicados'
      }
    ]
  };
}

// Exportar funciones para uso en el HTML
window.ejercicio7 = {
  registrarProductos,
  obtenerDatosPrueba
};

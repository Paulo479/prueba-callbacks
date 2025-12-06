
// Función que busca en catálogo usando callback personalizado
// Parámetros: catalogo (array de objetos), callback (función de filtro)
// El callback recibe un curso y retorna true si cumple el criterio
// Retorna: array de cursos filtrados
function buscarCursos(catalogo, callback) {
  // Validar que se proporcione un array
  if (!Array.isArray(catalogo)) {
    return {
      exito: false,
      error: 'El catálogo debe ser un array',
      cursosEncontrados: [],
      cantidad: 0
    };
  }

  // Validar que el callback sea una función
  if (typeof callback !== 'function') {
    return {
      exito: false,
      error: 'El criterio debe ser una función (callback)',
      cursosEncontrados: [],
      cantidad: 0
    };
  }

  // Validar que el catálogo no esté vacío
  if (catalogo.length === 0) {
    return {
      exito: true,
      error: 'Catálogo vacío',
      cursosEncontrados: [],
      cantidad: 0,
      mensaje: 'No hay cursos registrados'
    };
  }

  // Aplicar filter() con el callback para obtener cursos que cumplen criterio
  const cursosEncontrados = catalogo.filter(callback);

  return {
    exito: true,
    totalCursosEnCatalogo: catalogo.length,
    cursosEncontrados,
    cantidad: cursosEncontrados.length,
    porcentaje: (cursosEncontrados.length / catalogo.length * 100).toFixed(2) + '%',
    mensaje: `Se encontraron ${cursosEncontrados.length} de ${catalogo.length} cursos`
  };
}

// Función auxiliar que retorna un catálogo de ejemplo
function obtenerCatalogoPrueba() {
  return [
    { id: 1, nombre: 'JavaScript Básico', categoria: 'Programación', duracion: 20, nivel: 'Principiante' },
    { id: 2, nombre: 'JavaScript Avanzado', categoria: 'Programación', duracion: 40, nivel: 'Intermedio' },
    { id: 3, nombre: 'React', categoria: 'Programación', duracion: 35, nivel: 'Intermedio' },
    { id: 4, nombre: 'CSS3 Moderno', categoria: 'Diseño Web', duracion: 25, nivel: 'Principiante' },
    { id: 5, nombre: 'HTML5 Semántico', categoria: 'Diseño Web', duracion: 15, nivel: 'Principiante' },
    { id: 6, nombre: 'Node.js', categoria: 'Programación', duracion: 30, nivel: 'Intermedio' },
    { id: 7, nombre: 'Diseño UX/UI', categoria: 'Diseño', duracion: 50, nivel: 'Avanzado' },
    { id: 8, nombre: 'SQL Databases', categoria: 'Bases de Datos', duracion: 28, nivel: 'Intermedio' }
  ];
}

// Funciones de criterios de ejemplo (callbacks predefinidos)
const criteriosPredefinidos = {
  // Buscar por categoría
  porCategoria: (categoria) => (curso) => curso.categoria === categoria,
  
  // Buscar por duración menor a X horas
  duracionCorta: (curso) => curso.duracion <= 25,
  
  // Buscar por nivel
  porNivel: (nivel) => (curso) => curso.nivel === nivel,
  
  // Buscar por palabra en nombre
  porPalabra: (palabra) => (curso) => 
    curso.nombre.toLowerCase().includes(palabra.toLowerCase()),
  
  // Buscar cursos avanzados largos
  cursosAvanzados: (curso) => 
    curso.nivel === 'Avanzado' && curso.duracion > 40
};

// Función auxiliar para obtener datos de prueba
function obtenerDatosPrueba() {
  return {
    catalogo: obtenerCatalogoPrueba(),
    ejemplosBusqueda: [
      {
        descripcion: 'Cursos de Programación',
        callback: criteriosPredefinidos.porCategoria('Programación'),
        tipoFiltro: 'Por categoría'
      },
      {
        descripcion: 'Cursos cortos (≤25 horas)',
        callback: criteriosPredefinidos.duracionCorta,
        tipoFiltro: 'Por duración'
      },
      {
        descripcion: 'Cursos para Principiantes',
        callback: criteriosPredefinidos.porNivel('Principiante'),
        tipoFiltro: 'Por nivel'
      },
      {
        descripcion: 'Cursos que contienen "JavaScript"',
        callback: criteriosPredefinidos.porPalabra('JavaScript'),
        tipoFiltro: 'Por palabra clave'
      }
    ]
  };
}

// Exportar funciones para uso en el HTML
window.ejercicio8 = {
  buscarCursos,
  obtenerCatalogoPrueba,
  criteriosPredefinidos,
  obtenerDatosPrueba
};

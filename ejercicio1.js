

// Función principal que valida la asistencia
// Parámetros: aprendices (array de nombres), nombreBuscado (string)
// Retorna: objeto con booleano de resultado y mensaje descriptivo
function validarAsistencia(aprendices, nombreBuscado) {
  // Validar que los parámetros sean correctos
  if (!Array.isArray(aprendices) || typeof nombreBuscado !== 'string') {
    return {
      encontrado: false,
      mensaje: 'Error: datos inválidos'
    };
  }

  // Normalizar el nombre buscado: eliminar espacios y convertir a minúsculas
  const nombreNormalizado = nombreBuscado.trim().toLowerCase();

  // Normalizar todos los nombres del array para comparación consistente
  const aprendicesNormalizados = aprendices.map(nombre => 
    nombre.trim().toLowerCase()
  );

  // Usar includes para verificar si el nombre existe en la lista
  const encontrado = aprendicesNormalizados.includes(nombreNormalizado);

  // Retornar resultado con mensaje descriptivo
  if (encontrado) {
    return {
      encontrado: true,
      mensaje: `✓ El aprendiz "${nombreBuscado}" está inscrito en el curso.`,
      estado: 'INSCRITO'
    };
  } else {
    return {
      encontrado: false,
      mensaje: `✗ El aprendiz "${nombreBuscado}" NO está inscrito en el curso.`,
      estado: 'NO_INSCRITO'
    };
  }
}

// Función auxiliar para obtener datos de prueba
function obtenerDatosPrueba() {
  return {
    aprendices: [
      'Juan García',
      'María López',
      'Carlos Rodríguez',
      'Ana Martínez',
      'Pedro Sánchez',
      'Laura González',
    ],
    ejemplosBusqueda: ['Juan García', 'pablo', 'Laura González']
  };
}

// Exportar funciones para uso en el HTML
window.ejercicio1 = {
  validarAsistencia,
  obtenerDatosPrueba
};

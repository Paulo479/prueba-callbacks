
// Función declarada que calcula el promedio y rendimiento
// Parámetros: notas (array de números)
// Retorna: objeto con promedio, rendimiento y detalles
function calcularPromedio(notas) {
  // Validar que se proporcione un array
  if (!Array.isArray(notas) || notas.length === 0) {
    return {
      exito: false,
      error: 'Debe proporcionar un array no vacío de notas',
      promedio: 0,
      rendimiento: 'N/A'
    };
  }

  // Validar que todas las notas sean números válidos en rango 0-5
  for (let i = 0; i < notas.length; i++) {
    const nota = notas[i];
    if (typeof nota !== 'number' || nota < 0 || nota > 5) {
      return {
        exito: false,
        error: `Nota en posición ${i} inválida. Debe estar entre 0 y 5`,
        promedio: 0,
        rendimiento: 'N/A'
      };
    }
  }

  // Calcular suma usando ciclo for (como requiere el ejercicio)
  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma += notas[i];
  }

  // Calcular promedio
  const promedio = suma / notas.length;

  // Determinar rendimiento según rango
  let rendimiento, descripcion, recomendacion;
  if (promedio >= 4.0) {
    rendimiento = 'ALTO';
    descripcion = 'Excelente desempeño académico';
    recomendacion = 'Mantén tu nivel y considera cursos avanzados';
  } else if (promedio >= 3.0) {
    rendimiento = 'MEDIO';
    descripcion = 'Desempeño satisfactorio';
    recomendacion = 'Puedes mejorar enfocándote en temas débiles';
  } else {
    rendimiento = 'BAJO';
    descripcion = 'Desempeño insuficiente';
    recomendacion = 'Se recomienda tutorías adicionales y mayor dedicación';
  }

  return {
    exito: true,
    promedio: promedio.toFixed(2),
    rendimiento,
    descripcion,
    recomendacion,
    cantidadNotas: notas.length,
    notasIngresadas: notas.join(', '),
    notaMaxima: Math.max(...notas),
    notaMinima: Math.min(...notas)
  };
}

// Función auxiliar para obtener datos de prueba
function obtenerDatosPrueba() {
  return {
    ejemplos: [
      {
        notas: [4.5, 4.8, 4.2, 4.6],
        descripcion: 'Buen rendimiento'
      },
      {
        notas: [3.5, 3.2, 3.8, 3.1],
        descripcion: 'Rendimiento medio'
      },
      {
        notas: [2.5, 2.8, 2.2, 2.9],
        descripcion: 'Bajo rendimiento'
      },
      {
        notas: [5.0, 4.5, 4.8],
        descripcion: 'Excelente rendimiento'
      }
    ]
  };
}


window.ejercicio3 = {
  calcularPromedio,
  obtenerDatosPrueba
};

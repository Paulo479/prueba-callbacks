

// Función que selecciona paciente con mayor prioridad
// Parámetros: pacientes (array de objetos con prioridad y edad)
// Retorna: objeto del paciente con mayor prioridad
function seleccionarPacientePrioritario(pacientes) {
  // Validar que se proporcione un array
  if (!Array.isArray(pacientes) || pacientes.length === 0) {
    return {
      exito: false,
      error: 'Debe proporcionar un array no vacío de pacientes',
      pacientePrioritario: null
    };
  }

  // Validar que todos tengan campos prioridad y edad
  for (let i = 0; i < pacientes.length; i++) {
    const paciente = pacientes[i];
    if (typeof paciente.prioridad !== 'number' || typeof paciente.edad !== 'number') {
      return {
        exito: false,
        error: `Paciente en posición ${i} no tiene prioridad o edad válidos`,
        pacientePrioritario: null
      };
    }
  }

  // Usar reduce para encontrar paciente con mayor prioridad
  // Si hay empate, comparar por edad (mayor edad gana)
  const pacientePrioritario = pacientes.reduce((pacienteActual, pacienteNuevo) => {
    // Comparar prioridades (mayor es más urgente)
    if (pacienteNuevo.prioridad > pacienteActual.prioridad) {
      return pacienteNuevo;
    }
    // Si prioridades son iguales, comparar por edad (mayor edad es más urgente)
    else if (pacienteNuevo.prioridad === pacienteActual.prioridad && 
             pacienteNuevo.edad > pacienteActual.edad) {
      return pacienteNuevo;
    }
    // En caso contrario, mantener paciente actual
    return pacienteActual;
  });

  return {
    exito: true,
    pacientePrioritario,
    totalPacientes: pacientes.length,
    ordenPrioritario: generarOrdenPrioritario(pacientes),
    estadisticas: {
      pacientesEnEspera: pacientes.length - 1,
      prioridadMaxima: Math.max(...pacientes.map(p => p.prioridad)),
      edadPromedio: (pacientes.reduce((sum, p) => sum + p.edad, 0) / pacientes.length).toFixed(1)
    }
  };
}

// Función auxiliar que genera orden de atención completa
function generarOrdenPrioritario(pacientes) {
  // Ordenar pacientes por prioridad descendente, luego por edad descendente
  const ordenado = [...pacientes].sort((a, b) => {
    if (b.prioridad !== a.prioridad) {
      return b.prioridad - a.prioridad; // Mayor prioridad primero
    }
    return b.edad - a.edad; // A igual prioridad, mayor edad primero
  });

  return ordenado.map((p, indice) => ({
    posicion: indice + 1,
    nombre: p.nombre,
    prioridad: p.prioridad,
    edad: p.edad,
    diagnostico: p.diagnostico || 'N/A',
    estado: indice === 0 ? 'EN ATENCIÓN' : `EN ESPERA (${indice})`
  }));
}

// Función auxiliar para obtener datos de prueba
function obtenerDatosPrueba() {
  return {
    ejemplos: [
      {
        pacientes: [
          { nombre: 'Juan García', edad: 45, prioridad: 3, diagnostico: 'Infarto' },
          { nombre: 'María López', edad: 72, prioridad: 4, diagnostico: 'Accidente cerebrovascular' },
          { nombre: 'Carlos Pérez', edad: 38, prioridad: 2, diagnostico: 'Apendicitis' },
          { nombre: 'Ana Martínez', edad: 28, prioridad: 1, diagnostico: 'Gripe' }
        ],
        descripcion: 'Prioridades claras y diferentes'
      },
      {
        pacientes: [
          { nombre: 'Pedro Sánchez', edad: 65, prioridad: 3, diagnostico: 'Fractura' },
          { nombre: 'Laura González', edad: 70, prioridad: 3, diagnostico: 'Hemorragia interna' },
          { nombre: 'Diego Rodríguez', edad: 55, prioridad: 3, diagnostico: 'Quemaduras' }
        ],
        descripcion: 'Empate en prioridad (resolución por edad)'
      },
      {
        pacientes: [
          { nombre: 'Sofía Ramírez', edad: 35, prioridad: 5, diagnostico: 'Paro cardíaco' },
          { nombre: 'Miguel Torres', edad: 42, prioridad: 2, diagnostico: 'Migraña' },
          { nombre: 'Isabel Vargas', edad: 58, prioridad: 4, diagnostico: 'Insuficiencia renal' }
        ],
        descripcion: 'Prioridades mixtas'
      }
    ]
  };
}

// Exportar funciones para uso en el HTML
window.ejercicio12 = {
  seleccionarPacientePrioritario,
  generarOrdenPrioritario,
  obtenerDatosPrueba
};

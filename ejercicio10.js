

// Función que fusiona usuarios de dos sistemas sin duplicados
// Parámetros: usuariosA (array), usuariosB (array)
// Retorna: array fusionado sin duplicados
function fusionarUsuarios(usuariosA, usuariosB) {
  // Validar que ambos parámetros sean arrays
  if (!Array.isArray(usuariosA) || !Array.isArray(usuariosB)) {
    return {
      exito: false,
      error: 'Ambos parámetros deben ser arrays',
      usuariosFusionados: [],
      duplicadosEliminados: []
    };
  }

  // Usar spread operator para combinar arrays
  // [...usuariosA, ...usuariosB] crea nuevo array con elementos de ambos
  const usuariosCombinados = [...usuariosA, ...usuariosB];

  if (usuariosCombinados.length === 0) {
    return {
      exito: true,
      usuariosFusionados: [],
      usuariosA: usuariosA.length,
      usuariosB: usuariosB.length,
      totalFusionados: 0,
      duplicadosEliminados: [],
      mensaje: 'No hay usuarios para fusionar'
    };
  }

  // Mapeo para detectar duplicados por documento
  const mapaUsuarios = new Map();
  const duplicadosDetectados = [];

  // Procesar cada usuario
  for (const usuario of usuariosCombinados) {
    const documento = usuario.documento;

    if (mapaUsuarios.has(documento)) {
      // Usuario duplicado encontrado
      const usuarioExistente = mapaUsuarios.get(documento);
      
      // Contar campos de información
      const camposExistente = Object.keys(usuarioExistente).length;
      const camposNuevo = Object.keys(usuario).length;

      // Conservar usuario con mayor información
      if (camposNuevo > camposExistente) {
        duplicadosDetectados.push({
          documento,
          usuarioEliminado: usuarioExistente,
          usuarioConservado: usuario,
          razon: `Conservado por tener más campos (${camposNuevo} vs ${camposExistente})`
        });
        mapaUsuarios.set(documento, usuario);
      } else {
        duplicadosDetectados.push({
          documento,
          usuarioEliminado: usuario,
          usuarioConservado: usuarioExistente,
          razon: `Mantenido por tener igual o más campos (${camposExistente} vs ${camposNuevo})`
        });
      }
    } else {
      // Nuevo usuario, agregarlo al mapa
      mapaUsuarios.set(documento, usuario);
    }
  }

  // Convertir mapa a array
  const usuariosFusionados = Array.from(mapaUsuarios.values());

  return {
    exito: true,
    usuariosA: usuariosA.length,
    usuariosB: usuariosB.length,
    totalCombinado: usuariosCombinados.length,
    usuariosFusionados,
    cantidadFusionados: usuariosFusionados.length,
    duplicadosEliminados: duplicadosDetectados,
    cantidadDuplicados: duplicadosDetectados.length,
    porcentajeDuplicados: (duplicadosDetectados.length / usuariosCombinados.length * 100).toFixed(2) + '%',
    estadisticas: {
      usuariosUnicos: usuariosFusionados.length,
      duplicadosEncontrados: duplicadosDetectados.length,
      eficienciaFusion: ((usuariosFusionados.length / usuariosCombinados.length) * 100).toFixed(2) + '%'
    }
  };
}

// Función auxiliar para obtener datos de prueba
function obtenerDatosPrueba() {
  return {
    sistemaA: [
      { documento: '1001', nombre: 'Juan García', email: 'juan@email.com', ciudad: 'Bogotá' },
      { documento: '1002', nombre: 'María López', email: 'maria@email.com' },
      { documento: '1003', nombre: 'Carlos Rodríguez', email: 'carlos@email.com', ciudad: 'Medellín', telefono: '3001234567' }
    ],
    sistemaB: [
      { documento: '1001', nombre: 'Juan García', email: 'juan@email.com', ciudad: 'Bogotá', telefono: '3107654321', activo: true },
      { documento: '1004', nombre: 'Ana Martínez', email: 'ana@email.com', ciudad: 'Cali' },
      { documento: '1002', nombre: 'María López', email: 'maria@email.com', ciudad: 'Bogotá' }
    ],
    descripcion: 'Fusión de usuarios con duplicados por documento'
  };
}

// Exportar funciones para uso en el HTML
window.ejercicio10 = {
  fusionarUsuarios,
  obtenerDatosPrueba
};

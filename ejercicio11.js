
// Función que genera resumen de mensaje usando destructuración
// Parámetros: mensaje (objeto con remitente, contenido, fecha, etc.)
// Retorna: objeto con resumen formateado
function generarResumen(mensaje) {
  // Validar que mensaje sea un objeto
  if (typeof mensaje !== 'object' || mensaje === null) {
    return {
      exito: false,
      error: 'El mensaje debe ser un objeto válido',
      resumen: 'N/A'
    };
  }

  // DESTRUCTURACIÓN: Extraer campos del objeto mensaje
  // Si un campo no existe, usar valor por defecto
  const {
    remitente = 'Desconocido',
    contenido = '',
    fecha = new Date().toLocaleDateString('es-CO'),
    asunto = 'Sin asunto',
    leido = false,
    prioridad = 'normal',
    adjuntos = []
  } = mensaje;

  // Validar que remitente y contenido no estén vacíos
  if (!remitente || !contenido) {
    return {
      exito: false,
      error: 'El mensaje debe tener remitente y contenido',
      resumen: 'N/A'
    };
  }

  // Truncar contenido a 50 caracteres para vista previa
  const contenidoBreve = contenido.length > 50 
    ? contenido.substring(0, 50) + '...' 
    : contenido;

  // Crear resumen con información extraída
  const resumen = `${remitente.trim()} - ${contenidoBreve}`;

  return {
    exito: true,
    resumen,
    detalles: {
      remitente: remitente.trim(),
      asunto,
      contenidoCompleto: contenido,
      contenidoBreve,
      fecha,
      leido: leido ? '✓ Leído' : '○ No leído',
      prioridad: prioridad.toUpperCase(),
      tieneAdjuntos: adjuntos.length > 0 ? `Sí (${adjuntos.length})` : 'No',
      adjuntos: adjuntos.length > 0 ? adjuntos.join(', ') : 'Ninguno'
    },
    iconoEstado: leido ? '✓' : '●',
    iconoPrioridad: prioridad === 'alta' ? '⚠' : prioridad === 'baja' ? '↓' : '→',
    resumenFormato: `[${leido ? '✓' : '●'}] ${remitente} - ${asunto} (${fecha}) ${adjuntos.length > 0 ? '📎' : ''}`
  };
}

// Función auxiliar para obtener datos de prueba
function obtenerDatosPrueba() {
  return {
    ejemplos: [
      {
        mensaje: {
          remitente: 'Juan García',
          contenido: 'Hola, ¿cómo estás? Te invito a tomar café mañana',
          fecha: '2025-12-06',
          asunto: 'Invitación café',
          leido: false,
          prioridad: 'normal',
          adjuntos: []
        },
        descripcion: 'Mensaje simple sin adjuntos'
      },
      {
        mensaje: {
          remitente: 'Recursos Humanos',
          contenido: 'Se requiere actualización de documentos para trámite de nómina. Revisar el archivo adjunto con los requisitos y fechas límite.',
          fecha: '2025-12-05',
          asunto: 'Documentos pendientes',
          leido: true,
          prioridad: 'alta',
          adjuntos: ['requisitos.pdf', 'cronograma.xlsx']
        },
        descripcion: 'Mensaje importante con adjuntos'
      },
      {
        mensaje: {
          remitente: 'Soporte Técnico',
          contenido: 'Tu ticket #12345 ha sido resuelto. El acceso fue restaurado correctamente.',
          fecha: '2025-12-04',
          asunto: 'Ticket resuelto',
          leido: true,
          prioridad: 'baja',
          adjuntos: []
        },
        descripcion: 'Mensaje de confirmación'
      }
    ]
  };
}

// Exportar funciones para uso en el HTML
window.ejercicio11 = {
  generarResumen,
  obtenerDatosPrueba
};

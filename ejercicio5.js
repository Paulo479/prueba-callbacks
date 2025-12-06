/**
 * EJERCICIO 5: Validación de Usuario
 * Valida usuario, estado y rol, retorna permisos asignados
 */

// Tabla de permisos por rol
const PERMISOS = {
  admin: ['Crear usuarios', 'Modificar usuarios', 'Eliminar usuarios', 'Ver reportes', 'Cambiar configuración', 'Auditar sistema'],
  editor: ['Crear contenido', 'Editar contenido', 'Publicar contenido', 'Ver reportes'],
  lector: ['Ver contenido', 'Descargar archivos', 'Ver reportes públicos']
};

function validarUsuario(nombre, estado, rol) {
  // Validar entrada
  if (!nombre || typeof nombre !== 'string') {
    return { exito: false, error: 'Nombre requerido' };
  }

  if (!['activo', 'inactivo'].includes(estado)) {
    return { exito: false, error: 'Estado debe ser "activo" o "inactivo"' };
  }

  if (!PERMISOS[rol]) {
    return { exito: false, error: `Rol "${rol}" inválido. Válidos: admin, editor, lector` };
  }

  // Verificar estado
  if (estado !== 'activo') {
    return { 
      exito: false, 
      usuario: nombre, 
      rol, 
      error: 'Usuario inactivo - Acceso denegado' 
    };
  }

  // Acceso permitido
  return {
    exito: true,
    usuario: nombre,
    rol,
    estado,
    acceso: 'PERMITIDO',
    permisos: PERMISOS[rol],
    cantidad: PERMISOS[rol].length
  };
}

function obtenerDatosPrueba() {
  return {
    ejemplos: [
      { nombre: 'Juan Admin', estado: 'activo', rol: 'admin' },
      { nombre: 'María Editor', estado: 'activo', rol: 'editor' },
      { nombre: 'Carlos Lector', estado: 'activo', rol: 'lector' },
      { nombre: 'Pedro Inactivo', estado: 'inactivo', rol: 'editor' }
    ]
  };
}

// Exportar
window.ejercicio5 = {
  validarUsuario,
  obtenerDatosPrueba
};

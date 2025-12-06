/**
 * EJERCICIO 9: Procesamiento de Pagos con Callbacks
 * Valida pagos usando funciones callback
 */

function procesarPagos(pagos, callback) {
  // Validar
  if (!Array.isArray(pagos) || typeof callback !== 'function') {
    return { exito: false, error: 'Parámetros inválidos', pagosAprobados: [], pagosRechazados: [] };
  }

  const aprobados = [];
  const rechazados = [];
  let montoAp = 0, montoRech = 0;

  // Procesar cada pago
  pagos.forEach((pago, i) => {
    try {
      const resultado = callback(pago);
      const procesado = {
        ...pago,
        id: pago.id || `PAGO_${i + 1}`,
        aprobado: resultado.aprobado,
        motivo: resultado.motivo || (resultado.aprobado ? 'Aprobado' : 'Rechazado')
      };

      if (resultado.aprobado) {
        aprobados.push(procesado);
        montoAp += pago.monto || 0;
      } else {
        rechazados.push(procesado);
        montoRech += pago.monto || 0;
      }
    } catch (e) {
      rechazados.push({ ...pago, id: pago.id || `PAGO_${i + 1}`, aprobado: false, error: e.message });
      montoRech += pago.monto || 0;
    }
  });

  return {
    exito: true,
    pagosAprobados: aprobados,
    pagosRechazados: rechazados,
    resumen: {
      total: pagos.length,
      aprobado: aprobados.length,
      rechazado: rechazados.length,
      porcentaje: ((aprobados.length / pagos.length * 100).toFixed(2)) + '%',
      montoAprobado: montoAp.toFixed(2),
      montoRechazado: montoRech.toFixed(2)
    }
  };
}

// Criterios predefinidos
const criterios = {
  montoMinimo: (p) => ({ aprobado: p.monto >= 10000, motivo: p.monto >= 10000 ? 'OK' : 'Monto muy bajo' }),
  montoMaximo: (p) => ({ aprobado: p.monto <= 1000000, motivo: p.monto <= 1000000 ? 'OK' : 'Monto muy alto' }),
  saldoSuficiente: (p) => ({ aprobado: p.saldoCuenta >= p.monto, motivo: p.saldoCuenta >= p.monto ? 'OK' : 'Saldo insuficiente' }),
  validacionCompleta: (p) => {
    if (p.monto < 10000 || p.monto > 1000000) return { aprobado: false, motivo: 'Monto fuera de rango' };
    if (p.saldoCuenta < p.monto) return { aprobado: false, motivo: 'Saldo insuficiente' };
    return { aprobado: true, motivo: 'Validado' };
  }
};

function obtenerDatosPrueba() {
  return {
    ejemplos: [
      { id: 'P001', monto: 50000, saldoCuenta: 100000, cliente: 'Juan' },
      { id: 'P002', monto: 5000, saldoCuenta: 80000, cliente: 'María' },
      { id: 'P003', monto: 150000, saldoCuenta: 200000, cliente: 'Carlos' }
    ]
  };
}

// Exportar
window.ejercicio9 = {
  procesarPagos,
  criterios,
  obtenerDatosPrueba
};

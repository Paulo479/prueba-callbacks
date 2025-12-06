/**
 * EJERCICIO 6: Cálculo de Nómina
 * Calcula salario base, deducciones (AFP 4%, Salud 7%, Retención 5%) y neto
 */

const DEDUCCIONES = { AFP: 0.04, Salud: 0.07, Retencion: 0.05 };

function calcularNomina(valorHora, horasTrabajadas) {
  // Validar
  if (typeof valorHora !== 'number' || typeof horasTrabajadas !== 'number' || 
      valorHora < 0 || horasTrabajadas < 0) {
    return { exito: false, error: 'Parámetros inválidos' };
  }

  // Calcular
  const salarioBase = valorHora * horasTrabajadas;
  const afp = salarioBase * DEDUCCIONES.AFP;
  const salud = salarioBase * DEDUCCIONES.Salud;
  const retencion = salarioBase * DEDUCCIONES.Retencion;
  const totalDeducciones = afp + salud + retencion;
  const salarioNeto = salarioBase - totalDeducciones;

  return {
    exito: true,
    valorHora,
    horasTrabajadas,
    salarioBase: salarioBase.toFixed(2),
    deducciones: {
      AFP: afp.toFixed(2),
      Salud: salud.toFixed(2),
      Retencion: retencion.toFixed(2),
      Total: totalDeducciones.toFixed(2)
    },
    salarioNeto: salarioNeto.toFixed(2),
    resumen: `$${salarioBase.toFixed(2)} - $${totalDeducciones.toFixed(2)} = $${salarioNeto.toFixed(2)}`
  };
}

function obtenerDatosPrueba() {
  return {
    ejemplos: [
      { valorHora: 15000, horasTrabajadas: 160 },
      { valorHora: 20000, horasTrabajadas: 160 },
      { valorHora: 12000, horasTrabajadas: 120 }
    ]
  };
}

// Exportar
window.ejercicio6 = {
  calcularNomina,
  obtenerDatosPrueba
};

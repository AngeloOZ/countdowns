// y le pasamos un objeto con las opciones por defecto
const rtf = new Intl.RelativeTimeFormat({
    localeMatcher: 'best fit', // otros valores: 'lookup'
    numeric: 'always', // otros valores: 'auto' para poner "ayer" o "anteayer"
    style: 'long', // otros valores: 'short' o 'narrow'
  })

  // Para hablar que algo ocurrió hace un día
// Tenemos que usar unidades negativas
console.log(rtf.format(-1, 'day'));
// > Hace 1 día

// Para hablar sobre algo que ocurrirá en el futuro
// Se usan los valores positivos
rtf.format(2, 'day')
// > Dentro de 2 días

// Podemos usar diferentes unidades de tiempo
// Y se pueden usar en singular y plural
rtf.format(-30, 'second')
// > Hace 30 segundos
rtf.format(-40, 'seconds')
// > Hace 40 segundos
//DATA PARA O FORMATO DCM
function dateToDCMDate(dateString) {
  // Converts the string to a Date object
  const date = new Date(dateString);

  // Checks if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('The provided string does not represent a valid date');
  }

  // Gets the year, month, and day from the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns a 0-based index, so we add 1
  const day = date.getDate();

  // Formats the month and day to ensure they always have two digits
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  // Combines the parts to form a string in the Ymd format
  return `${year}${formattedMonth}${formattedDay}`;
}

// HORA MARCADA PARA O FORMATO DICOM
function timeToDCMTime(timeString) {
  // Verifica se a string de hora está vazia ou não é uma string válida
  if (!timeString || typeof timeString !== 'string') {
    throw new Error('Invalid time string provided');
  }

  // Extrai horas, minutos e segundos da string de entrada
  const parts = timeString.split(':');
  let hours = parts[0];
  let minutes = parts[1] || '00'; // Define minutos como '00' se não estiverem presentes
  let seconds = parts[2] || '00'; // Define segundos como '00' se não estiverem presentes

  // Garante que horas, minutos e segundos tenham dois dígitos
  hours = hours.padStart(2, '0');
  minutes = minutes.padStart(2, '0');
  seconds = seconds.padStart(2, '0');

  // Combina as partes para formar uma string no formato His
  return `${hours}${minutes}${seconds}`;
}

//NOME PARA O FORMATO DCM MAIS COMPATIVEL
function nameToDCMName(name) {
  const upperCaseName = name.toUpperCase();
  const nameWithoutAccents = upperCaseName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return nameWithoutAccents;
}

//IDENTIFICA ALTURA E PASSA PARA METROS
function heightToDCM(input) {
  if (input === '' || input === 0 || isNaN(Number(input))) {
    return 0;
  }

  // Converte a entrada para número
  let height = Number(input);

  // Se o usuário passar a altura já em metros, retorna diretamente -> considerando altura < 3m.
  if (height > 0 && height <= 3.0) {
    return height;
  }
  return height / 100;
}

module.exports = { dateToDCMDate, nameToDCMName, heightToDCM, timeToDCMTime };

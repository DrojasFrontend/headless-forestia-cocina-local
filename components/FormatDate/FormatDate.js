export default function FormatDate({ date }) {
  let formattedDate = new Date(date);

  if (isNaN(formattedDate.valueOf())) {
    return null;
  }

  const timeformat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Bogota',
  };

  return <>{formattedDate.toLocaleDateString('es-CO', timeformat)}</>;
}

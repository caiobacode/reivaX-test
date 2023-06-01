export default function formatDate(dateISO) {
  const timestamp = new Date(dateISO);
  const dateLocal = new Date(timestamp.getTime() - (timestamp.getTimezoneOffset() * 1000) * 60);

  const hour = dateLocal.toLocaleTimeString();
  const date = dateLocal.toLocaleDateString();

  return `${hour} - ${date}`;
}

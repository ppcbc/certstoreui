function formatDate(isoDate) {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  return formattedDate;
}

export default formatDate;

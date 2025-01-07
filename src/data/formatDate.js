function formatDate(isoDate) {
  const date = new Date(isoDate);

  const options = {
    timeZone: "Europe/Athens", // GMT+2 timezone
    year: "numeric",
    month: "long",
    day: "numeric"
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit"
    // hour12: true
  };

  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
}

export default formatDate;

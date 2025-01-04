export default function fixDateToStringGmtPlusTwo() {
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Athens" })
  );

  const offset = today.getTimezoneOffset();
  const adjustedTime = new Date(today.getTime() - offset * 60000);
  const fixedDate = adjustedTime.toISOString().replace("Z", "+02:00");

  return fixedDate;
}

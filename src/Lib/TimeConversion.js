const getUTC = (date, time) => {
  // Combine date and time strings into a single string
  const dateTimeString = `${date}T${time}`;

  // Create a new Date object from the combined string
  const userDateTime = new Date(dateTimeString);

  // Get the time zone offset in minutes for the user's time zone
  const userOffset = userDateTime.getTimezoneOffset();

  // Get the time zone offset in minutes for UTC
  const utcOffset = new Date().getTimezoneOffset();

  // Calculate the difference in minutes between the user's time zone and UTC
  const offsetDifference = userOffset - utcOffset;

  // Convert the user's date and time to UTC by subtracting the offset difference and return
  return new Date(
    userDateTime.getTime() - offsetDifference * 60 * 1000
  ).toISOString();
};

const getLocalTimeInISO = (date, time) => {
  // Combine date and time into a single string
  const dateTimeString = `${date}T${time}`;

  // Create a Date object
  const localDateTime = new Date(dateTimeString);

  // Format the date manually to preserve local time
  const year = localDateTime.getFullYear();
  const month = (localDateTime.getMonth() + 1).toString().padStart(2, '0');
  const day = localDateTime.getDate().toString().padStart(2, '0');
  const hours = localDateTime.getHours().toString().padStart(2, '0');
  const minutes = localDateTime.getMinutes().toString().padStart(2, '0');
  const seconds = localDateTime.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const getLocalTC = (utcTimestamp) => {
  const utcDateTime = new Date(utcTimestamp);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userLocalDateTime = new Date(
    utcDateTime.toLocaleString("en-US", { timeZone: userTimeZone })
  );
  const date = userLocalDateTime.toLocaleDateString();
  const time = userLocalDateTime.toLocaleTimeString();
  return [date, time];
};

export { getUTC, getLocalTC, getLocalTimeInISO };

import dayjs from "dayjs";

const getFormattedDate = (dateStr) => {
  const date = dayjs(dateStr);
  return date.format("D MMMM, YYYY");
};

export default getFormattedDate;

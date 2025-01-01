const dayjs =require("dayjs");

const getFormattedDate = (dateStr) => {
  const date = dayjs(dateStr);
  return date.format("D MMMM, YYYY");
};

module.exports =  getFormattedDate;
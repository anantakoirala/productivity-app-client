import dayjs from "dayjs";
export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();

  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonthCount = 1 - firstDayOfMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  if (firstDayOfMonth === 1) {
    const firstWeek = daysMatrix[0];
    const previousMonth = month === 0 ? 11 : month - 1;
    const previousYear = month === 0 ? year - 1 : year;
    const lastDayOfPreviousMonth = dayjs(
      new Date(year, previousMonth + 1, 0)
    ).date();

    for (let i = 7 - firstWeek.length; i > 0; i--) {
      const day = lastDayOfPreviousMonth - i + 1;
      firstWeek.unshift(dayjs(new Date(previousYear, previousMonth, day)));
    }
  }

  return daysMatrix;
};

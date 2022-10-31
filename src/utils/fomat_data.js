// 对日期进行格式化
import dayjs from "dayjs";

export function formmatMonthDay(date) {
  return dayjs(date).format("MM月DD日");
}

// 计算时间差值
export function getDiffDays(starDate, endDate) {
  return dayjs(endDate).diff(starDate, "day");
}

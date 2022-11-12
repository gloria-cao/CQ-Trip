// 对日期进行格式化
import dayjs from "dayjs";

export function formmatMonthDay(date, formStr = "MM月DD日") {
  return dayjs(date).format(formStr);
}

// 计算时间差值
export function getDiffDays(starDate, endDate) {
  return dayjs(endDate).diff(starDate, "day");
}

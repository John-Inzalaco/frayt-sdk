import moment, { Moment } from "moment";

export function dateIsExpired(date: string | Moment | undefined): boolean {
  if (!date) return true;
  const today = moment().startOf("day");
  const referenceDate = moment(date).startOf("day");

  return today.isAfter(referenceDate);
}

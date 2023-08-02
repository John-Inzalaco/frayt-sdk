import { Moment } from "moment";

export interface MatchPaymentsResult {
  match: { shortcode: string };
  amount: number;
  date: string | Moment;
}

export interface TotalPaymentsResult {
  day_of_week?: number;
  day_of_week_name?: string;
  month?: number;
  month_name?: string;
  amount: number;
}

export interface PaymentHistoryResult {
  payouts_complete: number;
  payouts_future: number;
}

export interface RecentlyNotifiedMatchesResult {
  day_of_week: number;
  day_of_week_name: string;
  amount: number;
}

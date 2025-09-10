import { format, parse } from "date-fns";
import { vi } from "date-fns/locale";
import type { WeeklyOpeningHours } from "~/types/restautant";

const formatDay = (dayOfWeek: string) => {
  const date = parse(dayOfWeek, "EEEE", new Date());
  return format(date, "EEEE", { locale: vi });
};

const groupOpeningHours = (weekly_opening_hours: WeeklyOpeningHours[]) => {
  if (!weekly_opening_hours) return {};
  const groups: Record<string, string[]> = {};
  weekly_opening_hours.forEach(({ day_of_week, open, close }) => {
    const timeRange = `${open} - ${close}`;
    if (!groups[timeRange]) groups[timeRange] = [];
    groups[timeRange].push(formatDay(day_of_week));
  });

  return groups;
};

export { formatDay, groupOpeningHours };

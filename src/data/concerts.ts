import { z } from "astro/zod";

const concertDateSchema = z
  .string()
  .regex(/^\d{2}\.\d{2}\.\d{4}$/, "Expected a date in DD.MM.YYYY format")
  .transform((value, ctx) => {
    const day = Number(value.slice(0, 2));
    const month = Number(value.slice(3, 5));
    const year = Number(value.slice(6, 10));
    const date = new Date(0);
    date.setFullYear(year, month - 1, day);
    date.setHours(0, 0, 0, 0);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Date does not exist in the calendar",
      });
      return z.NEVER;
    }
    return date;
  });

export const concertSchema = z
  .object({
    startDate: concertDateSchema,
    endDate: concertDateSchema,
    title: z.string(),
    location: z.string(),
    description: z.string(),
  })
  .refine(({ startDate, endDate }) => endDate >= startDate, {
    message: "Concert end date must not precede its start date",
    path: ["endDate"],
  });

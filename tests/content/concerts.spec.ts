import { test, expect } from "@playwright/test";
import { concertSchema } from "../../src/data/concerts";

const concert = {
  title: "Concert",
  location: "Wroclaw",
  description: "",
  startDate: "28.02.2024",
  endDate: "29.02.2024",
};

test("concert dates are parsed once into actual calendar dates", () => {
  const result = concertSchema.parse(concert);
  expect(result.startDate).toEqual(new Date(2024, 1, 28));
  expect(result.endDate).toEqual(new Date(2024, 1, 29));
});

for (const invalid of [
  "",
  "2024",
  "2024-02-28",
  "1.02.2024",
  "28.02.2024 extra",
  "aa.bb.cccc",
  "31.02.2024",
  "29.02.2023",
  "29.02.1900",
  "31.04.2024",
  "00.02.2024",
  "28.13.2024",
]) {
  test(`invalid concert date ${JSON.stringify(invalid)} is rejected on either endpoint`, () => {
    for (const endpoint of ["startDate", "endDate"]) {
      const result = concertSchema.safeParse({
        ...concert,
        [endpoint]: invalid,
      });
      expect(result.success).toBe(false);
      if (result.success) throw new Error("Invalid concert date accepted");
      expect(result.error.issues).toEqual(
        expect.arrayContaining([expect.objectContaining({ path: [endpoint] })]),
      );
    }
  });
}

test("concert end cannot precede its start", () => {
  const result = concertSchema.safeParse({
    ...concert,
    startDate: "01.03.2024",
  });
  expect(result.success).toBe(false);
  if (result.success) throw new Error("Reversed concert dates accepted");
  expect(result.error.issues).toEqual(
    expect.arrayContaining([expect.objectContaining({ path: ["endDate"] })]),
  );
});

test("same-day concerts and ranges crossing a year are accepted", () => {
  for (const [startDate, endDate] of [
    ["29.02.2024", "29.02.2024"],
    ["29.02.2000", "29.02.2000"],
    ["31.12.2024", "01.01.2025"],
  ]) {
    expect(
      concertSchema.safeParse({ ...concert, startDate, endDate }).success,
    ).toBe(true);
  }
});

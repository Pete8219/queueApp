/* import React from "react" */

export const YearCalendar = () => {
  const weekendAndHolidays = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 23, 24, 30, 31],
    [6, 7, 13, 14, 21, 22, 23, 27, 28],
    [6, 7, 8, 13, 14, 20, 21, 27, 28],
    [3, 4, 10, 11, 17, 18, 24, 25],
    [1, 2, 3, 8, 9, 10, 15, 16, 22, 23, 29, 30],
    [5, 6, 12, 13, 14, 19, 20, 26, 27],
    [3, 4, 10, 11, 17, 18, 24, 25, 31],
    [1, 7, 8, 14, 15, 21, 22, 28, 29],
    [4, 5, 11, 12, 18, 19, 25, 26],
    [2, 3, 9, 10, 16, 17, 23, 24, 30, 31],
    [4, 6, 7, 13, 14, 20, 21, 27, 28],
    [4, 5, 11, 12, 18, 19, 25, 26, 31],
  ]

  const preHoliday = [[12], [20], [], [30], [], [11], [], [], [], [], [3], []]

  return { weekendAndHolidays, preHoliday }
}

// scripts.js

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below

// Define a function to create an array of numbers from 0 to length
const createArray = (length) => {
  const result = []

  for (let i = 0; i < length; i++) {
    result.push(i) //Push each number to the result array
  }

  return result
}

// Define a function to create calendar data
const createData = () => {
  const current = new Date()
  current.setDate(1)

  const startDay = current.getDate() // Get the day of the week for the 1st day
  const daysInMonth = getDaysInMonth(current)

  // Calculate the number of weeks needed for the calendar
  const weeks = createArray(Math.ceil((startDay + daysInMonth) / 7))
  const days = createArray(7)
  const result = []

  for (const weekIndex of weeks) {
    result.push({
      week: weekIndex + 1, // Increment the week number
      days: [],
    })

    for (const dayIndex of days) {
      const day = dayIndex + weekIndex * 7 - startDay + 1
      const isValid = day >= 1 && day <= daysInMonth

      // Push day data (day of the week and value) to the result
      result[weekIndex].days.push({
        dayOfWeek: dayIndex + 1, // Increment the day of the week
        value: isValid ? day : "", // Store the day value or an empty string
      })
    }
  }

  return result
}

// Define a function to create an HTML table cell
const addCell = (existing, classString, value) => {
  const result = /* html */ `
        ${existing}

        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `

  return result
}

// Define a function to create the HTML for the calendar
const createHtml = (data) => {
  let result = ""

  for (const { week, days } of data) {
    let inner = ""
    inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${week}`)

    for (const { dayOfWeek, value } of days) {
      const isToday = new Date().getDate() === value
      const isWeekend = (dayOfWeek === 1) | (dayOfWeek === 7)
      const isAlternate = week % 2 === 0

      let classString = "table__cell"

      if (isToday) classString = `${classString} table__cell_today`
      if (isWeekend) classString = `${classString} table__cell_weekend`
      if (isAlternate) classString = `${classString} table__cell_alternate`
      inner = addCell(inner, classString, value) // Create the table cell with appropriate class and value
    }

    result = `
            ${result}
            <tr>${inner}</tr>
        `
  }

  return result
}

// Only edit above

const current = new Date()
document.querySelector("[data-title]").innerText = `${
  MONTHS[current.getMonth()]
} ${current.getFullYear()}`

const data = createData()
document.querySelector("[data-content]").innerHTML = createHtml(data)

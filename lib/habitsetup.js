/**
 * @classdesc This Class was created for the NLW Setup challenge
 */
  /** 
   * Object that contains the data composed by:
   * 
   * **key**: The habit name as the `data-name` of the `.habit` container
   * **value**: `Array` of days to be checked as done
   * **day**: Each day must be like the format `MM-DD` _MM: month, DD: day_
   * 
   * 
   * ```js
   *  { run: ['01-01', '01-02', '01-06'] }
   * ```
   */

export class HabitSetup {
  data;
  constructor(form) {
    this.form = form
    this.habits = form.firstElementChild.children
    this.days = form.lastElementChild
  }

  dayExist(today) {
    const recordedDays = this.days.children

    if (recordedDays.length > 0) {
      const dayAlredyExist = Array.from(recordedDays).some((element) => {
        return element.children[0].innerText === today
      })
      return dayAlredyExist
    }
    return false
  }

  addDay(date) {
    const day = document.createElement("div")
    day.classList.add("day")

    day.innerHTML = `<div>${date}</div>`
    for (let i = 0; i < this.habits.length; i++) {
      day.innerHTML += `<input id="${i}" type="checkbox">`
    }

    this.days.appendChild(day)
  }

  setData(data) {
    this.data = data

    if (Object.keys(data).length === 0) {
      for (let i of this.habits) {
        let habit = i.attributes["data-name"].value
        data[habit] = [] //adding an Array for each habit
      }
    } 
  }

  dataUpdate(event) {
      let input = event.target
      let dataIn = input.parentElement.firstChild.innerText
      let activity = this.habits[input.id].attributes["data-name"].value

      if (input.checked) {
        this.data[activity].push(dataIn)
      } else {
        let dataOut = this.data[activity].indexOf(dataIn)
        this.data[activity].splice(dataOut, 1)
      }
    return this.data
  }

  load() {
    for (let arr of Object.entries(this.data)) {
      for (let values of arr[1]) {
        if (!this.dayExist(values)) {
          this.addDay(values)
        }
        let inputId = Object.keys(this.data).indexOf(arr[0])
        document.querySelectorAll("input")[inputId].checked = true
      }
    }
  }
}

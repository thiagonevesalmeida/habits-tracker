// importing DataSetup lib
import { HabitSetup } from './lib/habitsetup.js'

const form = document.querySelector("form")
const button = document.querySelector("header > button")
const habitSetup = new HabitSetup(form)

//calling events
button.addEventListener("click", addNewDay)
form.addEventListener("change", saveActivities)

function addNewDay() {
  const today = new Date().toLocaleString("pt-br").slice(0, 5)
  const dayExist = habitSetup.dayExist(today)
  
  if (dayExist) {
    alert('Dia já registrado 🛑')
    return
  }
  
  alert('Dia adicionado com sucesso ✅')
  habitSetup.addDay(today)
}

function saveActivities(event) {
  habitSetup.dataUpdate(event)
  localStorage.setItem("dataLog", JSON.stringify(habitSetup.data))
}


const data = JSON.parse(localStorage.getItem("dataLog")) ?? {}
habitSetup.setData(data)
habitSetup.load()



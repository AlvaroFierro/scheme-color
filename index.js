import './style.css'

const colorPicker = document.getElementById('color-picker')

const url = 'https://www.thecolorapi.com/'

let color = '#000000'.replace(/0/g, function () {
  return (~~(Math.random() * 16)).toString(16)
})

colorPicker.value = color

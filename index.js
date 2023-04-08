const url = 'https://www.thecolorapi.com/scheme'
const colorPicker = document.getElementById('color-picker')
const schemeSelector = document.getElementById('scheme-selector')
const getSchemeBtn = document.getElementById('get-scheme-btn')
const paletteEl = document.getElementById('palette-container')
let schemes = ''

let hexColor = '#000000'.replace(/0/g, function () {
  return (~~(Math.random() * 16)).toString(16)
})

colorPicker.value = hexColor
const color = hexColor.slice(1)

fetchColors()
getSchemeBtn.addEventListener('click', () => {
  fetchColors()
})

function fetchColors() {
  fetch(`${url}?hex=${color}&${schemeSelector.value}`)
    .then((res) => res.json())
    .then((data) => {
      getSchemeColor(data.colors)
      if (!schemes) {
        schemes = data._links.schemes
        optionSchemes()
      }
    })
}

function optionSchemes() {
  Object.entries(schemes).forEach(([key, value]) => {
    schemeSelector.add(new Option(key.charAt(0).toUpperCase() + key.slice(1), value))
  })
}

function getSchemeColor(colors) {
  paletteEl.innerHTML = colors
    .map((color) => {
      return `
        <div style="background-color:${color.hex.value}">
          <div class="color-details">
            <div class="color-hex" onclick="copyColor('${color.hex.clean}')">${color.hex.clean}</div>
            <div class="name-color">${color.name.value}</div>
          </div>
        </div>
        `
    })
    .join('')
}

function copyColor(color) {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(`#${color}`).then(() => {
      document.querySelector('.isCopied').style.display = 'block'
      setTimeout(() => {
        document.querySelector('.isCopied').style.display = 'none'
      }, 3000)
    })

  return Promise.reject('The Clipboard API is not available.')
}

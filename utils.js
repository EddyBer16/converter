let $fromPicker = document.querySelector('.fromPicker')
let $toPicker = document.querySelector('.toPicker')
let $input = document.querySelector('.card > input')
let $result = document.querySelector('.card--result')
let bases = {
    'Decimal': ['0','1','2','3','4','5','6','7','8','9'],
    'Binario': ['0','1'],
    'Octal': ['0','1','2','3','4','5','6','7'],
    'Hexadecimal': ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
}

let fromOptions = [
    {
        text: 'Decimal',
        active: true
    },
    { text: 'Binario' },
    { text: 'Octal' },
    { text: 'Hexadecimal' }
]

let toOptions = [
    {
        text: 'Decimal',
        disabled: true
    },
    {
        text: 'Binario',
        active: true
    },
    { text: 'Octal' },
    { text: 'Hexadecimal' }
]

function renderOptions(fromOptions, toOptions) {
    $fromPicker.innerHTML = ''
    fromOptions.forEach(optionData => {
        $fromPicker.appendChild(createOption(optionData))
    })

    $toPicker.innerHTML = ''
    toOptions.forEach(optionsData => {
        $toPicker.appendChild(createOption(optionsData))
    })
}

function createOption({ text = '', disabled = false, active = false }) {
    let option = document.createElement('span')
    option.classList.add('picker--option')
    if (disabled) option.classList.add('picker--option__disabled')
    if (active) option.classList.add('picker--option__active')
    option.innerHTML = text
    if (!disabled) {
        option.addEventListener('click', e => {
            if (e.target.parentElement.classList.contains('fromPicker')) {
                updatePicker(e.target.innerHTML)
            } else {
                convert(e.target.innerHTML)
            }
        })
    }
    return option
}

function updatePicker(from) {
    $input.value = ''
    $result.innerHTML = ''

    fromOptions = fromOptions.map(option => {
        let newOption = { ...option, active: false }

        if (option.text === from) newOption.active = true

        return newOption
    })

    toOptions = toOptions.map(option => {
        let newOption = { ...option, active: false, disabled: false }

        if (option.text === from) newOption.disabled = true

        return newOption
    })

    renderOptions(fromOptions, toOptions)
}

function renderResult({ result, to }) {
    $result.innerHTML = ''

    result.forEach(digit => {
        $result.innerHTML += bases[to][digit]
    })
}
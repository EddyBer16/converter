renderOptions(fromOptions, toOptions)

function convert(to) {
    toOptions = toOptions.map(option => {
        let newOption = { ...option, active: false }

        if (option.text === to) newOption.active = true

        return newOption
    })

    renderOptions(fromOptions, toOptions)

    let valueToConvert = $input.value
    let $fromOptionActive = document.querySelector('.picker--option__active')
    let from = $fromOptionActive.innerHTML

    if (from === 'Decimal') {
        renderResult({ result: fromDecimal({ to, value: valueToConvert }), to })
    } else {
        let digits = valueToConvert.split('').reverse(), result = 0
        digits.forEach((digit, index) => {
            let value = bases[from].indexOf(digit)
            result += (value * Math.pow(bases[from].length, index))
        })

        renderResult({ result: fromDecimal({ to, value: result }), to })
    }
}

function fromDecimal({ to, value }) {
    let remainder = []
    let quotient = Number(value)

    do {
        remainder.unshift(quotient % bases[to].length)
        quotient = Math.floor(quotient / bases[to].length)
    } while (quotient !== 0)

    return remainder
}
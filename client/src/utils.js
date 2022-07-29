export const roundUpFloat = (floatNum) => {
    return stringToFloat(floatNum).toFixed(3)
}

export const difference = (prevClosedPrice,lastPrice)=>{
    return roundUpFloat(lastPrice) - roundUpFloat(prevClosedPrice)
}

export const isRising =(prevClosedPrice,lastPrice) => {
    return difference(prevClosedPrice,lastPrice) >= 0
}

export const stringToFloat = (floatString) =>{
    return parseFloat(floatString)
}
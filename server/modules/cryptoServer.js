const axios = require("axios").create({baseUrl: ""})

const BINANCE_ENDPOINT = `https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","ENJUSDT","GRTUSDT"]`


const fetchCryptoPrices = async () => {
   return await axios.get(BINANCE_ENDPOINT).then((response)=>{
        return response
    }).catch(e => {
        return {status: 204,message: "No Content", data: []}
    })
}

const setFetchIntervals = (interval,socket) => {
    setInterval(async () => {
        const response =  await fetchCryptoPrices()
        socket.emit("crypto_prices:receive",{
            data: response.data
        })
    }, interval);
}

const fetchCryptoPricesOnce = async (socket) => {
    const response = await fetchCryptoPrices()
    socket.emit("crypto_prices:receive_once",{
        data: response.data
    })
}

const fetchCryptoPricesAfter = async (interval,socket)=>{
    setFetchIntervals(interval,socket)
    const response = await fetchCryptoPrices()
    socket.emit("crypto_prices:receive",{
        data: response.data
    })
}

module.exports = {fetchCryptoPricesAfter,fetchCryptoPricesOnce}
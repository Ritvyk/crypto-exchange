const {fetchCryptoPricesAfter,fetchCryptoPricesOnce} = require("./modules/cryptoServer")

const socketServerCORS = {
    origin: "http://localhost:3000",
    methods:["GET","POST"]
}
const FETCH_INTERVAL = 5000

const authSuccessStatus = {status: "OK"}
const authErrorStatus = {status: "NOK"}


const authObject = {userName: "ritvyk",password: "ritvik123"}

const socketServer = (io,socket)=>{
    socket.on("auth",(authCreds)=>{
        handleAuthentication(authCreds,socket)
    })
    socket.on("crypto_prices:fetch_once",(_data)=>{
        console.log("Once")
        handleFetchCryptoPricesOnce(socket)
    })
    socket.on("crypto_prices:fetch",(_data)=>{
        handleFetchCryptoPrices(_data,socket)
    })
}

const handleFetchCryptoPricesOnce = (socket)=>{
    fetchCryptoPricesOnce(socket)
}

const handleFetchCryptoPrices = (_data,socket)=>{
    fetchCryptoPricesAfter(FETCH_INTERVAL,socket)
}

const handleAuthentication = (authCreds,socket)=>{
    if(authCreds.userName !== authObject.userName || authCreds.password !== authObject.password){
        socket.emit("auth_response",authErrorStatus)
        socket.disconnect()
    }else{
        socket.emit("auth_response",authSuccessStatus)
    }
}

module.exports = {socketServerCORS,socketServer}

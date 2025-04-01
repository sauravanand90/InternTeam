const jwt = require('jsonwebtoken');

const secretKey='Lalitha@secretKey';

//encoding
const encodeJwt=(payload)=>{
    return jwt.sign(payload,secretKey,{
        expiresIn: "1h"
    });
};

//decoding

const decodeJwt=(token)=>{
    try{
        const decoded=jwt.verify(token, secretKey);
        return decoded;
    }
    catch(error){
        return {error:"Invalid or expired token"};
    }
}

const payload={
    id:123,
    username:"Lalitha",
    role:"admin"
};

const token =encodeJwt(payload);
console.log("Encoded token:", token);

const decodedData=decodeJwt(token);
console.log("Decoded data:",decodedData);
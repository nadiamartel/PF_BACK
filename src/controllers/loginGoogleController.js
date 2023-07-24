const { User } = require("../db");
const emailer = require ('../emailer');

const postLoginGoogle = async({email, googleId, name}) =>{
    if(!email || !googleId || !name) throw Error('Faltan datos!')

    const user = await User.findOrCreate({ 
        where: { email },
        defaults: {
            name: name,
            email,
            password: googleId,
        } 
    });

    return user;  
}



module.exports = {
    postLoginGoogle
}

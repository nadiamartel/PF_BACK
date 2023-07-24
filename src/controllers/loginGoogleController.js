const { User } = require("../db");
const emailer = require ('../emailer');

const postLoginGoogle = async({email, googleId, name}) =>{


    const user = await User.findOrCreate({ 
        where: { email },
        defaults: {
            name: name.toLowerCase(),
            email,
            password: googleId,
        } 
    });

    return user;
    
}



module.exports = {
    postLoginGoogle
}
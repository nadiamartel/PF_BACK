const { User } = require("../db");
const emailer = require ('../emailer');

const postLoginGoogle = async({email, googleId, name}) =>{


    const user = await User.findOrCreate({ 
        where: { email },
        defaults: {
            name: name,
            email,
            password: googleId,
        } 
    });
    emailer.sendMail(user)
    return user;
    
}



module.exports = {
    postLoginGoogle
}
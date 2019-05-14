const bcrypt = require('bcryptjs')
module.exports = {
    register : async (req,res) => {
        const db = req.app.get('db')
        const{fullName, email, password} = req.body
        const {session} = req

        if(!fullName || !email || !password){
            return res.status(406).send('Need all inputs')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        try{
            let newUser = await db.auth.new_user(fullName, email, hash)
            newUser = newUser[0]
            session.user = {
                ...newUser
            }
            console.log(session)
            res.status(200).send(newUser)
        }catch(err){
            return res.status(500).send(err)
        }

    }
}
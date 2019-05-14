const bcrypt = require('bcryptjs')
module.exports = {
    register : async (req,res) => {
        const db = req.app.get('db')
        const{name, email, password} = req.body
        const {session} = req

        if(!name || !email || !password){
            return res.status(406).send('Need all inputs')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        try{
            let newUser = await db.auth.new_user(name, email, hash)
            newUser = newUser[0]
            session.user = {
                ...newUser
            }
            res.status(200).send(session.user)
        }catch(err){
            return res.status(500).send(err)
        }

    },

    login : async (req,res) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        const {session} = req

        if(!email || !password){
            return res.status(406).send('need all info')
        }

        try{
            let user = await db.auth.find_user(email)
            user = user[0]
            
            if(!user){
                return res.status(400).send('email does not exisit')
            }

            const authedUser = bcrypt.compareSync(password, user.password)

            if(!authedUser){
                return res.status(400).send('invalid password')
            }

            delete user.password
            delete user.admin

            session.user = user
            console.log(session)

            return res.status(200).send(session.user)

        }catch(err){
            return res.status(500).send(err)
        }
    },
    getUser: (req,res) => {
        const {user} = req.session
        console.log(req.session)

        if(user){
            res.status(200).send(user)
        }else{
            res.sendStatus(401)
        }
    },
}
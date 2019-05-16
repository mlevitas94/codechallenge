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
                ...newUser,
                projects : []
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

            const projectsList = await db.auth.get_projects(user.id)

            const tasksList = await db.auth.get_tasks(user.id)
            
            const projects = []

            for(let i = 0; i < projectsList.length; i++){
                if(!projects.includes({id : projectsList[i].id})){
                    projects.push({
                        id : projectList[i].id,
                        name: projectsList[i].name,
                        user_id : projectsList[i].user_id,
                        tasks : []
                    })
                }
                for(let j = 0; j < tasksList.length; i++){
                    if(projectsList[i].id === tasksList[j].project){
                        for(let k = 0; k < projects.length ; i++){
                            if(projects[k].id === projects[i].id){
                                projects[k].tasks.push({
                                    task_id : tasksList[j].task_id,
                                    name : tasksList[j].name,
                                    complete : tasksList[j].complete,

                                })
                            }
                        }
                    }
                }
            }

            session.user = user
            session.user.projects = projects
            console.log(projects)
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
    logout: (req,res) => {
        try{
            req.session.destroy()
            return res.sendStatus(200)
        }catch(err){
            return res.sendStatus(500)
        }
    },

    addProject : async (req,res) => {
        const db = req.app.get('db')
        const {name} = req.body
        const {id} = req.session.user
        console.log(name)

        try{
            let newProject = await db.auth.new_project(id, name)
            newProject = newProject[0]
            return res.status(200).send(newProject)
        }catch(err){
            return res.status(500).send(err)
        }
    }
}
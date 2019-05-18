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
                projects : [],
                taskLength : 0
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
                for(let j = 0; j <= projects.length; j++){
                  if(projects.length === 0){
                    projects.push({
                      id: projectsList[i].id,
                      name: projectsList[i].name,
                      tasks : []
                    })
                  }
                  if(projects[j].id === projectsList[i].id){
                    break
                  }else{
                    projects.push({
                      id: projectsList[i].id,
                      name: projectsList[i].name,
                      tasks : []
                    })
                    break
                  }
                }
                for(let k = 0; k < tasksList.length; k++){
                  if(tasksList[k].project === projectsList[i].id){
                    for(let l = 0; l < projects.length; l++){
                      if(tasksList[k].project === projects[l].id){
                        projects[l].tasks.push({
                          task_id: tasksList[k].task_id,
                          project : tasksList[k].project,
                          name : tasksList[k].name,
                          completed : tasksList[k].completed
                        })
                      }
                    }
                  }
                }
              }

            session.user = user

            session.user.projects = projects
            session.user.taskLength = tasksList.length;


            return res.status(200).send(session.user)

        }catch(err){
            return res.status(500).send(err)
        }
    },
    getUser: (req,res) => {
        const {user} = req.session
  

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
      const {session} = req
      const {id} = req.session.user

        try{
            let newProject = await db.auth.new_project(id, name)
            newProject = newProject[0]
            session.user.projects.push({
              id:newProject.id,
              name:newProject.name,
              tasks : []
            })
            return res.status(200).send(session.user)
        }catch(err){
            return res.status(500).send(err)
        }
    },
    
    addTask: async (req,res) => {
      const db = req.app.get('db')
      const {name, id} = req.body
      const {session} = req
      
      try{
        let newTask = await db.auth.new_task(id, name, session.user.id)
        newTask = newTask[0]

        for(let i = 0; i < session.user.projects.length; i++){
          if(newTask.project === session.user.projects[i].id){
            session.user.projects[i].tasks.push(newTask)
          }
        }
        session.user.taskLength++
        return res.status(200).send(session.user)

      }catch(err){
        res.status(500).send(err)
      }
    },
    updateTask : async (req,res) => {
      const db = req.app.get('db')
      const {id, completed} = req.body
      const {session} = req

      try{
        let updatedTask = await db.auth.update_task(completed, id)
        updatedTask = updatedTask[0]

        for(let i = 0; i < session.user.projects.length; i++){
          for(let j = 0; j < session.user.projects[i].tasks.length; j++){
            if(session.user.projects[i].tasks[j].task_id === updatedTask.task_id){
              session.user.projects[i].tasks[j].completed = updatedTask.completed
            }
          }
        }

        return res.status(200).send(session.user)


      }catch(err){
        return res.status(500).send(err)
      }
    }
}
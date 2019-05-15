select * from projects
inner join tasks on tasks.project = projects.id
where user_id = $1;
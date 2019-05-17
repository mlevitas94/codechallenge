update tasks
set completed = not $1
where task_id = $2

returning task_id, completed;
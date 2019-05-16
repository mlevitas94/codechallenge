insert into tasks(
    project,
    name,
    user_id
)values(
    $1,
    $2,
    $3
)
returning project, name;
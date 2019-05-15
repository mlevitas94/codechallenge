insert into projects(
    user_id,
    name
)values(
    $1,
    $2
)

returning id, name;
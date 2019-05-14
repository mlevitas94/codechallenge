create table users (
    id serial primary key,
    name varchar(50) not null,
    email varchar(50) not null,
    password text not null,
    admin boolean default false
);

create table projects (
    id serial primary key,
    user_id int references users(id) not null,
    name varchar(100) not null
);

create table tasks (
    id serial primary key,
    project int references projects(id) not null,
    name varchar(100) not null,
    completed boolean default false
);
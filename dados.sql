use db;

create table charts (
  id int auto_increment primary key,
  nome varchar(20),
  sexo int,
  data date
);

insert into charts (id, nome, sexo, data) values (null, 'Vithor', 1, '2021-01-01');
use bms_db;
create table author(
  author_id integer primary key,
  author_name varchar(30) not null);
  
  
create table geners(
  gener_id varchar(10) primary key,
  category varchar(30) not null );

create table books(
  book_id integer Primary Key,
  book_title varchar(30) not null unique,
  author_id integer not null,
  gener_id varchar(10) not null,
  foreign key (author_id) references author(author_id),
  foreign key (gener_id) references geners(gener_id));
  
  
-- insert book into books Table

insert into author values(001,"Rohit"),(002,"Clark");
insert into geners values('1F','ficion'),('1S','science'),('1H','History');
insert into books values(1,"Third Eye",001,'1F'),(2,"Only Eye",002,'1S'),
(3,"Black Clover",001,'1F'),(4,"Intesteller",002,'1S'),(5,"Testing",002,'1S');

select * from books;
select * from geners;
select * from author;


select books.book_title,author.author_name from books
inner join author on books.author_id = author.author_id;

select books.book_title,geners.category from books
inner join geners on books.gener_id = geners.gener_id;

-- Updating Books with id
update books set book_title='Power of Ring' where book_id=2;
select * from books;

-- Deleting books with id
delete from books where book_id=5;
select * from books;


-- Sorting book 
select * from books order by book_id desc;


-- Using group by
select gener_id, count(*) as total from books group by gener_id;

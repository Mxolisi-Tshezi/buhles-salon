-- Table create scripts here
create table client(
    id serial primary key not null,
    first_name text not null,
    last_name text not null,
    phone_number text not null
);
create table treatment(
    id serial primary key not null,
    type text not null,
    code text not null,
    price decimal not null
);
create table stylist(
    id serial primary key not null,
    first_name text not null,
    last_name text not null,
    phone_number text not null,
    commission_percentage numeric(3,2) not null
);
create table booking(
    id serial primary key not null,
    booking_date date not null,
    booking_time time not null,
    client_id int not null,
    treatment_id int not null,
    stylist_id int not null,
    foreign key (client_id) references client(id) on delete cascade,
    foreign key (treatment_id) references treatment(id) on delete cascade,
    foreign key (stylist_id) references stylist(id) on delete cascade
)

insert into client(first_name,last_name,phone_number) values('Mxolisi','Tshezi','0763112245');
insert into client(first_name,last_name,phone_number) values('Mark','Musk','0114527654');
insert into client(first_name,last_name,phone_number) values('Steve','Jobs','0731602587');
insert into client(first_name,last_name,phone_number) values('Chris','Hanis','0126729988');
insert into client(first_name,last_name,phone_number) values('Juju','Lamela','0767879012');
insert into client(first_name,last_name,phone_number) values('Cereal','Butterphosa','0119037845');
insert into client(first_name,last_name,phone_number) values('Jakobe','Zama','0312346734');

insert into treatment(type,code,price) values('Pedicure','Ped1',175.00);
insert into treatment(type,code,price) values('Manicure','Man1',215.00);
insert into treatment(type,code,price) values('Make up','Mak1',185.00);
insert into treatment(type,code,price) values('Brows & Lashes','brow1',240.00);

insert into stylist(first_name,last_name,phone_number,commission_percentage) values('Eskoma','Wafa','0213004444',0.11);
insert into stylist(first_name,last_name,phone_number,commission_percentage) values('Politika','Madlala','021400555',0.15);
insert into stylist(first_name,last_name,phone_number,commission_percentage) values('Janusa','Walusa','0712345678',0.17);
insert into stylist(first_name,last_name,phone_number,commission_percentage) values('Satafrika','Drama','0216728901',0.20);
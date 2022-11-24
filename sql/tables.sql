-- Table create scripts here

create table client(
	id serial not null primary key,
    first_name text not null,
    last_name text not null,
    phone_number varchar
);

create table treatment(
	id serial not null primary key,
    types text not null,
    code varchar
);


create table stylist(
	id serial not null primary key,
    first_name text not null,
    last_name text not null,
    phone_number varchar,
    commission_percentage integer
);

create table booking(
    id serial not null primary key,
    booking_date date,
    booking_time time,
    client_id integer,
    FOREIGN KEY (client_id) references client(id),
    treatment_id integer,
    FOREIGN KEY (treatment_id) references treatment(id),
    stylist_id integer,
    FOREIGN KEY (stylist_id) references stylist(id)

);
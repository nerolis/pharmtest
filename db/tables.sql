create table t_item (
    item_id  serial,
    id       varchar,
    name     varchar,
    price    bigint,
    shop_id  int,
    
    foreign key (shop_id) references t_shop (shop_id),
    primary key(item_id)
);


create table t_shop (
    shop_id  serial,
    name     varchar UNIQUE,
    brief    varchar,
    upd_date timestamp, 

    primary key (shop_id)
);

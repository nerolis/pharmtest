-- create table t_shop (
--     shop_id serial,
--     shop_name varchar(20),

--     primary(shop_id)
-- )

create table t_item (
    item_id serial,
    id varchar(25),
    name varchar(50),
    price bigint,
    shop_name varchar(25),

    primary key(item_id)
);
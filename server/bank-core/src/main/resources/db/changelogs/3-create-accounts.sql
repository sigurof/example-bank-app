create type account_type as enum ('SAVINGS', 'CHECKING', 'CREDIT_CARD', 'LOAN', 'INVESTMENT', 'OTHER');

create table accounts
(
    id         serial primary key,
    profile_id integer        not null references profiles (id),
    name       varchar(255)   not null,
    type       account_type   not null,
    number     varchar(255)   not null,
    balance    numeric(12, 2) not null

);


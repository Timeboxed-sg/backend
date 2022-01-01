CREATE ROLE timeboxedAdmin WITH LOGIN PASSWORD 'password';

ALTER ROLE timeboxedAdmin CREATEDB;

CREATE DB timeboxed
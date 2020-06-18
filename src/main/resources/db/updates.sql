-- TODO  add quotes asset index

USE binary_db;

CREATE INDEX time_dx ON quote (time DESC) USING BTREE;
CREATE INDEX asset_external_id_dx ON asset (externalId) USING BTREE;

UPDATE account
SET authority = "ROLE_ADMIN"
WHERE login = 'test1';

UPDATE asset
SET pipSize = 2;

update asset set pipSize = 5
where assetType=1;

create index trade_end_time_idx on options(tradeEndTime) using BTREE;

create index asset_idx on options(asset_id) using hash;

create index login_idx on account(login) using BTREE;

create index same_option_idx on
  options(asset_id, bidStartTime, tradeStartTime,  tradeEndTime,
          demo, bidAmountType, optionStatus);
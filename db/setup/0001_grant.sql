-- docker ユーザに権限を付与
-- Prisma を使う都合上必要
GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO `docker`@`%`;
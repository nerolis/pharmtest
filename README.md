1. Приложение требует базы постгресса

2. CREATE DATABASE test;

3. Пролить таблицы из ./db/tables.sql

4. npm run test  unit-test api. в том числе, зальет товары по конфигу(niko-opt);

5. npm run build

6. npm run start

7. Залить вручную товары можно выполнив POST по http://localhost:5000/api/shop/niko-opt или  http://localhost:5000/api/shop/opt.10x10 с хедером: Authorization: 'superSecretToken'
 ```
  --connection
  database: 'test',
  host: 'localhost',
  user: 'postgres',
  password: 'postgres'
```

8. Некоторые айдишники от магазинов для теста поиска по товарам;
niko-opt(BZ-1507D, BRK-286F, SKL0005)
opt.10x10(BZ-1625A, BZ-1625B, BZ-1640C)

@todo пофиксить проблему с эндокингом csv из кириллицы.

1. Приложение требует базы постгресса

2. CREATE DATABASE test;

3. Пролить таблицы из ./db/tables.sql

4. npm run test для тестов api. в том числе, зальет первый конфиг(niko-opt);

5. npm run build

6. npm run start

```
  --connection
  
  database: 'test',
  host: 'localhost',
  user: 'postgres',
  password: 'postgres'
```

@todo пофиксить проблему с эндокингом csv из кириллицы.

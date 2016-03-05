"c:\Program Files\MySQL\MySQL Server 5.7\bin\mysql" --force --user=paymit --password=password --default-character-set=UTF8 paymit < %~dp0\create.sql
"c:\Program Files\MySQL\MySQL Server 5.7\bin\mysql" --force --user=paymit --password=password --default-character-set=UTF8 paymit < %~dp0\insert.sql
pause
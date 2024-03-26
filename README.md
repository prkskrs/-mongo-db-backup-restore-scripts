Here we have two files one is for backup and other is for restore.

Backup file is created by using the following command. (`mongodump`)
- In order to run backup file you need to have the following command => `node backup.js`
- once you run the backup file it will create a folder dump/database_name and inside that folder it will create a collection_name.bson file.

Restore file is created by using the following command. (`mongorestore`)
- In order to run restore file you need to have the following command => `node restore.js`
- once you run the restore file it will restore the data from the collection_name.bson file to the database.
- here while you can provide the different database name as well. (in variable `databaseToRestore`)
- while restoring it is dependent on the dump folder which is created by the backup file. because it will look for the collection_name.bson file inside the dump folder.

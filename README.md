# DungeonDex

The is an open source Dungeons and Dragons campaign manager. The frontend is an angular app and the backend is a c# api using entity framework to map to a SQL database. Just add a connection string to an appsetting.json file(not included) in the API folder with a valid login to your SQL server and use 'dotnet ef database update' from the commandline in the api folder to create the tables in your database.  

Then, use 'ng serve' from the angular folder to launch the app and navigate to the start page. Create an account and start building your campaign. 




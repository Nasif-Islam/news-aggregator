# News Aggregator

## How to set up the project

- Ensure there is a .gitignore file that ignores the following files
  - node_modules
  - .env.\*

- Run _npm install_ in the terminal to install the dependencies for the project

- Set up the development and test databases using Postgres by running the terminal command _npm run setup-dbs_

- Create two .env files at the root of the project
  - .env.development
  - .env.test

- Add the names of the development and test database to the corresponding file
  - PGDATABASE=development_database_name
  - PGDATABASE=test_database_name

- If connecting to another database e.g a cloud services such as DynamoDB, you may have to enter additional credentials

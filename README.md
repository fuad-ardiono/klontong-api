## How to run this project?

1. Install docker
For mac/windows you can install docker desktop, for linux you can install docker compose
2. Create .env
```
cp env-example .env
```
3. Run
```
docker-compose up
```
4. Server will start at http://localhost:3000

5. To cleanup environment run
```
docker-compose down
```

## Feature/Module developed
1. Auth
    - Login
    - Register
2. Marketplace
    - List with pagination and filter
    - Detail
3. Product
    - Create product

## Stack used
1. Express
2. Jose jwt
3. Body parser
4. Joi validation
5. Sequalize orm
6. Docker
7. PostgreSQL

## API Client Test
- Postman
    - Klontong API.postman_collection.json
# Simple E-commerce API

Backend API for simple e-commerce application, built with ExpressJS and PrismaORM. Provides a comprehensive set of endpoints to handle user authentication, product management, shopping cart functionality, and order processing. The API is designed to support both customer-facing operations and administrative tasks.

## Key Features

- User authentication (register, login, logout)
- Product management (add, update, delete, search)
- Shopping cart functionality
- Order processing
- Admin panel for product and order management

## Tech Stack

- Express.js
- Prisma ORM (PostgreSQL)
- bcrypt
- Jest

## API Specifications

- [user](https://github.com/prayogad/expressjs-ecommerce-api/blob/1b719f1122255beebf5467176677ab59d1c2d20d/docs/user.md)
- [admin](https://github.com/prayogad/expressjs-ecommerce-api/blob/1b719f1122255beebf5467176677ab59d1c2d20d/docs/admin.md)
- [product](https://github.com/prayogad/expressjs-ecommerce-api/blob/1b719f1122255beebf5467176677ab59d1c2d20d/docs/product.md)

## Project Setup

Create .env file for database connection

```
DATABASE_URL="mysql://username:password@host:port/dbName"
COOKIE_PARSER_KEY="your-key"
```

```bash
$ npm install

$ npx prisma migrate dev

$ npx prisma generate

$ npm run build

$ npm run start
```
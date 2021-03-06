# How to Develop This Application

## TL;DR

Need to set up a .env? Check out the README.md

Need to edit logic? GOTO `@/src/controllers`

Need to edit a route? GOTO `@/src/routers`

Need to edit a data structure? GOTO `@/src/models`

## What is REST?

We use a programming paradigm called REST for this program.
REST is simply a way of expressing "resources."

So, if we want to get all users, we would do the following HTTP query.

`GET /api/users`

Or, one user.

`GET /api/users/1`

Or, a user's posts.

`GET /api/users/1/posts`

Or, a user's one post.

`GET /api/users/1/posts/1`

And so on...

To learn this practically, check out `resources.md`.

## What is the general layout of this program?

This program is laid out in a very common Express (Javascript web server) template.

So, here is our layout:
- `@/src/routers` This is where the data starts. This defines those `/users/1/...` that we saw above.
- `@/src/models` These are simply classes (or interfaces, which are syntactically alike) that allow us to structure our data in Typescript.
- `@/src/controllers` This is where the routers send the data. Here, actual logic of the program is executed.

## How do I start?

Make sure you have NodeJS installed. Hopefully you are using VSCode.

Make sure you have Yarn installed `npm i -g yarn`

1. Run `yarn install`
2. Fill in your .env as specified in the README.md
3. Simply open a typescript file and hit `f5`

Note: Don't have a SQL database? Do these steps:

1. Make sure you have Docker installed (Windows users, talk to your executive)
2. Go to `tooling/` and type `docker-compose up`
3. Congrats! Your database is now accessible from `localhost:3306`
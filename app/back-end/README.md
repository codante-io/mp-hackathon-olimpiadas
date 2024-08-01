# Microservice Codebase

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)]()

This repository is a **template** to be used as a basis for creating microservices.

Build a microservice if it fits into a [bounded context](https://martinfowler.com/bliki/BoundedContext.html)!
 
## Architecture

The hexagonal architecture, or ports and adapters architecture, is an architectural pattern used in software design. 
It aims at creating loosely coupled application components that can be easily connected to their software environment by means of ports and adapters. 
This makes components exchangeable at any level and facilitates test automation.

*Read!* (**recommended**)

- [The Twelve-Factor](https://12factor.net)
- [Top-Ten Vulnerabilities](https://owasp.org/www-project-top-ten)

*Recommended libs*

- [Immutable](https://immutable-js.com) - To make immutable code;
- [Dataloader](https://github.com/graphql/dataloader) - To reduce database query requests via batch and cache;
- [Knex.js](https://knexjs.org) - To make queries;
- [MongoDB](https://docs.mongodb.com/drivers/node/current) - To make queries;
- [Turfjs](https://turfjs.org/docs) - Advanced geospatial analysis;
- [joi](https://joi.dev) - Schema description language and data validator;
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - A library to help you hash passwords;

## Basic structure

**domain**

 - `entities`: Use entities as class to instantiate objects;
 - `use-cases`: Business rules;
 - `services`: Apply the use cases to build the result;
 
**interfaces**

 - Define contracts;

**controllers**

 - Entry point to the domain. Apply input validation and cache handling;

 **adapters**

  - A class that transforms (adapts) one interface to another;

**app**

 - Application edge. I/O must be configured here;

## Deploy

Read: [Github Actions Documentation](https://docs.github.com/pt/actions)

**OBS: To deploy to the test environment, you need to run the workflow manually.**

## Quickstart

Generate a new repo with this template.

### Change the environment variables in the `Makefile`

### Install dependencies and run

```bash
make install
```
```bash
make start-http
```
*running on [http://localhost:4000/graphql](http://localhost:4000/graphql)*

Check if it's running
```bash
curl --location -g --request GET 'http://localhost:4000/graphql?query={welcome(input:{name:%22Foobar%22}){message}}'
```
Response
```json
{
    "data": {
        "welcome": {
            "message": "Welcome, Foobar!"
        }
    }
}
```

**Delete the "welcome" sample code**

find references

- `grep -rn "Welcome" src/; grep -rn "Welcome" tests/;`
- `find src/ -iname *Welcome*; find tests/ -iname *Welcome*`

**Rename the name "microservice-codebase" throughout the project**

find references

- `grep -rn "microservice-codebase" .`

### Useful commands

```bash
make run-tests
```
```bash
make run-sonar
```
```bash
make docker-build
```
```bash
make docker-run
```
```bash
npm run lint
```
```bash
make build
```

### Dependencies and scripts

See file `package.json` in project root.

---------------------------------------------------------------------------

## How use

### Logger

A logger instance is available in all controllers, services and usecases

*Error*
```javascript
this.logger.error(new Error('I'm an exception!'))
```
*Info*
```javascript
this.logger.log('I'm a message!')
```

### Cache

A cache instance is available in all controllers

*Get*
```bash
let key = 'foobar'
let data = this.cache.handle(key)
```
*Set*
```bash
let key = 'foobar'
this.cache.handle(key, { foo: 'bar' })
```
*Generate key* (**Use generated hashes as keys for cache**)
```bash
let text = 'foobar'
let hash = this.cache.generateKey(key)
// output: 'Zm9vYmFy'
```

---------------------------------------------------------------------------

## See good practice guidelines

Changes or problems, discuss with the chapter!

---------------------------------------------------------------------------

keep it simple, stupid

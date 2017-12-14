# middleware-mutli-rest [![Build Status](https://travis-ci.org/ChronoBank/middleware-nem-rest.svg?branch=master)](https://travis-ci.org/ChronoBank/middleware-multi-rest)

Middleware service which serves as proxy for makig api calls to middlewares

### Installation

1) Clone the repo, and run ```npm install```.
2) Create the .env file, or define the vars in ecosystem.config.js.
3) then just run the core process ```node .```

#### About
This module is used for interaction with middleware's rest services and serves as a proxy level.
All rules and routes are defined within node-red. So, you don't need to write any code - you can create your own flow with UI tool supplied by node-red itself. Access by this route:
```
/admin
````


### Migrations
Migrations includes the predefined users for node-red (in order to access /admin route), and already predefined flows.
In order to apply migrations, type:
```
npm run migrate_red
```
The migrator wil look for the mongo_db connection string in ecosystem.config.js, in .env or from args. In case, you want run migrator with argument, you can do it like so:
```
npm run migrate_red mongodb://localhost:27017/data
```

#### Predefined Routes with node-red flows


The available routes are listed below:

| route | methods | params | description |
| ------ | ------ | ------ | ------ |
| /(dev|main)/addr   | POST | ``` {nem: <string>, eth: <string>, bitcoin: <string>, litecoin: <string>, waves: <string>} ``` | register  addresses on middlewares (all params are optional, should present at least one in the following object).
|  /(dev\|main)/addr  | DELETE | ``` {nem: <string>, eth: <string>, bitcoin: <string>, litecoin: <string>, waves: <string>} ``` | remove an addresses from middlewares (all params are optional, should present at least one in the following object).
| /(dev\|main)/<network>/:request   | GET |  | proxy call, where  network: bitcoin, eth, litecoin, waves, nem, and request - is the original path of request to certain middleware, for instance, for testnet bitcoin node utxo request will look like so ```/dev/bitcoin/addr/mh2bbq9LDcHrXreN8RuyoUmJgWfLQgm5vg/utxo```
| /(dev\|main)/<network>/:request   | POST |  | proxy call, where  network: bitcoin, eth, litecoin, waves, nem, and request - is the original path of request to certain middleware.



##### сonfigure your .env

To apply your configuration, create a .env file in root folder of repo (in case it's not present already).
Below is the expamle configuration:

```
REST_PORT=8081
MONGO_URI=mongodb://localhost:27018/data
NODERED_AUTO_SYNC_MIGRATIONS=true

HOST_MAIN_BITCOIN=https://middleware-bitcoin-mainnet-rest.chronobank.io
HOST_MAIN_ETH=https://middleware-ethereum-mainnet-rest.chronobank.io
HOST_MAIN_LITECOIN=https://middleware-litecoin-mainnet-rest.chronobank.io
HOST_MAIN_NEM=https://middleware-nem-mainnet-rest.chronobank.io
HOST_MAIN_WAVES=https://middleware-waves-mainnet-rest.chronobank.io

HOST_DEV_BITCOIN=https://middleware-bitcoin-testnet-rest.chronobank.io
HOST_DEV_ETH=https://middleware-ethereum-testnet-rest.chronobank.io
HOST_DEV_LITECOIN=https://middleware-litecoin-testnet-rest.chronobank.io
HOST_DEV_NEM=https://middleware-nem-testnet-rest.chronobank.io
HOST_DEV_WAVES=https://middleware-waves-testnet-rest.chronobank.io
```

The options are presented below:

| name | description|
| ------ | ------ |
| REST_PORT   | REST port
| MONGO_URI   | the URI string for mongo collection for keeping node-red users and flows
| NODERED_AUTO_SYNC_MIGRATIONS   | autosync migrations on start (default = yes)
| HOST_MAIN_BITCOIN   | bitcoin mainnet middleware's endpoint
| HOST_MAIN_ETH   | eth mainnet middleware's endpoint
| HOST_MAIN_LITECOIN   | litecoin mainnet middleware's endpoint
| HOST_MAIN_NEM   | nem mainnet middleware's endpoint
| HOST_MAIN_WAVES   | waves mainnet middleware's endpoint
| HOST_DEV_BITCOIN   | bitcoin testnet middleware's endpoint
| HOST_DEV_ETH   | eth testnet middleware's endpoint
| HOST_DEV_LITECOIN   | litecoin testnet middleware's endpoint
| HOST_DEV_NEM   | nem testnet middleware's endpoint
| HOST_DEV_WAVES   | waves testnet middleware's endpoint

License
----

MIT
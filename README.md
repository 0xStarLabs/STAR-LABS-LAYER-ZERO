# STAR-LABS-LAYER-ZERO

## [SEE ENGLISH VERSION BELOW ](https://github.com/0xStarLabs/STAR-LABS-LAYER-ZERO#english-version)👇

## 🔗 Links
[![Telegram channel](https://img.shields.io/endpoint?url=https://runkit.io/damiankrawczyk/telegram-badge/branches/master?url=https://t.me/StarLabsTech)](https://t.me/StarLabsTech)
[![Telegram chat](https://img.shields.io/endpoint?url=https://runkit.io/damiankrawczyk/telegram-badge/branches/master?url=https://t.me/StarLabsChat)](https://t.me/StarLabsChat)

🔔 CHANNEL: https://t.me/StarLabsTech

💬 CHAT: https://t.me/StarLabsChat

💰 DONATION EVM ADDRESS: 0x620ea8b01607efdf3c74994391f86523acf6f9e1

📖 FULL TUTORIAL: https://teletype.in/@neon_rs/STAR_LABS_LAYER_ZERO


## 🤖 | Функционал:
🟢  Взаимодействие с протоколами: MERKLY, L2PASS, L2TELEGRAPH, ZERIUS

🟢  Поддержка сурс сетей: Polygon, Celo, Klaytn, Moonriver, Moonbeam, Gnosis, Conflux

🟢  Пополнение балансов через OKX

🟢  Установка предельной стоимости газа для каждой сети

🟢  Выбор диапазона количества транзакций.

🟢  Логирование всех действий

🟢  Возможность делать апрувы на незначительные суммы между транзакциями л0 (анти-Sybil система).

🟢  Асинхронность и многопоточность. Запуск всех аккаунтов одновременно с различным временем задержки старта и случайными интервалами между транзакциями.


## 🚀 Installation
```

# для работы необходимо установить NodeJS!
# https://nodejs.org/en/download/current

git clone https://github.com/0xStarLabs/STAR-LABS-LAYER-ZERO.git

cd StarLabs-Discord

npm i
npm install -g typescript

если ccxt не установилась с первого раза 
npm uninstall ccxt          ( удаляем библиотеку )
npm i --save-dev ccxt      ( скачиваем по новой )

# Перед началом работы настройте необходимые модули в файлах config.ts и /data

npm start
```
## ⚙️ Config

| Name | Description |
| --- | --- |
| protocols | в квадратные скобочки вставляете протоколы с которыми хотите чтобы скрипт взаимодействовал. По дефолту включены все, если хотите так и оставить - ничего не трогайте. На строчку выше есть памятка с их названиями. |
| networks | В квадратные скобочки вставляете сети которые скрипт использовал. По дефолту включены все, если хотите так и оставить можно ничего не трогать. На строчку выше есть памятка с их названиями. |
| approve | Ставите либо true либо false. Если true будет делать апрувы случайных токенов для случайных протоколов на супер мелкие суммы. Смысл в том, чтобы не кидать одни только транзакции л0 подряд. |
| exchange | withdraw: Выбираете использовать ли биржу в переменной exchange (true / false). Если false - будет работать с тем, что есть на кошельке. Если true - при запуске выведет нативку в сети, где баланс ниже минимальных значений. (На окекс у вас должны быть монеты, чтобы их выводить). С какими сетями и протоколами работать также можно указать в конфиге. Ссылка на полный гайд ниже. Если выбрали true, то также нужно заполнить  |
| OKX_API_KEY | апи ключ |
| OKX_SECRET_KEY | секретный ключ (дается при генерации апи ключа) |
| OKX_PASSPHRASE | пароль от аккаунта |
| amounts | Диапазон того, сколько монет выводить для каждой сети. Можно не трогать. При таких значениях хватает примерно на 100 транз.  |
| maxGasPrice | максимальное количество гвей при котором будет кидать транзакции в определенной сети, если в одной из сетей газ временно завышен то при выборе её не будет учитывать до того момента, как он не опустится ниже приемлимых значений, если везде выше то выбирает случайную сеть и ждет.|
| iterationRange | диапазон (от и до) транзакций, которые скрипт будет кидать на каждом кошельке |
| initializationTime | сколько секунд будут запускаться все потоки. К примеру у вас 100 акков, вы ставите 10000 секунд. Бот будет запускать в работу каждый последующий аккаунт в промежутке 50 - 200 секунд. |
| pause | диапазон секунд паузы между каждой новый транзакцей у кошелька.  |
| privateKeysRandomMod | режим рандомизации приватных ключей. shuffle - перемешивает при каждом запуске. order - идет по списку из переменной под таким же названием снизу, consecutive - просто идет по порядку. | 
| order | Номера приватных ключей по которым будет запускаться скрипт, если вы выберете режим order в privateKeysRandomMod.  К примеру вы указываете 1, 7, 2. Скрипт сначала запустит кошелек 1, потом кошелек 7, потом кошелек 2. |

## 🗂️ Data

Данные в папке data:

| Name | Description |
| --- | --- |
| private_keys.txt | Приватные ключи |


## ENGLISH VERSION:


## 🤖 | Functionality:

🟢 Interaction with protocols: MERKLY, L2PASS, L2TELEGRAPH, ZERIUS

🟢 Support for source networks: Polygon, Celo, Klaytn, Moonriver, Moonbeam, Gnosis, Conflux

🟢 Account top-up via OKX

🟢 Setting a maximum gas price for each network

🟢 Selection of transaction count range

🟢 Logging all actions

🟢 Ability to approve minor amounts between L0 transactions (anti-Sybil system)

🟢 Asynchrony and multithreading. Launching all accounts simultaneously with varying start delay times and random intervals between transactions


## 🚀 Installation
```

# NodeJS is required!
# https://nodejs.org/en/download/current

git clone https://github.com/0xStarLabs/STAR-LABS-LAYER-ZERO.git

cd StarLabs-Discord

npm i
npm install -g typescript

if ccxt did not install on the first try
npm uninstall ccxt          (remove the library)
npm i --save-dev ccxt      (re-download)

# Before starting, configure the necessary modules in config.ts and /data files

npm start
```

## ⚙️ Config

| Name | Description |
| --- | --- |
| protocols | Insert the protocols you want the script to interact with in square brackets. By default, all are enabled; if you want to leave it that way, do not touch anything. There's a reminder of their names above. |
| networks | nsert the networks the script used into square brackets. By default, all are enabled; if you want to leave it that way, do not touch anything. There's a reminder of their names above. |
| approve | Set either true or false. If true, it will approve random tokens for random protocols for tiny amounts. The idea is not to just send L0 transactions in a row. |
| exchange |Choose whether to use the exchange in the exchange variable (true / false). If false - will work with what is in the wallet. If true - at startup, it will withdraw native coins in the network where the balance is below the minimum values. (You must have coins on OKEX to withdraw them). Which networks and protocols to work with can also be specified in the config. Link to the full guide below. If you chose true, you also need to fill out |
| OKX_API_KEY |	API key |
| OKX_SECRET_KEY | secret key (given when generating an API key) |
| OKX_PASSPHRASE | account password |
| amounts | The range of how many coins to withdraw for each network. Can be left as is. With such values, it's enough for about 100 transactions. |
| maxGasPrice |	The maximum amount of gwei to send transactions in a certain network, if the gas is temporarily inflated in one of the networks it will not consider choosing it until it drops below acceptable values, if it's higher everywhere then it selects a random network and waits. |	
| iterationRange | The range (from and to) of transactions the script will send on each wallet. |
| initializationTime |	How many seconds all threads will start. For example, you have 100 accounts, you set 10000 seconds. The bot will start each subsequent account in the interval of 50 - 200 seconds. |
| pause | The range of seconds of pause between each new transaction in the wallet. |
| privateKeysRandomMod |Private key randomization mode. shuffle - shuffles each time it starts. order - follows the list from the variable of the same name below, consecutive - just goes in order. |
| order | Numbers of private keys by which the script will start, if you choose the order mode in privateKeysRandomMod. For example, you specify 1, 7, 2. The script will first start wallet 1, then wallet 7, then wallet 2. |

## 🗂️ Data
Data in the data folder:
| Name | Description |
| --- | --- |
| private_keys.txt |	Private keys |

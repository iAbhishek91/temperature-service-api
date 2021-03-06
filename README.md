# Temperature Service

service to detect temperature and humidity based on geo position

## Table of content

* [Quick start](#Quick-start)
* [Unit test](#Unit-test)
  * [Unit test reports](#Unit-test-reports)
* [API documentation](#API-documentation)
* [Temperature and humidity algorithm](#Temperature-and-humidity-algorithm)

## Quick start

* install *node* and *yarn*. Install yarn using below command.

```sh
npm install -g yarn
```

* clone the repo from the github.

```sh
git clone "git@github.com:iAbhishek91/temperature-service-api.git"
```

* install the required packages

```sh
yarn
```

* quick start the application

```sh
yarn start
```

## Unit test

* this microservice has 100% unit test coverage.
* also lint test are integrated.

```sh
yarn test
```

### Unit test reports

post execution of unit test, following reports are generated.

* **coverage report**: available at `./coverage/Icov-report/index.html`.
* **unit test report**: avialble at `./unitTestResult.html`

## Dockerize

```sh
docker build -t abdas81/temperature-service
```

## API documentation

refer API documentation: `<hosted-domain>/api/v1/docs`

## Temperature and humidity algorithm

for simplicity, I have divided *earth* into 3 zone (purly fictitious)

* **tropical region** (latitude between +20 and -20)
  * high temperature: 30 to 55 degree celcius
  * high humidity: between 60 and 90 %
* **arctic region** (latitude between +45 and 90 or -45 and -90)
  * low temperature: 0 to 15 degree celcius
  * low humidity: between 0 and 20 %
* **between topical and arctic** (latitude between +21 and 44 or -21 to -44)
  * medium temperature: 10 to 25 degree celcius
  * medium humidity: between 10 and 70 %

> If longitude is +ve(east hemisphere)
> then the above calculated temperature and humidity are increased by 5

### Valid values

* latitude: between -90 and +90
* longitude: between -180 and +180

> If invalid values are passed the service throws HTTP 400

### Example

```js
latitude = 85.76868; longitude = 120.6876;
{
  temperature: 18,
  humidity: 20,
}
```

```js
latitude = -95.; longitude = 120;
{
  error: 'error message......',
}
```

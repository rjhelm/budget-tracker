<h1 align="center">Budget Tracker</h1>
  
<p align="center">
    <img src="https://img.shields.io/github/languages/top/rjhelm/budget-tracker"  />
    <img src="https://img.shields.io/github/last-commit/rjhelm/budget-tracker" >
</p>
  
<p align="center">
    <img src="https://img.shields.io/badge/node-orange" />
    <img src="https://img.shields.io/badge/express-purple" />
    <img src="https://img.shields.io/badge/mongodb-blue"  />
    <img src="https://img.shields.io/badge/javascript-blue"  />
    <img src="https://img.shields.io/badge/heroku-green" />
</p>

## Description

A Financial tool that can be accessed and updated by the user whether they have an internet connection or not.

![Budget-Tracker](/assets/budget-deployed.PNG)

[Deployed on Heroku](https://limitless-island-38092.herokuapp.com/)

## User Story

AS AN avid traveler
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling

GIVEN a budget tracker without an internet connection
WHEN the user inputs an expense or deposit
THEN they will receive a notification that they have added an expense or deposit
WHEN the user reestablishes an internet connection
THEN the deposits or expenses added while they were offline are added to their transaction history and their totals are updated

## Table of Contents

- [Description](#description)
- [User Story](#user-story)
- [Table of Contents](#table-of-contents)
- [Dependencies](#dependencies)
- [About](#about)
- [Contributing](#contributing)
- [Questions](#questions)

## Dependencies

Budget Tracker Built With:

- node
- express
- Mongoose
- MongoDB
- Morgan
- Lite Server

## About

Budget Tracker was built to support offline functionality so that a user can track and update their finances at any time without worrying about a connection.

- The app will allow the user to update their financial information while offline and when they are next able to connect to the internet the total is updated to reflect offline data.

This app uses indexDB and service workers to store the information entered by the user and updat the data once the connection is re-established. 

## Contributing

:octocat: [Ryan Helm](https://github.com/rjhelm)

## Questions

Questions are welcome and you can contact me at:

[Email](mailto:ryjhelm@gmail.com)<br />
[GitHub](https://github.com/rjhelm)<br />

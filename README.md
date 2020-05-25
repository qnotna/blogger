# awfu-sose20 Angular Blogger

## Table of Contents

- [Setup](#setup)
    - [Credentials](#credentials)
- [Introduction to Blogger](#introduction-to-blogger)

## Setup

Clone the repository and run `npm i`.
Run `npm run start` which will be run on port 4200 on default*. 

*Note: if you want to run this on `another port`, you need to put your port into the `javascript origin domains` in the `OAuth-Client` in the Credentials page and use `port flag in package.json` when executing npm run start

### Credentials
In order to retrieve remote blogger data from blogger-api, you need to sign in the following google account on the blogger-app after running it in your browser:

email: bobby.brown.baker@gmail.com

pw: angular20

For this google account are two credentials given
- API-key: AIzaSyD0YDZhEmlsFZ62Z8BwEcWakH4oX--W0nI
- OAuth-Client-Id: 938430199904-pd8up38blda9839p5h6er0n2dk4afhi5.apps.googleusercontent.com

They are already used in our blogger-app, so no concern to do anything from here

## Introduction to Blogger
For working with blogs, posts, comments, ...  from blogger-api read doc [here](https://developers.google.com/blogger/docs/3.0/using#WorkingWithBlogs).

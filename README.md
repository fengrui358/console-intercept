# [console-intercept](https://github.com/fengrui358/console-intercept)

[![jslib](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/fengrui358/console-intercept/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/fengrui358/console-intercept.svg?branch=master)](https://travis-ci.org/fengrui358/console-intercept)
[![Coveralls](https://img.shields.io/coveralls/fengrui358/console-intercept.svg)](https://coveralls.io/github/fengrui358/console-intercept)
[![npm](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/console-intercept)
[![NPM downloads](http://img.shields.io/npm/dm/console-intercept.svg?style=flat-square)](http://www.npmtrends.com/console-intercept)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/fengrui358/console-intercept.svg)](http://isitmaintained.com/project/fengrui358/console-intercept "Percentage of issues still open")

The best third party `JS|TS` library scaffold.

## How To Use

- install: `npm i console-intercept`
- use in browser: `import { intercept } from 'console-intercept'`
- use in node: `const { intercept } from 'console-intercept'`
- intercept: `intercept((name, args) => { //name is console's methods name, args is console's arguments })`
- interceptRemoteLog: `interceptRemoteLog(appName, url)`

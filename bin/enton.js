#!/usr/bin/env node

const spawn = require('cross-spawn');
const { argv } = require('yargs');

spawn('babel-node', argv._, { stdio: 'inherit' });

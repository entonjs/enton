const Middleware = require('./middleware');
const { Delete, Get, Post, Put } = require('./route');
const Use = require('./use');
const Controller = require('./controller');

module.exports = {
  Middleware,
  Delete,
  Get,
  Post,
  Put,
  Use,
  Controller,
};

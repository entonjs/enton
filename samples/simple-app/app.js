import { createApp } from '../../src/core';
import MyController from './my.controller';

class App {
  controllers() {
    return [MyController];
  }
}

createApp(App);

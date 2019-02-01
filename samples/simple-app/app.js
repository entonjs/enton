import { createApp } from '../../src/core';
import MyController from './my.controller';

class App {
  onLoad() {
    // triggers when app is loaded; best place to load or modify config
  }

  onInit() {
    // triggers when app is initialized; best place to hook app level middlewares.
  }

  beforeListen() {}

  afterListen() {}

  onError() {}

  onExit() {}

  controllers() {
    return [MyController];
  }
}

createApp(new App());

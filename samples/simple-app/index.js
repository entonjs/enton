import createApp from '../../src/app';
import { Use } from '../../src/decorators';
import MyController from './my.controller';

@Use(MyController)
class App {
  load() {
    // triggers when app is loaded; best place to load or modify config
  }
}

createApp(new App());

import { Get, Controller, Middleware } from '../../src/decorators';
import upperCaseMiddleware from './upperCase.middleware';

@Controller('/my')
class MyController {
  @Get('/:name')
  @Middleware(upperCaseMiddleware)
  index(req, res) {
    res.send(`Hey there ${req.name}`);
  }
}

export default MyController;

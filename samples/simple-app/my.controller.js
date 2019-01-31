import { Get, Controller, Middleware } from '../../src/decorators';

const middleware = (req, res, next) => {
  next();
};

@Controller('/my')
class MyController {
  @Get('/:id')
  @Middleware(middleware)
  index(req, res) {
    res.send('done');
  }
}

export default MyController;

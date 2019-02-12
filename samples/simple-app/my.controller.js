import { Get, Controller } from '../../src/decorators';

@Controller('/my')
class MyController {
  @Get('/:name')
  index(req, res) {
    res.send(`Hey there ${req.params.name}`);
  }
}

export default MyController;

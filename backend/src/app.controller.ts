import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller({
  path: '/',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Hello World!',
    type: String,
  })
  @ApiOperation({ summary: 'Hello World!' })
  getHello(): string {
    return this.appService.getHello();
  }
}

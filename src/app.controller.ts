import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';
import type { Response } from 'express';
const fs = require('fs');
const htmltopdf = require('html-pdf-node');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create')
  async create(@Body() body: any, @Param() params: any) {
    const document = await this.appService.create();
    const options = {
      format: 'A4',
      width: params.width,
      height: params.height,
    };

    const file = { content: body.content };
    htmltopdf.generatePdf(file, options).then((pdfBuffer) => {
      fs.writeFile(
        __dirname + `/../src/pdfs/${document.id}.pdf`,
        pdfBuffer,
        (err) => {
          if (err) throw err;
          console.log('Done');
        },
      );
    });
    return document.id;
  }

  // @Get('/all')
  // async findAll() {
  //   const documents = await this.appService.findAll();
  //   const files: StreamableFile[] = [];
  //   for (var i = 0; i < documents.length; i++) {
  //     const file = createReadStream(
  //       join(process.cwd(), `/src/pdfs/${documents[i].id}.pdf`),
  //     );
  //     files.push(new StreamableFile(file));
  //   }
  //   return files;
  // }

  @Get('/all')
  async findAll() {
    const documents = await this.appService.findAll();
    return documents;
  }

  @Get('/findOne')
  async findOne(@Body() body: any) {
    const document = await this.appService.findOne(body.id);
    return document;
  }

  @Get('/delete')
  async remove(@Body() body: any) {
    const document = await this.appService.remove(parseInt(body.id));
    fs.unlink(__dirname + `/../src/pdfs/${body.id}.pdf`, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });
    return document.id;
  }

  @Get('/download')
  async download(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const file = createReadStream(
      join(process.cwd(), `/src/pdfs/${body.id}.pdf`),
    );
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${body.id}.pdf"`,
    });

    return new StreamableFile(file);
  }
}

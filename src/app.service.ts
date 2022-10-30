import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from './app.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(App) private repo: Repository<App>) {}

  create() {
    const document = this.repo.create({});

    return this.repo.save(document);
  }

  findAll() {
    const documents = this.repo.find();
    return documents;
  }

  findOne(id: number) {
    const document = this.repo.findOne({ where: { id } });
    return document;
  }

  async remove(id: number) {
    const document = await this.findOne(id);
    return this.repo.remove(document);
  }
}

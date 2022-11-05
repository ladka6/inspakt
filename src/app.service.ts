import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './entities/ApiKey.entitiy';
import { Document } from './entities/document.entitiy';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ApiKey) private keyRepo: Repository<ApiKey>,
    @InjectRepository(Document) private documentRepo: Repository<Document>,
  ) {}

  createApi(key: string) {
    const apiKey = this.keyRepo.create({ key });
    return this.keyRepo.save(apiKey);
  }

  async validateApi(key: string) {
    const apiKey = await this.keyRepo.findOne({ where: { key } });
    if (apiKey) {
      if (apiKey.active) return true;
    }
    return false;
  }

  async createPdf(content: string, path: string, key: string) {
    const document = this.documentRepo.create({ content, path, key });
    return this.documentRepo.save(document);
  }

  findAll() {
    const documents = this.documentRepo.find();
    return documents;
  }

  findOne(id: number) {
    const document = this.documentRepo.findOne({ where: { id } });
    return document;
  }

  async remove(id: number) {
    const document = await this.findOne(id);
    return this.documentRepo.remove(document);
  }
}

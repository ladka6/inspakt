import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiKey } from './entities/ApiKey.entitiy';
import { Document } from './entities/document.entitiy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '150415egE',
      database: 'inspakt',
      entities: [ApiKey, Document],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ApiKey, Document]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

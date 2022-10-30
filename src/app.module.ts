import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { App } from './app.entity';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '150415egE',
      database: 'inspakt',
      entities: [App],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([App]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleModule } from './article/article.module';
import { Posts } from './article/posts.model';
import { ArticleService } from './article/article.service';
import { ArticleController } from './article/article.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'users',
      database: 'posts',
      models: [Posts],
    }),
    ArticleModule
  ],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService],
})
export class AppModule {}

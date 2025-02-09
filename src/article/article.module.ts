import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './posts.model';

@Module({
    imports: [SequelizeModule.forFeature([Posts])],
    // export it to use it outside this module
    exports: [SequelizeModule]
})

@Module({})
export class ArticleModule {}

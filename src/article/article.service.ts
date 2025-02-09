import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from './posts.model';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Posts) private articleModel: typeof Posts) {}

  async create(data: CreateArticleDto): Promise<object> {
    const formattedData = {
      Title: data.title,
      Content: data.content,
      Category: data.category,
      Status: data.status,
    };
    
    await this.articleModel.create(formattedData as any);

    return {};
  }
  
  async findAll(page = 1, limit =5): Promise<Posts[]> {
    const offset = (page - 1) * limit;
    return await this.articleModel.findAll({
      limit,
      offset,
    });
  }

  async findOne(id: number): Promise<Posts> {
    const article = await this.articleModel.findByPk(id);
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async update(id: number, data: UpdateArticleDto): Promise<object> {
    const article = await this.findOne(id);
  
    const formattedData = {
      ...(data.title && { Title: data.title }),
      ...(data.content && { Content: data.content }),
      ...(data.category && { Category: data.category }),
      ...(data.status && { Status: data.status }),
    };
  
    await article.update(formattedData);
    return {}
  }
  
  async remove(id: number): Promise<void> {
    const article = await this.findOne(id);
    await article.destroy();
  }
}

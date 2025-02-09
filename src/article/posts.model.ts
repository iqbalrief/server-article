import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'posts', // Sesuai dengan standar konvensi penamaan tabel
    timestamps: true, // Mengaktifkan otomatis createdAt & updatedAt
  })
  export class Posts extends Model<Posts> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column({ type: 'varchar(200)' })
    Title: string;
  
    @Column({ type: 'text' })
    Content: string;
  
    @Column({ type: 'varchar(100)' })
    Category: string;
  
    @CreatedAt
    @Column
    Created_date: Date;
  
    @UpdatedAt
    @Column
    Updated_date: Date;
  
    @Column({ type: 'varchar(100)' })
    Status: string;
  }
  
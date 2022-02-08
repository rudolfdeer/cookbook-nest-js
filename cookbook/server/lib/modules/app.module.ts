import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookbookModule } from './cookbook/cookbook.module';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import "reflect-metadata";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
    }),
    CookbookModule,
    RecipeModule,
    UserModule,
  ],
})
export class AppModule {}

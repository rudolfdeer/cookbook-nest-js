import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookbookModule } from './modules/cookbook.module';
import { RecipeModule } from './modules/recipe.module';
import { UserModule } from './modules/user.module';
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

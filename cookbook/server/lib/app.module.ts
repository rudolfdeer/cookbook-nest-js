import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookbooksModule } from './modules/cookbooks.module';
import { RecipesModule } from './modules/recipes.module';
import { UsersModule } from './modules/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
    }),
    CookbooksModule,
    RecipesModule,
    UsersModule,
  ],
})
export class AppModule {}

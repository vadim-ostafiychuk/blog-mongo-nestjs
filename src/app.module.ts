import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.getOrThrow('MONGO_URI'));

        return {
          uri: configService.getOrThrow('MONGO_URI'),
        };
      },
      imports: [ConfigModule],
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

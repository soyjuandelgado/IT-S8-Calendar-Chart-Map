import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './users/users.module';
import { MeetingsModule } from './meetings/meetings.module';
import { configService } from './config/config.service';

@Module({
  imports: [
    // UsersModule,
    MeetingsModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

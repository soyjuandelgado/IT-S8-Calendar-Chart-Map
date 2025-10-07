import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsModule } from './meetings/meetings.module';
import { configService } from './config/config.service';
import { SeedService } from './seed/seed.service';
import { Meeting } from './meetings/meeting.entity';

@Module({
  imports: [
    // UsersModule,
    MeetingsModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Meeting]),
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}

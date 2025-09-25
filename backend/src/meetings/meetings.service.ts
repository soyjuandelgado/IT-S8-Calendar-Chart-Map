import { Injectable, NotFoundException } from '@nestjs/common';
import { MeetingDto } from './meeting.dto';
import { Meeting } from './meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting) private meetingsRepository: Repository<Meeting>,
  ) {}

  async findAll(params): Promise<Meeting[]> {
    return await this.meetingsRepository.find();
  }

  async find(meetingId: string): Promise<Meeting> {
    const meeting = await this.meetingsRepository.findOne({
      where: { id: parseInt(meetingId) },
    });
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }
    return meeting;
  }

  create(newMeeting: MeetingDto): Promise<Meeting> {
    return this.meetingsRepository.save(newMeeting);
  }

  async delete(meetingId: string): Promise<any> {
    return this.meetingsRepository.delete({ id: parseInt(meetingId) });
  }

  async update(meetingId: string, newMeeting: MeetingDto): Promise<Meeting> {
    const toUpdate = await this.meetingsRepository.findOne({
      where: { id: parseInt(meetingId) },
    });
    if (!toUpdate) {
      throw new NotFoundException('Meeting not found');
    }
    const updated = Object.assign(toUpdate, newMeeting);
    return this.meetingsRepository.save(updated);
  }
}

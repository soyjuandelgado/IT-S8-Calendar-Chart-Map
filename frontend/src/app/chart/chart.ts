import { Component, computed, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { MeetingsService } from '../shared/services/meetings-service';
import { IMeeting } from '../shared/models/imeeting';

@Component({
  selector: 'app-chart',
  imports: [ChartModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart {
  service = inject(MeetingsService);
  meetings = this.service.meetings;

  chartData = computed(() => {
    const meetings = this.meetings();
    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const data = new Array(7).fill(0);

    meetings.forEach((meetings: IMeeting) => {
      const date = new Date(meetings.date);
      const dayIndex = (date.getDay() + 6) % 7;
      data[dayIndex]++;
    });

    return{
      labels: daysOfWeek,
      datasets: [
        {
          label: 'Events for Day of Week',
          backgroundColor: '#42A5F5',
          data: data,
        }
      ]
    }
  });

  options = {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
      title: {
        display: true,
        text: 'Events for Week',
        color: '#333',
      },
    },
    scales: {
      x: {
        ticks: { color: '#495057' },
        grid: { color: '#ebedef' },
      },
      y: {
        ticks: { color: '#495057' },
        grid: { color: '#ebedef' },
      },
    },
  };
}

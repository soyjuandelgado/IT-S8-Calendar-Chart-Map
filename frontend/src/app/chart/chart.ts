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

  chartDataWeek = computed(() => {
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

    return {
      labels: daysOfWeek,
      datasets: [
        {
          label: 'Events for Day of Week',
          backgroundColor: '#42A5F5',
          data: data,
        },
      ],
    };
  });

  optionsWeek = {
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

  chartDataMonth = computed(() => {
    const meetings = this.meetings();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const data = new Array(12).fill(0);

    meetings.forEach((meeting: IMeeting) => {
      const date = new Date(meeting.date);
      const monthIndex = date.getMonth();
      data[monthIndex]++;
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Events for Month',
          backgroundColor: '#495057', // Color de fondo para los puntos
          borderColor: '#42A5F5', // Color de la línea
          tension: 0.4, // Curvatura de la línea
          data: data,
        },
      ],
    };
  });

  optionsMonth = {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
      title: {
        display: true,
        text: 'Events for Month',
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

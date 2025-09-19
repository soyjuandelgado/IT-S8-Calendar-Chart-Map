import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart',
  imports: [ChartModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart {
  basicData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Ventas 2024',
        backgroundColor: '#42A5F5',
        data: [65, 59, 80, 81],
      },
    ],
  };
  options = {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
      title: {
        display: true,
        text: 'Ventas Trimestrales',
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

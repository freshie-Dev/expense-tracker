import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { BudgetStore } from '../../../shared/state/budget.store';
import type { Category } from '../../../shared/models';

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

@Component({
  selector: 'app-dashboard-page',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ChartModule,
    TableModule,
    ProgressBarModule,
    TagModule,
    RouterLink
  ],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage {
  private readonly store = inject(BudgetStore);

  readonly plan = this.store.activePlan;
  readonly categories = this.store.categoriesForActivePlan;
  readonly spentByCategoryId = this.store.spentByCategoryId;
  readonly totalSpent = this.store.totalSpent;
  readonly remainingIncome = this.store.remainingIncome;
  readonly allocationTotal = this.store.allocationTotal;

  readonly allocationRemaining = computed(() => {
    const p = this.plan();
    if (!p) return 0;
    return Math.round((p.totalIncome - this.allocationTotal()) * 100) / 100;
  });

  readonly spendingChartData = computed(() => {
    const cats = this.categories();
    if (!cats.length) return null;

    const labels = cats.map((c) => c.name);
    const data = cats.map((c) => this.spent(c.id));

    const palette = [
      '#60a5fa',
      '#34d399',
      '#fbbf24',
      '#f87171',
      '#a78bfa',
      '#fb7185',
      '#22c55e',
      '#38bdf8',
      '#f97316',
      '#e879f9'
    ];

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map((_, i) => palette[i % palette.length]),
          borderWidth: 0
        }
      ]
    };
  });

  readonly spendingChartOptions = computed(() => ({
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color:
            typeof document !== 'undefined'
              ? getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#fff'
              : '#fff'
        }
      },
      tooltip: {
        callbacks: {
          label: (ctx: { label: string; raw: number }) => `${ctx.label}: ${ctx.raw.toLocaleString()}`
        }
      }
    },
    cutout: '60%'
  }));

  spent(categoryId: string): number {
    return this.spentByCategoryId().get(categoryId) ?? 0;
  }

  remaining(category: Category): number {
    return Math.round((category.allocatedAmount - this.spent(category.id)) * 100) / 100;
  }

  progress(category: Category): number {
    if (category.allocatedAmount <= 0) return 0;
    return clampPercent((this.spent(category.id) / category.allocatedAmount) * 100);
  }

  severity(category: Category): 'success' | 'warn' | 'danger' {
    const pct = this.progress(category);
    if (pct < 80) return 'success';
    if (pct <= 100) return 'warn';
    return 'danger';
  }

  progressLabel(category: Category): string {
    return `${Math.round(this.progress(category))}%`;
  }
}


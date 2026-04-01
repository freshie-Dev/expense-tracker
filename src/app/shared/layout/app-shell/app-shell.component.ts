import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import type { MenuItem } from 'primeng/api';

import { BudgetStore, type OverspendBehavior } from '../../state/budget.store';

type OverspendOption = { label: string; value: OverspendBehavior };

@Component({
  selector: 'app-shell',
  imports: [
    FormsModule,
    RouterOutlet,
    RouterLink,
    MenubarModule,
    ButtonModule,
    SelectButtonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
  private readonly router = inject(Router);
  readonly store = inject(BudgetStore);

  readonly darkMode = signal(false);

  readonly overspendOptions: OverspendOption[] = [
    { label: 'Warn', value: 'warn' },
    { label: 'Block', value: 'block' }
  ];

  readonly overspendValue = computed(() => this.store.settings().overspendBehavior);

  readonly items = computed<MenuItem[]>(() => {
    const hasPlan = !!this.store.activePlan();
    return [
      { label: 'Dashboard', icon: 'pi pi-chart-bar', routerLink: '/dashboard', disabled: !hasPlan },
      { label: 'Plan', icon: 'pi pi-calendar', routerLink: '/plan' },
      { label: 'Categories', icon: 'pi pi-tags', routerLink: '/categories', disabled: !hasPlan },
      { label: 'Expenses', icon: 'pi pi-wallet', routerLink: '/expenses', disabled: !hasPlan }
    ];
  });

  constructor() {
    // Respect OS preference by default; allow user toggle after.
    const prefersDark =
      typeof window !== 'undefined' &&
      typeof window.matchMedia !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.darkMode.set(prefersDark);

    effect(() => {
      const enabled = this.darkMode();
      const root = typeof document !== 'undefined' ? document.documentElement : null;
      if (!root) return;
      root.classList.toggle('app-dark', enabled);
    });
  }

  toggleDarkMode(): void {
    this.darkMode.update((v) => !v);
  }

  setOverspendBehavior(value: OverspendBehavior): void {
    this.store.setOverspendBehavior(value);
  }

  goToSetup(): void {
    void this.router.navigateByUrl('/plan');
  }
}


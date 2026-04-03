import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService, type MenuItem } from 'primeng/api';

import { ApiBusinessError } from '../../api/api-business.error';
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
    ConfirmDialogModule,
    ProgressBarModule,
    ProgressSpinnerModule
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
  private readonly router = inject(Router);
  private readonly messages = inject(MessageService);
  readonly store = inject(BudgetStore);

  readonly darkMode = signal(false);
  readonly settingsBusy = signal(false);

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

  async setOverspendBehavior(value: OverspendBehavior): Promise<void> {
    this.settingsBusy.set(true);
    try {
      await this.store.setOverspendBehavior(value);
    } catch (e: unknown) {
      const detail = e instanceof ApiBusinessError ? e.message : 'Could not update settings';
      this.messages.add({ severity: 'error', summary: 'Settings', detail });
    } finally {
      this.settingsBusy.set(false);
    }
  }

  goToSetup(): void {
    void this.router.navigateByUrl('/plan');
  }
}


import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';

import { ApiBusinessError } from '../../../shared/api/api-business.error';
import { PlansApiService } from '../../../shared/api/plans-api.service';
import type { PlanExportSnapshot, PlanImportMode } from '../../../shared/models';
import { BudgetStore } from '../../../shared/state/budget.store';

function toIsoDate(value: Date): string {
  const y = value.getFullYear();
  const m = String(value.getMonth() + 1).padStart(2, '0');
  const d = String(value.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseIsoDate(value: string): Date {
  const [y, m, d] = value.split('-').map((p) => Number(p));
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

@Component({
  selector: 'app-plan-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    DividerModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    ButtonModule,
    TableModule,
    TagModule,
    TextareaModule,
    SelectModule
  ],
  templateUrl: './plan.page.html',
  styleUrl: './plan.page.scss'
})
export class PlanPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly store = inject(BudgetStore);
  private readonly plansApi = inject(PlansApiService);
  private readonly messages = inject(MessageService);
  private readonly confirm = inject(ConfirmationService);

  readonly activePlan = this.store.activePlan;
  readonly plans = this.store.plans;

  readonly creating = signal(false);
  readonly activatingId = signal<string | null>(null);
  readonly deletingId = signal<string | null>(null);
  readonly resetting = signal(false);
  readonly exportingId = signal<string | null>(null);
  readonly importing = signal(false);

  readonly importOpen = signal(false);
  readonly importJson = signal('');
  readonly importMode = signal<PlanImportMode>('create');
  readonly importReplacePlanId = signal<string | null>(null);

  readonly importModeOptions = [
    { label: 'Create new plan (becomes active)', value: 'create' as const },
    { label: 'Replace an existing plan', value: 'replace' as const }
  ];

  readonly activePlanId = computed(() => this.activePlan()?.id ?? null);

  readonly form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      totalIncome: [0, [Validators.required, Validators.min(1)]],
      startDate: [new Date(), [Validators.required]],
      endDate: [new Date(), [Validators.required]]
    },
    {
      validators: [
        (group) => {
          const start = group.get('startDate')?.value;
          const end = group.get('endDate')?.value;
          if (!(start instanceof Date) || !(end instanceof Date)) return null;
          return start <= end ? null : { dateRange: true };
        }
      ]
    }
  );

  async setActive(planId: string): Promise<void> {
    this.activatingId.set(planId);
    try {
      await this.store.setActivePlan(planId);
      this.messages.add({
        severity: 'success',
        summary: 'Active plan updated',
        detail: 'Dashboard and tracking now reflect this plan.'
      });
    } catch (e) {
      this.showError(e, 'Could not activate plan');
    } finally {
      this.activatingId.set(null);
    }
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messages.add({
        severity: 'warn',
        summary: 'Fix form errors',
        detail: 'Please check required fields and date range.'
      });
      return;
    }

    const v = this.form.getRawValue();
    this.creating.set(true);
    try {
      const plan = await this.store.createPlan({
        name: v.name,
        totalIncome: v.totalIncome,
        startDate: toIsoDate(v.startDate),
        endDate: toIsoDate(v.endDate)
      });

      this.messages.add({
        severity: 'success',
        summary: 'Plan created',
        detail: `Active plan: ${plan.name}`
      });
      void this.router.navigateByUrl('/dashboard');
    } catch (e) {
      this.showError(e, 'Could not create plan');
    } finally {
      this.creating.set(false);
    }
  }

  deletePlan(planId: string): void {
    const plan = this.plans().find((p) => p.id === planId);
    this.confirm.confirm({
      header: 'Delete budget plan?',
      message:
        'This will delete the plan and its categories and expenses on the server.',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        void this.runDeletePlan(planId, plan?.name);
      }
    });
  }

  private async runDeletePlan(planId: string, name: string | undefined): Promise<void> {
    this.deletingId.set(planId);
    try {
      await this.store.deletePlan(planId);
      this.messages.add({
        severity: 'success',
        summary: 'Plan deleted',
        detail: name ? `Deleted: ${name}` : 'The plan was removed.'
      });
    } catch (e) {
      this.showError(e, 'Could not delete plan');
    } finally {
      this.deletingId.set(null);
    }
  }

  resetAll(): void {
    this.confirm.confirm({
      header: 'Reset all data?',
      message:
        'This deletes all budget plans (and related data) on the server and clears the local cache.',
      icon: 'pi pi-trash',
      acceptLabel: 'Reset',
      rejectLabel: 'Cancel',
      accept: () => {
        void this.runResetAll();
      }
    });
  }

  private async runResetAll(): Promise<void> {
    this.resetting.set(true);
    try {
      await this.store.resetAll();
      this.messages.add({
        severity: 'info',
        summary: 'Reset complete',
        detail: 'All data has been cleared.'
      });
      this.form.reset({
        name: '',
        totalIncome: 0,
        startDate: new Date(),
        endDate: new Date()
      });
    } catch (e) {
      this.showError(e, 'Could not reset data');
    } finally {
      this.resetting.set(false);
    }
  }

  private showError(e: unknown, fallback: string): void {
    const detail = e instanceof ApiBusinessError ? e.message : fallback;
    this.messages.add({ severity: 'error', summary: 'Error', detail });
  }

  asDate(value: string): Date {
    return parseIsoDate(value);
  }

  openImport(): void {
    this.importJson.set('');
    this.importMode.set('create');
    this.importReplacePlanId.set(this.activePlanId());
    this.importOpen.set(true);
  }

  closeImport(): void {
    if (!this.importing()) {
      this.importOpen.set(false);
    }
  }

  async exportPlanSnapshot(planId: string, name: string): Promise<void> {
    this.exportingId.set(planId);
    try {
      const snap = await this.plansApi.exportSnapshot(planId);
      const blob = new Blob([JSON.stringify(snap, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safe = name.replace(/[^a-z0-9-_]+/gi, '-').slice(0, 48) || 'plan';
      a.download = `budget-plan-${safe}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.messages.add({
        severity: 'success',
        summary: 'Exported',
        detail: 'JSON file downloaded. You can re-import it later from this page.'
      });
    } catch (e) {
      this.showError(e, 'Could not export plan');
    } finally {
      this.exportingId.set(null);
    }
  }

  confirmImport(): void {
    const raw = this.importJson().trim();
    if (!raw) {
      this.messages.add({
        severity: 'warn',
        summary: 'Paste JSON',
        detail: 'Paste an exported plan snapshot into the text area.'
      });
      return;
    }

    let snapshot: PlanExportSnapshot;
    try {
      snapshot = JSON.parse(raw) as PlanExportSnapshot;
    } catch {
      this.messages.add({
        severity: 'error',
        summary: 'Invalid JSON',
        detail: 'The text could not be parsed as JSON.'
      });
      return;
    }

    if (snapshot.schemaVersion !== 1) {
      this.messages.add({
        severity: 'error',
        summary: 'Unsupported snapshot',
        detail: 'Expected schemaVersion: 1.'
      });
      return;
    }

    const mode = this.importMode();
    const targetId = this.importReplacePlanId();
    if (mode === 'replace' && !targetId) {
      this.messages.add({
        severity: 'warn',
        summary: 'Select a plan',
        detail: 'Choose which plan to replace with this snapshot.'
      });
      return;
    }

    if (mode === 'replace') {
      this.confirm.confirm({
        header: 'Replace plan data?',
        message:
          'All categories and expenses for the selected plan will be removed and replaced by this snapshot. The plan row stays the same.',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Replace',
        rejectLabel: 'Cancel',
        accept: () => {
          void this.runImport(mode, targetId!, snapshot);
        }
      });
      return;
    }

    void this.runImport(mode, undefined, snapshot);
  }

  private async runImport(
    mode: PlanImportMode,
    targetPlanId: string | undefined,
    snapshot: PlanExportSnapshot
  ): Promise<void> {
    this.importing.set(true);
    try {
      await this.plansApi.importSnapshot({
        mode,
        targetPlanId: mode === 'replace' ? targetPlanId : undefined,
        snapshot
      });
      await this.store.refresh();
      this.messages.add({
        severity: 'success',
        summary: 'Import complete',
        detail:
          mode === 'create'
            ? 'New plan was created and set as active.'
            : 'Selected plan was updated from the snapshot.'
      });
      this.importOpen.set(false);
    } catch (e) {
      this.showError(e, 'Import failed');
    } finally {
      this.importing.set(false);
    }
  }
}

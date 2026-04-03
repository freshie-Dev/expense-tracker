import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';

import { ApiBusinessError } from '../../../shared/api/api-business.error';
import { BudgetStore } from '../../../shared/state/budget.store';
import type { Category } from '../../../shared/models';

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

@Component({
  selector: 'app-categories-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToolbarModule,
    CardModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    ProgressBarModule,
    TagModule
  ],
  templateUrl: './categories.page.html',
  styleUrl: './categories.page.scss'
})
export class CategoriesPage {
  readonly store = inject(BudgetStore);
  private readonly fb = inject(FormBuilder);
  private readonly messages = inject(MessageService);
  private readonly confirm = inject(ConfirmationService);

  readonly plan = this.store.activePlan;
  readonly categories = this.store.categoriesForActivePlan;
  readonly spentByCategoryId = this.store.spentByCategoryId;
  readonly allocationTotal = this.store.allocationTotal;

  readonly remainingAllocatable = computed(() => {
    const p = this.plan();
    if (!p) return 0;
    return Math.round((p.totalIncome - this.allocationTotal()) * 100) / 100;
  });

  readonly dialogOpen = signal(false);
  readonly editing = signal<Category | null>(null);
  readonly saving = signal(false);
  readonly deletingId = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
    allocatedAmount: [0, [Validators.required, Validators.min(0)]]
  });

  openCreate(): void {
    this.editing.set(null);
    this.form.reset({ name: '', allocatedAmount: 0 });
    this.dialogOpen.set(true);
  }

  openEdit(category: Category): void {
    this.editing.set(category);
    this.form.reset({ name: category.name, allocatedAmount: category.allocatedAmount });
    this.dialogOpen.set(true);
  }

  closeDialog(): void {
    this.dialogOpen.set(false);
  }

  async save(): Promise<void> {
    const p = this.plan();
    if (!p) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messages.add({
        severity: 'warn',
        summary: 'Fix form errors',
        detail: 'Category name and allocation are required.'
      });
      return;
    }

    const v = this.form.getRawValue();
    const existing = this.editing();
    const currentTotal = this.allocationTotal();
    const adjustedTotal =
      currentTotal - (existing?.allocatedAmount ?? 0) + (v.allocatedAmount ?? 0);

    if (adjustedTotal > p.totalIncome) {
      const overBy = Math.round((adjustedTotal - p.totalIncome) * 100) / 100;
      this.messages.add({
        severity: 'error',
        summary: 'Allocation exceeds income',
        detail: `Reduce allocations by ${overBy.toLocaleString()} to stay within your income.`
      });
      return;
    }

    this.saving.set(true);
    try {
      await this.store.upsertCategory({
        id: existing?.id,
        planId: p.id,
        name: v.name,
        allocatedAmount: v.allocatedAmount
      });

      this.messages.add({
        severity: 'success',
        summary: existing ? 'Category updated' : 'Category created',
        detail: 'Your allocations were saved.'
      });
      this.dialogOpen.set(false);
    } catch (e) {
      const detail = e instanceof ApiBusinessError ? e.message : 'Could not save category';
      this.messages.add({ severity: 'error', summary: 'Error', detail });
    } finally {
      this.saving.set(false);
    }
  }

  remove(category: Category): void {
    this.confirm.confirm({
      header: 'Delete category?',
      message: 'Expenses under this category will also be removed on the server.',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        void this.runDelete(category);
      }
    });
  }

  private async runDelete(category: Category): Promise<void> {
    this.deletingId.set(category.id);
    try {
      await this.store.deleteCategory(category.id);
      this.messages.add({
        severity: 'success',
        summary: 'Category deleted',
        detail: `Deleted: ${category.name}`
      });
    } catch (e) {
      const detail = e instanceof ApiBusinessError ? e.message : 'Could not delete category';
      this.messages.add({ severity: 'error', summary: 'Error', detail });
    } finally {
      this.deletingId.set(null);
    }
  }

  spent(categoryId: string): number {
    return this.spentByCategoryId().get(categoryId) ?? 0;
  }

  remaining(category: Category): number {
    return Math.round((category.allocatedAmount - this.spent(category.id)) * 100) / 100;
  }

  progress(category: Category): number {
    if (category.allocatedAmount <= 0) return 0;
    const percent = (this.spent(category.id) / category.allocatedAmount) * 100;
    return clampPercent(percent);
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

import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';

import { BudgetStore } from '../../../shared/state/budget.store';
import type { Category, Expense } from '../../../shared/models';

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
  selector: 'app-expenses-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToolbarModule,
    CardModule,
    TableModule,
    DialogModule,
    SelectModule,
    InputNumberModule,
    InputTextModule,
    TextareaModule,
    DatePickerModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './expenses.page.html',
  styleUrl: './expenses.page.scss'
})
export class ExpensesPage {
  private readonly store = inject(BudgetStore);
  private readonly fb = inject(FormBuilder);
  private readonly messages = inject(MessageService);
  private readonly confirm = inject(ConfirmationService);

  readonly plan = this.store.activePlan;
  readonly categories = this.store.categoriesForActivePlan;
  readonly spentByCategoryId = this.store.spentByCategoryId;
  readonly expenses = this.store.expensesForActivePlan;
  readonly settings = this.store.settings;

  readonly categoryById = computed(() => {
    const map = new Map<string, Category>();
    for (const c of this.categories()) map.set(c.id, c);
    return map;
  });

  readonly dialogOpen = signal(false);

  readonly form = this.fb.nonNullable.group({
    categoryId: ['', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    date: [new Date(), [Validators.required]],
    description: ['']
  });

  openCreate(): void {
    const firstCategory = this.categories()[0];
    this.form.reset({
      categoryId: firstCategory?.id ?? '',
      amount: 0,
      date: new Date(),
      description: ''
    });
    this.dialogOpen.set(true);
  }

  closeDialog(): void {
    this.dialogOpen.set(false);
  }

  private categoryRemainingAfter(categoryId: string, amount: number): number {
    const cat = this.categoryById().get(categoryId);
    if (!cat) return 0;
    const spent = this.spentByCategoryId().get(categoryId) ?? 0;
    return Math.round((cat.allocatedAmount - spent - amount) * 100) / 100;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messages.add({
        severity: 'warn',
        summary: 'Fix form errors',
        detail: 'Please select a category and enter an amount.'
      });
      return;
    }

    const v = this.form.getRawValue();
    const remainingAfter = this.categoryRemainingAfter(v.categoryId, v.amount);
    const behavior = this.settings().overspendBehavior;

    const add = () => {
      this.store.addExpense({
        categoryId: v.categoryId,
        amount: v.amount,
        date: toIsoDate(v.date),
        description: v.description
      });
      this.messages.add({
        severity: remainingAfter < 0 ? 'warn' : 'success',
        summary: 'Expense added',
        detail: remainingAfter < 0 ? 'This category is now over budget.' : 'Logged successfully.'
      });
      this.dialogOpen.set(false);
    };

    if (remainingAfter < 0 && behavior === 'block') {
      this.messages.add({
        severity: 'error',
        summary: 'Overspending blocked',
        detail: 'This expense would exceed the category budget. Change amount or allocation.'
      });
      return;
    }

    if (remainingAfter < 0 && behavior === 'warn') {
      this.confirm.confirm({
        header: 'Category will exceed budget',
        message: 'Add this expense anyway?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Add',
        rejectLabel: 'Cancel',
        accept: add
      });
      return;
    }

    add();
  }

  remove(expense: Expense): void {
    this.confirm.confirm({
      header: 'Delete expense?',
      message: 'This will remove the expense entry from this device.',
      icon: 'pi pi-trash',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        this.store.deleteExpense(expense.id);
        this.messages.add({
          severity: 'success',
          summary: 'Expense deleted',
          detail: 'Removed successfully.'
        });
      }
    });
  }

  categoryName(categoryId: string): string {
    return this.categoryById().get(categoryId)?.name ?? 'Unknown';
  }

  asDate(value: string): Date {
    return parseIsoDate(value);
  }
}


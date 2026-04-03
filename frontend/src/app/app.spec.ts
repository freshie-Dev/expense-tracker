import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { App } from './app';
import { BudgetStore } from './shared/state/budget.store';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        MessageService,
        ConfirmationService,
        {
          provide: BudgetStore,
          useValue: {
            activePlan: () => null,
            usingCachedData: () => false,
            setOverspendBehavior: () => Promise.resolve()
          } as unknown as BudgetStore
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

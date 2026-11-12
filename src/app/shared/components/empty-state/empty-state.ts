import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty-state">
      <span class="empty-state__mark" aria-hidden="true">◌</span>
      <h2 class="empty-state__title">{{ title() }}</h2>
      <p class="empty-state__message">{{ message() }}</p>
      <ng-content />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .empty-state {
      display: grid;
      justify-items: center;
      gap: 0.5rem;
      padding: 2.5rem 1.25rem;
      border: 1px dashed var(--color-border-strong);
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      text-align: center;
    }

    .empty-state__mark {
      display: grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      background: var(--color-brand-50);
      color: var(--color-brand-800);
      font-size: 1.5rem;
    }

    .empty-state__title {
      margin: 0.25rem 0 0;
      font-size: 1.2rem;
    }

    .empty-state__message {
      max-width: 42ch;
      margin: 0;
      color: var(--color-muted);
      line-height: 1.6;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
}

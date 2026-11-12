import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DemoStateService } from '../../core/services/demo-state.service';
import { InterviewPreparationPage } from './interview-preparation';

function buttonByText(
  fixture: ComponentFixture<InterviewPreparationPage>,
  label: string,
): HTMLButtonElement | undefined {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('button'),
  ).find((button) => (button.textContent ?? '').replace(/\s+/g, ' ').trim() === label);
}

describe('InterviewPreparationPage', () => {
  let state: DemoStateService;
  let fixture: ComponentFixture<InterviewPreparationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewPreparationPage],
      providers: [provideRouter([])],
    }).compileComponents();

    state = TestBed.inject(DemoStateService);
    fixture = TestBed.createComponent(InterviewPreparationPage);
    fixture.detectChanges();
  });

  it('carrega as cinco perguntas predefinidas e o aviso de simulação', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('.question-list__item')).toHaveLength(5);
    expect(element.textContent).toContain('Protótipo demonstrativo');
    expect(element.textContent).toContain('não utiliza inteligência artificial generativa');
    expect(element.textContent).toContain(
      'Sem avaliação, gravação ou pontuação.',
    );
  });

  it('marca e desmarca a pergunta atual como revisada', () => {
    buttonByText(fixture, 'Marcar como revisada')?.click();
    fixture.detectChanges();

    expect(state.isQuestionReviewed('tell-me-about-yourself')).toBe(true);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('1 de 5 revisadas');
    expect(buttonByText(fixture, 'Remover marcação de revisada')).toBeTruthy();

    buttonByText(fixture, 'Remover marcação de revisada')?.click();
    fixture.detectChanges();

    expect(state.isQuestionReviewed('tell-me-about-yourself')).toBe(false);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('0 de 5 revisadas');
  });

  it('navega para a pergunta seguinte', () => {
    buttonByText(fixture, 'Próxima →')?.click();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Por que você quer esta oportunidade?',
    );
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Pergunta 2 de 5');
  });

  it('expande e recolhe as orientações da pergunta', () => {
    buttonByText(fixture, 'Recolher orientações')?.click();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).not.toContain(
      'Por que essa pergunta costuma ser feita',
    );
    expect(buttonByText(fixture, 'Mostrar orientações')).toBeTruthy();

    buttonByText(fixture, 'Mostrar orientações')?.click();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Por que essa pergunta costuma ser feita',
    );
  });

  it('reinicia o progresso somente após confirmação', () => {
    buttonByText(fixture, 'Marcar como revisada')?.click();
    fixture.detectChanges();
    expect(state.reviewedCount()).toBe(1);

    buttonByText(fixture, 'Reiniciar progresso')?.click();
    fixture.detectChanges();

    const dialog = (fixture.nativeElement as HTMLElement).querySelector('[role="alertdialog"]');
    expect(dialog).toBeTruthy();
    expect(state.reviewedCount()).toBe(1);

    const confirmButton = Array.from(
      dialog!.querySelectorAll<HTMLButtonElement>('button'),
    ).find((button) => button.textContent?.includes('Limpar progresso'));
    confirmButton?.click();
    fixture.detectChanges();

    expect(state.reviewedCount()).toBe(0);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Progresso da entrevista reiniciado',
    );
  });

  it('não grava nem avalia respostas', () => {
    const element = fixture.nativeElement as HTMLElement;
    const text = element.textContent ?? '';

    expect(element.querySelector('textarea, input, audio')).toBeNull();
    expect(text).toContain('Nenhuma resposta é enviada, avaliada ou armazenada');
    expect(text).not.toContain('sua pontuação');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DEMO_PROFILE } from '../../core/constants/demo-data';
import { cloneProfile, DemoStateService } from '../../core/services/demo-state.service';
import { ResumePreviewPage } from './resume-preview';

function buttonByText(
  fixture: ComponentFixture<ResumePreviewPage>,
  label: string,
): HTMLButtonElement | undefined {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('button'),
  ).find((button) => (button.textContent ?? '').replace(/\s+/g, ' ').trim() === label);
}

describe('ResumePreviewPage', () => {
  let state: DemoStateService;
  let fixture: ComponentFixture<ResumePreviewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumePreviewPage],
      providers: [provideRouter([])],
    }).compileComponents();

    state = TestBed.inject(DemoStateService);
    fixture = TestBed.createComponent(ResumePreviewPage);
    fixture.detectChanges();
  });

  it('mostra o aviso de simulação e a identificação de dados fictícios', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Protótipo demonstrativo');
    expect(text).toContain('não utiliza inteligência artificial generativa');
    expect(text).toContain('CURRÍCULO DEMONSTRATIVO - DADOS FICTÍCIOS');
    expect(text).toContain(DEMO_PROFILE.displayName);
  });

  it('renderiza as seções do currículo demonstrativo', () => {
    const headings = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.resume-section h3'),
    ).map((heading) => heading.textContent?.trim());

    expect(headings).toEqual([
      'Objetivo profissional',
      'Formação',
      'Experiências e vivências',
      'Cursos e oficinas',
      'Competências',
    ]);
  });

  it('oferece navegação para a preparação de entrevista', () => {
    const link = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a'),
    ).find((anchor) => anchor.textContent?.includes('Ir para preparação de entrevista'));

    expect(link?.getAttribute('href')).toBe('/entrevista');
  });

  it('aciona a impressão do navegador', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => undefined);

    buttonByText(fixture, 'Imprimir currículo demonstrativo')?.click();

    expect(printSpy).toHaveBeenCalledTimes(1);
    printSpy.mockRestore();
  });

  it('reinicia a demonstração somente após confirmação', () => {
    const modified = cloneProfile(DEMO_PROFILE);
    modified.professionalGoal = 'Alteração fictícia para testar o reinício.';
    state.updateProfile(modified);
    state.setQuestionReviewed('strengths', true);
    state.markResumeGenerated();
    fixture.detectChanges();

    buttonByText(fixture, 'Reiniciar demonstração')?.click();
    fixture.detectChanges();

    const dialog = (fixture.nativeElement as HTMLElement).querySelector('[role="alertdialog"]');
    expect(dialog).toBeTruthy();
    expect(state.profile().professionalGoal).toBe('Alteração fictícia para testar o reinício.');

    const confirmButton = Array.from(
      dialog!.querySelectorAll<HTMLButtonElement>('button'),
    ).find((button) => button.textContent?.includes('Reiniciar demonstração'));
    confirmButton?.click();
    fixture.detectChanges();

    expect(state.profile()).toEqual(DEMO_PROFILE);
    expect(state.reviewedCount()).toBe(0);
    expect(state.resumeGenerated()).toBe(false);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Demonstração reiniciada',
    );
  });
});

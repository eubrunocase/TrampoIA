import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { DemoStateService } from '../../core/services/demo-state.service';
import { GuidedFormPage } from './guided-form';

describe('GuidedFormPage', () => {
  let state: DemoStateService;
  let component: GuidedFormPage;
  let fixture: ComponentFixture<GuidedFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidedFormPage],
      providers: [provideRouter([])],
    }).compileComponents();

    state = TestBed.inject(DemoStateService);
    fixture = TestBed.createComponent(GuidedFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('mostra o aviso de simulação e começa na primeira etapa', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Protótipo demonstrativo');
    expect(text).toContain('não utiliza inteligência artificial generativa');
    expect(state.currentStep()).toBe(0);
    expect(text).toContain('Objetivo profissional');
  });

  it('avança e retorna entre as etapas quando o formulário é válido', () => {
    component.goNext();
    fixture.detectChanges();
    expect(state.currentStep()).toBe(1);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Formação');

    component.goNext();
    fixture.detectChanges();
    expect(state.currentStep()).toBe(2);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Vivências e competências');

    component.goBack();
    fixture.detectChanges();
    expect(state.currentStep()).toBe(1);
  });

  it('bloqueia o avanço quando a etapa está inválida', () => {
    component.form.controls.professionalGoal.setValue('');
    component.goNext();
    fixture.detectChanges();

    expect(state.currentStep()).toBe(0);
    expect(component.showErrors()).toBe(true);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Escreva um objetivo curto',
    );
  });

  it('mantém os dados editados apenas no estado em memória', () => {
    component.form.controls.courseOrSchoolArea.setValue('Área fictícia de teste');

    expect(state.profile().courseOrSchoolArea).toBe('Área fictícia de teste');
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it('gera o currículo e navega para a visualização', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.form.controls.fictionalDataConfirmed.setValue(true);
    component.form.controls.professionalGoal.setValue(
      'Objetivo fictício atualizado apenas para o teste.',
    );
    component.generate();

    expect(state.resumeGenerated()).toBe(true);
    expect(state.resume().professionalGoal).toBe(
      'Objetivo fictício atualizado apenas para o teste.',
    );
    expect(navigateSpy).toHaveBeenCalledWith(['/curriculo/visualizar']);
  });

  it('não gera o currículo sem a confirmação de dados fictícios', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.goToStep(3);
    component.form.controls.fictionalDataConfirmed.setValue(false);
    component.generate();
    fixture.detectChanges();

    expect(component.showErrors()).toBe(true);
    expect(state.resumeGenerated()).toBe(false);
    expect(navigateSpy).not.toHaveBeenCalled();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Marque a confirmação',
    );
  });
});

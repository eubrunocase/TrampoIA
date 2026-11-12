import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AboutPage } from './about';

describe('AboutPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('explica a finalidade acadêmica e a ausência de IA real', () => {
    const fixture = TestBed.createComponent(AboutPage);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Sobre o protótipo TrampoIA');
    expect(text).toContain('Finalidade acadêmica');
    expect(text).toContain('não utiliza inteligência artificial generativa');
    expect(text).toContain('Nenhum dado');
  });

  it('possui a seção obrigatória sobre o que não é feito', () => {
    const fixture = TestBed.createComponent(AboutPage);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const section = element.querySelector('#nao-faz');

    expect(section).toBeTruthy();
    expect(section?.textContent).toContain('O que este protótipo não faz');
    expect(section?.textContent).toContain('Não possui backend');
    expect(section?.textContent).toContain('Não analisa currículos');
    expect(section?.textContent).toContain('Não garante contratação');
  });

  it('inclui o aviso de simulação', () => {
    const fixture = TestBed.createComponent(AboutPage);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Protótipo demonstrativo');
    expect(text).toContain('Não informe dados pessoais reais');
  });
});

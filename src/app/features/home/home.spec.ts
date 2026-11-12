import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomePage } from './home';

describe('HomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function createFixture() {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    return fixture;
  }

  it('apresenta o título principal e o aviso de simulação', () => {
    const fixture = createFixture();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Seu primeiro passo para apresentar sua trajetória profissional');
    expect(text).toContain('Protótipo demonstrativo');
    expect(text).toContain('não utiliza inteligência artificial generativa');
    expect(text).toContain('Não informe dados pessoais reais');
  });

  it('apresenta os dois cartões de funcionalidades', () => {
    const fixture = createFixture();
    const cards = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.feature-card'),
    );

    expect(cards).toHaveLength(2);
    expect(cards[0].textContent).toContain('Organizar currículo');
    expect(cards[1].textContent).toContain('Preparar entrevista');
  });

  it('oferece o botão de início e o link de explicação', () => {
    const fixture = createFixture();
    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a'),
    ).map((link) => link.textContent?.replace(/\s+/g, ' ').trim() ?? '');

    expect(links.some((label) => label === 'Iniciar demonstração')).toBe(true);
    expect(links.some((label) => label.includes('Entenda como este protótipo funciona'))).toBe(
      true,
    );
  });

  it('não usa promessas de contratação ou resultados inventados', () => {
    const fixture = createFixture();
    const text = ((fixture.nativeElement as HTMLElement).textContent ?? '').toLowerCase();

    expect(text).not.toContain('garanta sua vaga');
    expect(text).not.toContain('aumente suas chances');
    expect(text).not.toContain('currículo criado por ia');
  });
});

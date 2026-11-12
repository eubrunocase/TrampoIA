import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the product name and the simulation warning', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('TrampoIA');
    expect(compiled.textContent).toContain('Protótipo demonstrativo');
    expect(compiled.querySelector('main#conteudo')).toBeTruthy();
  });

  it('should expose the main navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>(
        '.site-nav a',
      ),
    ).map((link) => link.textContent?.trim());

    expect(links).toEqual(['Início', 'Currículo', 'Entrevista', 'Sobre']);
  });
});

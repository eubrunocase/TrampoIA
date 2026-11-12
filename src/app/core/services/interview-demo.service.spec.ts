import { DEMO_PROFILE } from '../constants/demo-data';
import { cloneProfile } from './demo-state.service';
import { InterviewDemoService } from './interview-demo.service';

describe('InterviewDemoService', () => {
  const service = new InterviewDemoService();

  it('carrega exatamente as cinco perguntas predefinidas', () => {
    expect(service.questions).toHaveLength(5);
    expect(service.questions.map((question) => question.question)).toEqual([
      'Fale sobre você.',
      'Por que você quer esta oportunidade?',
      'Quais são seus pontos fortes?',
      'Conte uma situação em que trabalhou em equipe.',
      'Como você lida com algo que ainda não sabe fazer?',
    ]);
    expect(new Set(service.questions.map((question) => question.id)).size).toBe(5);
  });

  it('cada pergunta traz orientação, resposta simulada e cuidados', () => {
    for (const question of service.questions) {
      expect(question.intent.length).toBeGreaterThan(0);
      expect(question.answerStructure.length).toBeGreaterThan(0);
      expect(question.simulatedAnswer.length).toBeGreaterThan(0);
      expect(question.cautions.length).toBeGreaterThan(0);
    }
  });

  it('navega para a pergunta anterior e seguinte', () => {
    expect(service.nextId('tell-me-about-yourself')).toBe('why-this-opportunity');
    expect(service.previousId('why-this-opportunity')).toBe('tell-me-about-yourself');
    expect(service.previousId('tell-me-about-yourself')).toBeNull();
    expect(service.nextId('learning')).toBeNull();
    expect(service.nextId('id-inexistente')).toBeNull();
  });

  it('não contém dados de contato ou persistência', () => {
    const serialized = JSON.stringify(service.questions);
    expect(serialized).not.toMatch(/@[a-z0-9.-]+\.[a-z]{2,}/i);
    expect(serialized).not.toMatch(/localStorage|sessionStorage|fetch\(/);
    expect(cloneProfile(DEMO_PROFILE).displayName).toContain('Exemplo');
  });
});

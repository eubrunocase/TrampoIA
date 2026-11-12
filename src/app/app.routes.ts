import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'TrampoIA — Seu primeiro passo profissional',
    loadComponent: () => import('./features/home/home').then((module) => module.HomePage),
  },
  {
    path: 'curriculo',
    title: 'Formulário demonstrativo — TrampoIA',
    loadComponent: () =>
      import('./features/guided-form/guided-form').then((module) => module.GuidedFormPage),
  },
  {
    path: 'curriculo/visualizar',
    title: 'Currículo demonstrativo — TrampoIA',
    loadComponent: () =>
      import('./features/resume-preview/resume-preview').then(
        (module) => module.ResumePreviewPage,
      ),
  },
  {
    path: 'entrevista',
    title: 'Preparação para entrevista — TrampoIA',
    loadComponent: () =>
      import('./features/interview-preparation/interview-preparation').then(
        (module) => module.InterviewPreparationPage,
      ),
  },
  {
    path: 'sobre',
    title: 'Sobre o protótipo — TrampoIA',
    loadComponent: () => import('./features/about/about').then((module) => module.AboutPage),
  },
  { path: '**', redirectTo: '' },
];

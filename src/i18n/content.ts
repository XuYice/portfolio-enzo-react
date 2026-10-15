export type Lang = 'pt' | 'en' | 'zh';

export const LANGS: { id: Lang; label: string }[] = [
  { id: 'zh', label: '中' },
  { id: 'pt', label: 'PT' },
  { id: 'en', label: 'EN' },
];

/** Section ids, in scroll order. `zh` is the calligraphy title (same in every language). */
export const SECTIONS = [
  { id: 'hero', zh: '始' },
  { id: 'about', zh: '关于' },
  { id: 'experience', zh: '经历' },
  { id: 'projects', zh: '作品' },
  { id: 'skills', zh: '技艺' },
  { id: 'contact', zh: '联系' },
] as const;
export type SectionId = (typeof SECTIONS)[number]['id'];

/** Text in the seal stamp. 桥 = "bridge". Swap for your name in Chinese. */
export const SEAL = '桥';

export const CONTACT = {
  email: 'yicexu@gmail.com',
  linkedin: 'https://linkedin.com/in/yice-xu',
  github: 'https://github.com/XuYice',
  cv: 'Yice_Xu_Resume.pdf',
};

// Language-independent data: companies, tags.
const COMPANIES = ['Grupo Wolf360', 'Testing Company'];
const PROJECT_TAGS = [
  ['React Native', 'TypeScript', 'Expo', 'Laravel', 'Sentry'],
  ['Laravel', 'Livewire', 'MySQL'],
  ['Mobile', 'Gamification', 'BAR 2026'],
  ['Laravel', 'Blade', 'MySQL'],
  ['Laravel', 'Tailwind CSS', 'REST'],
  ['Selenium C#', 'Cypress', 'Jenkins', 'BDD'],
];
const SKILL_GROUPS = [
  { zh: '编程', tags: ['TypeScript', 'React', 'React Native', 'Expo', 'JavaScript', 'PHP', 'Laravel', 'Livewire', 'Tailwind CSS', 'MySQL', 'REST APIs', 'GraphQL', 'C#', 'Java'] },
  { zh: '质量', tags: ['Cypress', 'Selenium', 'Jest', 'Jenkins', 'CI/CD', 'BDD', 'Sentry', 'Git / GitHub'] },
  { zh: '智能', tags: ['LLM Integration', 'Prompt Engineering', 'OpenAI API', 'GitHub Copilot', 'Claude Code'] },
  { zh: '证书', tags: ['CCNA Industrial to Networks · Cisco · 2022', 'SAP Business Technology Platform · 2025'] },
];
const NUMERALS = ['一', '二', '三', '四', '五', '六', '七', '八'];

interface Translation {
  ui: {
    kicker: string; role: string; tagline: string; hint: string; openHint: string;
    cv: string; end: string;
    more: string; context: string; did: string; result: string; stack: string; close: string;
  } & Record<SectionId, string>;
  about: { paragraphs: string[]; facts: string[] };
  /** `before` = earlier role(s) at the same company. */
  jobs: { title: string; when: string; before?: string; bullets: string[] }[];
  /** `desc` is the card text; the rest is shown in the project modal. */
  projects: { title: string; desc: string; meta: string; context: string; did: string[]; result?: string }[];
  skills: string[];
  contact: { question: string; text: string };
}

const pt: Translation = {
  ui: {
    kicker: 'Portfólio · 2026',
    role: 'Full Stack + QA Engineer',
    tagline: 'A ponte entre times de tecnologia do Brasil e da China — eu escrevo o código, testo e explico em 中文, português ou English.',
    hint: 'use as setas para desenrolar →',
    openHint: 'clique para abrir o pergaminho',
    cv: 'currículo.pdf ↓',
    more: 'ver detalhes', context: 'O projeto', did: 'O que eu fiz', result: 'Resultado', stack: 'Tecnologias', close: 'Fechar',
    end: 'fim',
    hero: 'Início', about: 'Sobre', experience: 'Experiência', projects: 'Projetos', skills: 'Habilidades', contact: 'Contato',
  },
  about: {
    paragraphs: [
      'Times brasileiros e chineses perdem semanas com lacunas de idioma e de como o software é especificado, construído e testado. **Eu sou o engenheiro no meio**: escrevo o código, testo e explico em mandarim, português ou inglês.',
      'Hoje sou Analista de Desenvolvimento na **Grupo Wolf360**, onde construí do zero o app oficial da empresa (React Native + Laravel), publicado na App Store e no Google Play.',
      'Antes disso, foram 2 anos e meio automatizando testes web, mobile e API para Cinemark, Jitterbit e Grupo Herval. Por isso, antes de entregar qualquer coisa, eu penso em como ela pode quebrar.',
    ],
    facts: ['Nasci na China · 12+ anos no Brasil', 'Novo Hamburgo — RS', 'Ciência da Computação · Feevale · 2026', '中文 · Português · English'],
  },
  jobs: [
    {
      title: 'Analista de Desenvolvimento Júnior',
      when: 'jul 2026 — hoje · São Leopoldo · híbrido',
      before: 'antes: Assistente de Desenvolvimento Sênior · ago 2025 — ago 2026',
      bullets: [
        'Construí do zero o app de parceiros da Fraga & Bitello (React Native, TypeScript, Expo, API Laravel): 200+ downloads no primeiro mês e nota 5.0★ no iOS.',
        'Criei um simulador financeiro de consórcio em que o usuário ajusta os meses de contemplação e vê o resultado na hora.',
        'Desenvolvi o blog corporativo e um sistema de gestão de campanhas de marketing.',
        'Refiz telas legadas do ERP com Blade, Livewire e Tailwind: mais rápidas e com menos bugs em produção.',
      ],
    },
    {
      title: 'QA Engineer · Web Developer',
      when: 'mai 2022 — out 2024 · Novo Hamburgo',
      bullets: [
        'Automação de testes web, mobile (iOS) e API para Cinemark, Jitterbit e Grupo Herval, com Selenium C#, Cypress (BDD) e pipelines no Jenkins.',
        'Peguei regressões antes do staging, reduzindo o risco de rollback em produção.',
        'Como Web Developer, desenvolvi e mantive a plataforma das Franquias Piccadilly em Laravel + Blade + MySQL, com melhorias semanais.',
      ],
    },
  ],
  projects: [
    {
      title: 'App Fraga & Bitello',
      desc: 'App de parceiros para acompanhar cotações e fechar consórcios. Do zero às lojas: 200+ downloads no 1º mês, 5.0★ no iOS, push integrado ao ERP.',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: 'App de parceiros da Fraga & Bitello, do Grupo Wolf360. Os parceiros usam o app para acompanhar cotações e fechar negócios de consórcio.',
      did: [
        'Construí o app do zero até a publicação na App Store e no Google Play, com React Native, TypeScript e Expo.',
        'Desenvolvi a API REST em Laravel que conecta o app ao sistema da empresa.',
        'Integrei as notificações push ao ERP, permitindo campanhas e segmentação com os dados da operação.',
        'Configurei monitoramento de erros com Sentry e atualizações OTA, sem depender de nova versão na loja.',
      ],
      result: '200+ downloads no primeiro mês e nota 5.0★ na App Store.',
    },
    {
      title: 'Simulador de Consórcio',
      desc: 'O usuário ajusta os meses de contemplação e o simulador projeta o resultado na hora. Feito de ponta a ponta.',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: 'Um simulador financeiro interativo para o cliente entender o consórcio antes de fechar negócio.',
      did: [
        'Construí o simulador de ponta a ponta, do cálculo à interface.',
        'O usuário ajusta os meses de contemplação e a previsão do resultado é recalculada na hora.',
      ],
    },
    {
      title: 'Barnout',
      desc: 'App de gamificação do BAR 2026, com rankings, desafios e premiações para os participantes do evento. Feito em equipe.',
      meta: 'BAR 2026 · trabalho em equipe',
      context: 'O BAR é um evento gratuito de tecnologia. O Barnout é o aplicativo de gamificação do evento, que deixa a experiência dos participantes mais interativa e divertida.',
      did: [
        'Voltei a participar do BAR em 2026, desta vez no time que desenvolveu o Barnout.',
        'O app traz rankings, desafios e premiações para engajar os participantes durante o evento.',
      ],
      result: 'O app foi usado de verdade pelos participantes durante o evento.',
    },
    {
      title: 'Franquias Piccadilly',
      desc: 'Plataforma web pública da rede de franquias: novas funcionalidades, correções e melhorias semanais.',
      meta: 'Testing Company · mar — out 2024',
      context: 'A plataforma web pública das Franquias Piccadilly, uma rede de franquias brasileira.',
      did: [
        'Implementei novas funcionalidades em Laravel + Blade, com MySQL.',
        'Corrigi bugs de produção e entreguei melhorias semanais junto com o ciclo de QA.',
        'Trabalhei com o time da franquia para transformar requisitos de negócio em fluxos web.',
      ],
    },
    {
      title: 'Blog & Campanhas',
      desc: 'Blog corporativo e sistema de gestão de campanhas que apoiam as conversões do marketing.',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: 'Plataformas web que apoiam o marketing do grupo.',
      did: [
        'Desenvolvi e mantive o blog corporativo.',
        'Criei um sistema de gestão de campanhas que apoia as conversões do marketing.',
        'Estruturei integrações seguras com MySQL e endpoints REST reutilizáveis, separando frontend e backend.',
      ],
    },
    {
      title: 'Automação de Testes',
      desc: 'Suítes web, mobile e API para Cinemark, Jitterbit e Grupo Herval, integradas ao CI/CD.',
      meta: 'Testing Company · 2022 — 2024',
      context: 'Como QA Engineer, fui alocado em projetos de clientes para criar e manter suítes de testes automatizados.',
      did: [
        'Cinemark: automação de testes do app iOS com C#.',
        'Jitterbit: automação web do Wevo com C# + Selenium, integrada ao pipeline de release.',
        'Grupo Herval: testes web e API com Selenium C# e Cypress no Jenkins, com scripts Batch para orquestrar as execuções.',
        'Specs no estilo BDD, em Selenium (C#) e Cypress.',
      ],
      result: 'Regressões encontradas antes do staging, reduzindo o risco de rollback em produção.',
    },
  ],
  skills: ['Código', 'Qualidade', 'Inteligência Artificial', 'Certificações'],
  contact: {
    question: 'Construindo algo entre o Brasil e a China?',
    text: 'Ou precisa de alguém que entrega e também testa? Fale comigo — em português, English ou 中文.',
  },
};

const en: Translation = {
  ui: {
    kicker: 'Portfolio · 2026',
    role: 'Full Stack + QA Engineer',
    tagline: 'The bridge between Brazilian and Chinese tech teams — I write the code, test it, and explain it in 中文, português or English.',
    hint: 'use the arrows to unroll →',
    openHint: 'click to open the scroll',
    cv: 'resume.pdf ↓',
    more: 'see details', context: 'The project', did: 'What I did', result: 'Result', stack: 'Stack', close: 'Close',
    end: 'the end',
    hero: 'Start', about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills', contact: 'Contact',
  },
  about: {
    paragraphs: [
      'Brazilian and Chinese teams lose weeks to gaps in language and in how software gets specified, built and tested. **I\'m the engineer in the middle**: I write the code, I test it, and I can explain it in Mandarin, Portuguese or English.',
      'Today I\'m a Development Analyst at **Grupo Wolf360**, where I built the company\'s official app from scratch (React Native + Laravel), live on the App Store and Google Play.',
      'Before that, I spent 2.5 years automating web, mobile and API tests for Cinemark, Jitterbit and Grupo Herval. So before I ship anything, I think about how it could break.',
    ],
    facts: ['Born in China · 12+ years in Brazil', 'Novo Hamburgo — Brazil', 'Computer Science · Feevale · 2026', '中文 · Português · English'],
  },
  jobs: [
    {
      title: 'Junior Development Analyst',
      when: 'Jul 2026 — now · São Leopoldo · hybrid',
      before: 'previously: Senior Development Assistant · Aug 2025 — Aug 2026',
      bullets: [
        'Built the Fraga & Bitello partner app from zero (React Native, TypeScript, Expo, Laravel API): 200+ downloads in the first month and 5.0★ on iOS.',
        'Engineered a consortium financial simulator where users adjust contemplation months and see results instantly.',
        'Developed the corporate blog and a marketing campaign-management system.',
        'Rebuilt legacy ERP screens with Blade, Livewire and Tailwind: faster, with fewer production bugs.',
      ],
    },
    {
      title: 'QA Engineer · Web Developer',
      when: 'May 2022 — Oct 2024 · Novo Hamburgo',
      bullets: [
        'Automated web, mobile (iOS) and API tests for Cinemark, Jitterbit and Grupo Herval with Selenium C#, Cypress (BDD) and Jenkins pipelines.',
        'Caught regressions before staging, reducing production rollback risk.',
        'As a Web Developer, built and maintained the Franquias Piccadilly platform in Laravel + Blade + MySQL, shipping weekly improvements.',
      ],
    },
  ],
  projects: [
    {
      title: 'Fraga & Bitello App',
      desc: 'Partner app to track quotes and close consortium deals. Zero to stores: 200+ downloads in month one, 5.0★ on iOS, ERP-driven push.',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: "Fraga & Bitello's partner app, part of Grupo Wolf360. Partners use it to track quotes and close consortium deals.",
      did: [
        'Built the app from zero to release on the App Store and Google Play, with React Native, TypeScript and Expo.',
        "Developed the Laravel REST API that connects the app to the company's systems.",
        'Wired push notifications into the ERP, enabling campaigns and segmentation from operational data.',
        'Set up error monitoring with Sentry and OTA updates, without waiting for a new store release.',
      ],
      result: '200+ downloads in the first month and a 5.0★ rating on the App Store.',
    },
    {
      title: 'Consortium Simulator',
      desc: 'Users adjust contemplation months and the simulator forecasts the outcome instantly. Built end-to-end.',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: 'An interactive financial simulator that helps clients understand a consortium before they commit.',
      did: [
        'Built the simulator end-to-end, from the calculation to the interface.',
        'Users adjust the contemplation months and the forecast is recalculated instantly.',
      ],
    },
    {
      title: 'Barnout',
      desc: 'Gamification app for BAR 2026, with rankings, challenges and rewards for event participants. Built as a team.',
      meta: 'BAR 2026 · team project',
      context: "BAR is a free tech event. Barnout is the event's gamification app, making the experience more interactive and fun for participants.",
      did: [
        'Took part in BAR again in 2026, this time on the team that built Barnout.',
        'The app brings rankings, challenges and rewards to keep participants engaged during the event.',
      ],
      result: 'The app was used by real participants throughout the event.',
    },
    {
      title: 'Franquias Piccadilly',
      desc: 'Public web platform for the franchise network: new features, bug fixes and weekly improvements.',
      meta: 'Testing Company · Mar — Oct 2024',
      context: 'The public-facing web platform for Franquias Piccadilly, a Brazilian franchise network.',
      did: [
        'Implemented new features in Laravel + Blade with a MySQL backend.',
        'Fixed production bugs and shipped weekly improvements alongside the QA cycle.',
        'Worked with the franchise team to translate business requirements into web flows.',
      ],
    },
    {
      title: 'Blog & Campaigns',
      desc: 'Corporate blog and campaign-management system supporting marketing conversions.',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: "Web platforms supporting the group's marketing.",
      did: [
        'Developed and maintained the corporate blog.',
        'Built a campaign-management system supporting marketing-driven conversions.',
        'Structured secure MySQL integrations and reusable REST endpoints for frontend-backend separation.',
      ],
    },
    {
      title: 'Test Automation',
      desc: 'Web, mobile and API suites for Cinemark, Jitterbit and Grupo Herval, wired into CI/CD.',
      meta: 'Testing Company · 2022 — 2024',
      context: 'As a QA Engineer, I was allocated to client projects to build and maintain automated test suites.',
      did: [
        'Cinemark: iOS app test automation in C#.',
        'Jitterbit: web automation for Wevo with C# + Selenium, integrated into the release pipeline.',
        'Grupo Herval: web and API tests with Selenium C# and Cypress on Jenkins, with Batch scripts orchestrating the runs.',
        'BDD-style specs in Selenium (C#) and Cypress.',
      ],
      result: 'Regressions caught before staging, reducing production rollback risk.',
    },
  ],
  skills: ['Code', 'Quality', 'Artificial Intelligence', 'Certifications'],
  contact: {
    question: 'Building something between Brazil and China?',
    text: 'Or need someone who both ships and tests? Get in touch — in English, português or 中文.',
  },
};

const zh: Translation = {
  ui: {
    kicker: '作品集 · 2026',
    role: '全栈 + QA 工程师',
    tagline: '连接巴西与中国技术团队的桥梁——我写代码、做测试，并能用中文、葡萄牙语或英语讲清楚。',
    hint: '点击箭头展开 →',
    openHint: 'Clique para abrir · Click to open',
    cv: '简历.pdf ↓',
    more: '查看详情', context: '项目背景', did: '我做了什么', result: '成果', stack: '技术栈', close: '关闭',
    end: '完',
    hero: '开始', about: '关于我', experience: '经历', projects: '作品', skills: '技能', contact: '联系',
  },
  about: {
    paragraphs: [
      '巴西和中国的团队常常因为语言差异，以及软件需求、开发和测试方式的不同而浪费好几周时间。**我就是站在中间的那个工程师**：我写代码、做测试，还能用中文、葡萄牙语或英语把它讲清楚。',
      '目前我在 **Grupo Wolf360** 担任开发分析师，从零开发了公司的官方 App（React Native + Laravel），已在 App Store 和 Google Play 上线。',
      '在此之前，我有两年半的时间为 Cinemark、Jitterbit 和 Grupo Herval 做 Web、移动端和 API 自动化测试。所以每次交付之前，我都会先想一想它可能会在哪里出问题。',
    ],
    facts: ['生于中国 · 在巴西生活 12 年以上', '巴西 · 新汉堡', '计算机科学 · Feevale 大学 · 2026', '中文 · Português · English'],
  },
  jobs: [
    {
      title: '初级开发分析师',
      when: '2026年7月 — 至今 · 圣莱奥波尔多 · 混合办公',
      before: '此前：高级开发助理 · 2025年8月 — 2026年8月',
      bullets: [
        '从零开发 Fraga & Bitello 合作伙伴 App（React Native、TypeScript、Expo、Laravel API）：首月下载量 200+，iOS 评分 5.0★。',
        '开发联合购买（consórcio）金融模拟器，用户调整中签月份即可实时看到预测结果。',
        '开发企业博客和营销活动管理系统。',
        '用 Blade、Livewire 和 Tailwind 重构 ERP 旧页面：加载更快，线上 bug 更少。',
      ],
    },
    {
      title: 'QA 工程师 · Web 开发',
      when: '2022年5月 — 2024年10月 · 新汉堡',
      bullets: [
        '为 Cinemark、Jitterbit 和 Grupo Herval 做 Web、移动端（iOS）和 API 自动化测试，使用 Selenium C#、Cypress（BDD）和 Jenkins 流水线。',
        '在预发布阶段之前发现回归问题，降低线上回滚风险。',
        '作为 Web 开发，用 Laravel + Blade + MySQL 开发并维护 Piccadilly 加盟网络平台，每周持续改进。',
      ],
    },
  ],
  projects: [
    {
      title: 'Fraga & Bitello App',
      desc: '合作伙伴用来跟进报价、完成联合购买交易的 App。从零到上架：首月 200+ 下载，iOS 5.0★，推送与 ERP 打通。',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: 'Grupo Wolf360 旗下 Fraga & Bitello 的合作伙伴 App。合作伙伴用它跟进报价、完成联合购买（consórcio）交易。',
      did: [
        '用 React Native、TypeScript 和 Expo 从零开发，并发布到 App Store 和 Google Play。',
        '用 Laravel 开发 REST API，把 App 与公司系统连接起来。',
        '把推送通知与 ERP 打通，可以基于业务数据做营销活动和用户分群。',
        '接入 Sentry 错误监控和 OTA 热更新，不必每次都重新发版。',
      ],
      result: '首月下载量 200+，App Store 评分 5.0★。',
    },
    {
      title: '联合购买模拟器',
      desc: '用户调整中签月份，模拟器即时预测结果。端到端独立完成。',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: '一个互动式金融模拟器，帮助客户在签约前理解联合购买（consórcio）。',
      did: [
        '端到端完成模拟器，从计算逻辑到界面。',
        '用户调整中签月份，预测结果即时重新计算。',
      ],
    },
    {
      title: 'Barnout',
      desc: 'BAR 2026 活动的游戏化 App，为参与者提供排行榜、挑战和奖励。团队合作完成。',
      meta: 'BAR 2026 · 团队项目',
      context: 'BAR 是一个免费的科技活动。Barnout 是活动的游戏化 App，让参与者的体验更有互动性、更有趣。',
      did: [
        '2026 年再次参加 BAR，这次加入了开发 Barnout 的团队。',
        'App 提供排行榜、挑战和奖励，在活动期间持续吸引参与者。',
      ],
      result: '活动期间，参与者真实使用了这个 App。',
    },
    {
      title: 'Piccadilly 加盟平台',
      desc: '加盟网络的公开网站：新功能、bug 修复和每周持续改进。',
      meta: 'Testing Company · 2024年3月 — 10月',
      context: '巴西加盟连锁品牌 Franquias Piccadilly 的公开网站平台。',
      did: [
        '用 Laravel + Blade 和 MySQL 开发新功能。',
        '修复线上 bug，配合 QA 周期每周交付改进。',
        '与加盟团队紧密合作，把业务需求转化为网页流程。',
      ],
    },
    {
      title: '博客与营销活动',
      desc: '企业博客和营销活动管理系统，助力营销转化。',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: '支持集团营销工作的网站平台。',
      did: [
        '开发并维护企业博客。',
        '开发营销活动管理系统，助力营销转化。',
        '设计安全的 MySQL 集成和可复用的 REST 接口，实现前后端分离。',
      ],
    },
    {
      title: '自动化测试',
      desc: '为 Cinemark、Jitterbit 和 Grupo Herval 编写的 Web、移动端和 API 测试套件，接入 CI/CD。',
      meta: 'Testing Company · 2022 — 2024',
      context: '作为 QA 工程师，我被派驻到多个客户项目，负责编写和维护自动化测试套件。',
      did: [
        'Cinemark：用 C# 做 iOS App 自动化测试。',
        'Jitterbit：用 C# + Selenium 为 Wevo 做 Web 自动化，并接入发布流水线。',
        'Grupo Herval：用 Selenium C# 和 Cypress 在 Jenkins 上跑 Web 和 API 测试，用 Batch 脚本编排执行。',
        '用 Selenium（C#）和 Cypress 编写 BDD 风格的测试用例。',
      ],
      result: '在预发布之前发现回归问题，降低线上回滚风险。',
    },
  ],
  skills: ['编程', '质量', '人工智能', '证书'],
  contact: {
    question: '在巴西和中国之间做产品？',
    text: '或者需要一个既能开发又能测试的人？欢迎联系我——中文、Português 或 English 都可以。',
  },
};

const TRANSLATIONS: Record<Lang, Translation> = { pt, en, zh };

/** Merges a translation with the language-independent data. */
export function getContent(lang: Lang) {
  const t = TRANSLATIONS[lang];
  return {
    ...t,
    jobs: t.jobs.map((j, i) => ({ ...j, company: COMPANIES[i] })),
    projects: t.projects.map((p, i) => ({ ...p, num: NUMERALS[i], tags: PROJECT_TAGS[i] })),
    skills: SKILL_GROUPS.map((g, i) => ({ ...g, label: t.skills[i] })),
  };
}
export type Content = ReturnType<typeof getContent>;

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
  cv: 'Yice_Xu_CV.pdf',
};

// Language-independent data: companies, tags.
const COMPANIES = ['Grupo Wolf360', 'Testing Company'];
/**
 * Images and links per project (same order as the cards). Put image files in
 * public/projects/<name>/ and reference them as 'projects/<name>/file.png'.
 */
const PROJECT_MEDIA: { images?: string[]; links?: { label: string; url: string }[] }[] = [
  {}, // App Fraga & Bitello — e.g. links: [{ label: 'App Store', url: '…' }, { label: 'Google Play', url: '…' }]
  {}, // Integração Santander (Pix & boleto)
  {}, // Simulador de Consórcio
  {}, // Barnout
  {}, // Franquias Piccadilly
  {}, // Blog & Campanhas
  {}, // Automação de Testes
];
const PROJECT_TAGS = [
  ['React Native', 'TypeScript', 'Expo', 'Laravel', 'REST APIs'],
  ['Santander API', 'Pix', 'Boleto', 'PHP', 'Laravel', 'MySQL'],
  ['Laravel', 'Livewire', 'MySQL'],
  ['Mobile', 'Gamification', 'BAR 2026'],
  ['Laravel', 'Blade', 'MySQL'],
  ['Laravel', 'Tailwind CSS', 'REST'],
  ['Cypress', 'Selenium', 'Jenkins', 'CI/CD'],
];
const SKILL_GROUPS = [
  { zh: '编程', tags: ['React Native', 'React', 'TypeScript', 'PHP', 'Laravel', 'REST APIs', 'Python', 'MySQL'] },
  { zh: '界面', tags: ['Blade', 'Livewire', 'Tailwind CSS'] },
  { zh: '测试', tags: ['Cypress', 'Selenium', 'Git', 'CI/CD', 'Jenkins'] },
  { zh: '智能', tags: ['LLM Integration', 'OpenAI API', 'Prompt Engineering', 'GitHub Copilot', 'Claude Code'] },
  { zh: '课程', tags: ['SAP Business Technology Platform Bootcamp · SAP · 2025'] },
];
const NUMERALS = ['一', '二', '三', '四', '五', '六', '七', '八'];

interface Translation {
  ui: {
    kicker: string; role: string; tagline: string; hint: string; openHint: string;
    cv: string; end: string;
    more: string; context: string; did: string; result: string; stack: string; close: string;
    myRole: string; challenges: string; gallery: string; links: string;
  } & Record<SectionId, string>;
  about: { paragraphs: string[]; facts: string[] };
  /** `before` = earlier role(s) at the same company. */
  jobs: { title: string; when: string; before?: string; bullets: string[] }[];
  /** `desc` is the card text; the rest is shown in the project modal. */
  projects: {
    title: string; desc: string; meta: string; context: string; did: string[]; result?: string;
    /** Your role in one line, e.g. "Dev mobile principal · time de 3". */
    role?: string;
    /** Hard problems you hit and how you decided to solve them. */
    challenges?: string[];
    /** Captions for PROJECT_MEDIA images, same order. */
    captions?: string[];
  }[];
  skills: string[];
  contact: { question: string; text: string };
}

const pt: Translation = {
  ui: {
    kicker: 'Portfólio · 2026',
    role: 'Desenvolvedor Full Stack',
    tagline: 'A ponte entre times de tecnologia do Brasil e da China — eu escrevo o código, testo e explico em 中文, português ou English.',
    hint: 'use as setas para desenrolar →',
    openHint: 'clique para abrir o pergaminho',
    cv: 'currículo.pdf ↓',
    more: 'ver detalhes', context: 'O projeto', did: 'O que eu fiz', result: 'Resultado', stack: 'Tecnologias', close: 'Fechar',
    myRole: 'Meu papel', challenges: 'Desafios e decisões', gallery: 'Imagens', links: 'Links',
    end: 'fim',
    hero: 'Início', about: 'Sobre', experience: 'Experiência', projects: 'Projetos', skills: 'Habilidades', contact: 'Contato',
  },
  about: {
    paragraphs: [
      'Times brasileiros e chineses perdem semanas com lacunas de idioma e de como o software é especificado, construído e testado. **Eu sou o engenheiro no meio**: escrevo o código, testo e explico em mandarim, português ou inglês.',
      'Hoje sou Desenvolvedor Full Stack na **Grupo Wolf360**: construí do zero o app da empresa (React Native + Laravel) e integrei a API do Santander ao ERP — 984 pagamentos automatizados, somando R$ 10,8 milhões.',
      'Antes, na Testing Company, automatizei testes end-to-end em Cypress para clientes enterprise. Por isso, antes de entregar qualquer coisa, eu penso em como ela pode quebrar.',
    ],
    facts: ['Nasci na China · 12+ anos no Brasil', 'Novo Hamburgo — RS', 'Ciência da Computação · Feevale · 2026', '中文 · Português · English'],
  },
  jobs: [
    {
      title: 'Desenvolvedor Full Stack',
      when: 'ago 2025 — hoje · São Leopoldo',
      bullets: [
        'Construí do zero o app da empresa em React Native, com APIs REST em PHP/Laravel: 120 downloads.',
        'Integrei a API do Santander (Pix QR Code e boleto) ao ERP, automatizando 984 pagamentos que somam R$ 10,8 milhões.',
        'Reduzi em 88% o tempo de conciliação manual de pagamentos, automatizando a criação das cobranças, o matching e a conciliação.',
        'Também: simulador financeiro de consórcio, blog e sistema de campanhas, e refatoração de telas legadas do ERP (Blade, Livewire, Tailwind).',
      ],
    },
    {
      title: 'Desenvolvedor Full Stack',
      when: 'mar 2023 — out 2024 · Novo Hamburgo',
      bullets: [
        'Construí a página da franquia Piccadilly em 7 dias, com PHP/Laravel, e recebi retorno positivo do cliente.',
        'Automatizei testes end-to-end diários em Cypress para clientes enterprise, mantendo os apps estáveis e pegando regressões de interface cedo.',
      ],
    },
  ],
  projects: [
    {
      title: 'App Fraga & Bitello',
      desc: 'App de parceiros para acompanhar cotações e fechar consórcios. Feito do zero e publicado nas lojas: 120 downloads, push integrado ao ERP.',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: 'App de parceiros da Fraga & Bitello, do Grupo Wolf360. Os parceiros usam o app para acompanhar cotações e fechar negócios de consórcio.',
      did: [
        'Construí o app do zero até a publicação na App Store e no Google Play, com React Native, TypeScript e Expo.',
        'Desenvolvi a API REST em Laravel que conecta o app ao sistema da empresa.',
        'Integrei as notificações push ao ERP, permitindo campanhas e segmentação com os dados da operação.',
        'Configurei monitoramento de erros com Sentry e atualizações OTA, sem depender de nova versão na loja.',
      ],
      result: '120 downloads na App Store e no Google Play.',
    },
    {
      title: 'Pagamentos Santander',
      desc: 'API do Santander (Pix QR Code e boleto) integrada ao ERP: 984 pagamentos automatizados, R$ 10,8 milhões, 88% menos conciliação manual.',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: 'Integração da API do Santander ao ERP da empresa, para cobranças por Pix (QR Code) e boleto.',
      did: [
        'Integrei a API do Santander (Pix QR Code e boleto) ao ERP.',
        'Automatizei o fluxo da cobrança: criação, matching do pagamento e conciliação.',
      ],
      result: '984 pagamentos automatizados, somando R$ 10,8 milhões, e 88% menos tempo de conciliação manual.',
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
      desc: 'Página da rede de franquias feita em 7 dias com PHP/Laravel, com retorno positivo do cliente.',
      meta: 'Testing Company · 2023 — 2024',
      context: 'A plataforma web pública das Franquias Piccadilly, uma rede de franquias brasileira.',
      did: [
        'Implementei novas funcionalidades em Laravel + Blade, com MySQL.',
        'Corrigi bugs de produção e entreguei melhorias semanais junto com o ciclo de QA.',
        'Trabalhei com o time da franquia para transformar requisitos de negócio em fluxos web.',
      ],
      result: 'Página entregue em 7 dias, com retorno positivo do cliente.',
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
      desc: 'Testes end-to-end diários em Cypress para clientes enterprise, mantendo os apps estáveis e pegando regressões cedo.',
      meta: 'Testing Company · 2023 — 2024',
      context: 'Na Testing Company, fui alocado em projetos de clientes enterprise para criar e manter testes automatizados.',
      did: [
        'Testes end-to-end em Cypress rodando todos os dias, validando as jornadas críticas dos usuários.',
        'Cinemark: automação de testes do app iOS com C#.',
        'Jitterbit: automação web do Wevo com C# + Selenium, integrada ao pipeline de release.',
        'Grupo Herval: testes web e API com Selenium C# e Cypress no Jenkins, com scripts Batch para orquestrar as execuções.',
        'Specs no estilo BDD, em Selenium (C#) e Cypress.',
      ],
      result: 'Apps estáveis e regressões de interface encontradas cedo, com menos teste manual.',
    },
  ],
  skills: ['Desenvolvimento', 'Interfaces Web', 'Testes e Entrega', 'IA', 'Cursos'],
  contact: {
    question: 'Construindo algo entre o Brasil e a China?',
    text: 'Ou precisa de alguém que entrega e também testa? Fale comigo — em português, English ou 中文.',
  },
};

const en: Translation = {
  ui: {
    kicker: 'Portfolio · 2026',
    role: 'Full Stack Developer',
    tagline: 'The bridge between Brazilian and Chinese tech teams — I write the code, test it, and explain it in 中文, português or English.',
    hint: 'use the arrows to unroll →',
    openHint: 'click to open the scroll',
    cv: 'resume.pdf ↓',
    more: 'see details', context: 'The project', did: 'What I did', result: 'Result', stack: 'Stack', close: 'Close',
    myRole: 'My role', challenges: 'Challenges & decisions', gallery: 'Images', links: 'Links',
    end: 'the end',
    hero: 'Start', about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills', contact: 'Contact',
  },
  about: {
    paragraphs: [
      'Brazilian and Chinese teams lose weeks to gaps in language and in how software gets specified, built and tested. **I\'m the engineer in the middle**: I write the code, I test it, and I can explain it in Mandarin, Portuguese or English.',
      'Today I\'m a Full Stack Developer at **Grupo Wolf360**: I built the company\'s mobile app from scratch (React Native + Laravel) and integrated Santander\'s API into the ERP — 984 payments automated, worth R$10.8M.',
      'Before that, at Testing Company, I automated Cypress end-to-end tests for enterprise clients. So before I ship anything, I think about how it could break.',
    ],
    facts: ['Born in China · 12+ years in Brazil', 'Novo Hamburgo — Brazil', 'Computer Science · Feevale · 2026', '中文 · Português · English'],
  },
  jobs: [
    {
      title: 'Full Stack Developer',
      when: 'Aug 2025 — now · São Leopoldo',
      bullets: [
        "Built the company's mobile app from scratch with React Native and PHP/Laravel REST APIs, reaching 120 downloads.",
        "Integrated Santander's API (Pix QR Code & boleto) into the ERP, automating 984 payments worth R$10.8M.",
        'Cut manual payment reconciliation time by 88% through automated charge creation, matching and reconciliation.',
        'Also: a consortium financial simulator, the corporate blog and campaign system, and refactored legacy ERP screens (Blade, Livewire, Tailwind).',
      ],
    },
    {
      title: 'Full Stack Developer',
      when: 'Mar 2023 — Oct 2024 · Novo Hamburgo',
      bullets: [
        'Built a Piccadilly franchise web page in 7 days with PHP/Laravel, earning positive client feedback.',
        'Automated daily Cypress end-to-end tests for enterprise clients, keeping apps stable and catching UI regressions early.',
      ],
    },
  ],
  projects: [
    {
      title: 'Fraga & Bitello App',
      desc: 'Partner app to track quotes and close consortium deals. Built from scratch and shipped to the stores: 120 downloads, ERP-driven push.',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: "Fraga & Bitello's partner app, part of Grupo Wolf360. Partners use it to track quotes and close consortium deals.",
      did: [
        'Built the app from zero to release on the App Store and Google Play, with React Native, TypeScript and Expo.',
        "Developed the Laravel REST API that connects the app to the company's systems.",
        'Wired push notifications into the ERP, enabling campaigns and segmentation from operational data.',
        'Set up error monitoring with Sentry and OTA updates, without waiting for a new store release.',
      ],
      result: '120 downloads on the App Store and Google Play.',
    },
    {
      title: 'Santander Payments',
      desc: "Santander's API (Pix QR Code & boleto) integrated into the ERP: 984 payments automated, R$10.8M, 88% less manual reconciliation.",
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: "Integration of Santander's API into the company's ERP, for charges via Pix (QR Code) and boleto.",
      did: [
        "Integrated Santander's API (Pix QR Code & boleto) into the ERP.",
        'Automated the charge flow: creation, payment matching and reconciliation.',
      ],
      result: '984 payments automated, worth R$10.8M, and 88% less manual reconciliation time.',
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
      desc: 'Franchise web page built in 7 days with PHP/Laravel, earning positive client feedback.',
      meta: 'Testing Company · 2023 — 2024',
      context: 'The public-facing web platform for Franquias Piccadilly, a Brazilian franchise network.',
      did: [
        'Implemented new features in Laravel + Blade with a MySQL backend.',
        'Fixed production bugs and shipped weekly improvements alongside the QA cycle.',
        'Worked with the franchise team to translate business requirements into web flows.',
      ],
      result: 'Delivered in 7 days, with positive client feedback.',
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
      desc: 'Daily Cypress end-to-end tests for enterprise clients, keeping apps stable and catching regressions early.',
      meta: 'Testing Company · 2023 — 2024',
      context: 'At Testing Company, I was allocated to enterprise client projects to build and maintain automated tests.',
      did: [
        'Cypress end-to-end tests running every day, validating critical user journeys.',
        'Cinemark: iOS app test automation in C#.',
        'Jitterbit: web automation for Wevo with C# + Selenium, integrated into the release pipeline.',
        'Grupo Herval: web and API tests with Selenium C# and Cypress on Jenkins, with Batch scripts orchestrating the runs.',
        'BDD-style specs in Selenium (C#) and Cypress.',
      ],
      result: 'Stable apps and UI regressions caught early, with less manual testing.',
    },
  ],
  skills: ['Development', 'Web Interfaces', 'Testing & Delivery', 'AI', 'Courses'],
  contact: {
    question: 'Building something between Brazil and China?',
    text: 'Or need someone who both ships and tests? Get in touch — in English, português or 中文.',
  },
};

const zh: Translation = {
  ui: {
    kicker: '作品集 · 2026',
    role: '全栈开发工程师',
    tagline: '连接巴西与中国技术团队的桥梁——我写代码、做测试，并能用中文、葡萄牙语或英语讲清楚。',
    hint: '点击箭头展开 →',
    openHint: 'Clique para abrir · Click to open',
    cv: '简历.pdf ↓',
    more: '查看详情', context: '项目背景', did: '我做了什么', result: '成果', stack: '技术栈', close: '关闭',
    myRole: '我的角色', challenges: '难点与决策', gallery: '图片', links: '链接',
    end: '完',
    hero: '开始', about: '关于我', experience: '经历', projects: '作品', skills: '技能', contact: '联系',
  },
  about: {
    paragraphs: [
      '巴西和中国的团队常常因为语言差异，以及软件需求、开发和测试方式的不同而浪费好几周时间。**我就是站在中间的那个工程师**：我写代码、做测试，还能用中文、葡萄牙语或英语把它讲清楚。',
      '目前我在 **Grupo Wolf360** 担任全栈开发工程师：从零开发了公司的移动 App（React Native + Laravel），并把 Santander 的 API 接入 ERP——自动处理了 984 笔付款，总额 1080 万雷亚尔。',
      '在此之前，我在 Testing Company 为企业客户编写 Cypress 端到端自动化测试。所以每次交付之前，我都会先想一想它可能会在哪里出问题。',
    ],
    facts: ['生于中国 · 在巴西生活 12 年以上', '巴西 · 新汉堡', '计算机科学 · Feevale 大学 · 2026', '中文 · Português · English'],
  },
  jobs: [
    {
      title: '全栈开发工程师',
      when: '2025年8月 — 至今 · 圣莱奥波尔多',
      bullets: [
        '用 React Native 从零开发公司的移动 App，并用 PHP/Laravel 编写 REST API：下载量 120。',
        '把 Santander 的 API（Pix 二维码和 boleto）接入 ERP，自动处理了 984 笔付款，总额 1080 万雷亚尔。',
        '通过自动创建收款、匹配和对账，把人工对账时间减少了 88%。',
        '另外：联合购买（consórcio）金融模拟器、企业博客和营销活动系统，以及用 Blade、Livewire、Tailwind 重构 ERP 旧页面。',
      ],
    },
    {
      title: '全栈开发工程师',
      when: '2023年3月 — 2024年10月 · 新汉堡',
      bullets: [
        '用 PHP/Laravel 在 7 天内完成 Piccadilly 加盟网页，获得客户好评。',
        '为企业客户编写每天运行的 Cypress 端到端自动化测试，保持应用稳定，尽早发现界面回归问题。',
      ],
    },
  ],
  projects: [
    {
      title: 'Fraga & Bitello App',
      desc: '合作伙伴用来跟进报价、完成联合购买交易的 App。从零开发并上架：下载量 120，推送与 ERP 打通。',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: 'Grupo Wolf360 旗下 Fraga & Bitello 的合作伙伴 App。合作伙伴用它跟进报价、完成联合购买（consórcio）交易。',
      did: [
        '用 React Native、TypeScript 和 Expo 从零开发，并发布到 App Store 和 Google Play。',
        '用 Laravel 开发 REST API，把 App 与公司系统连接起来。',
        '把推送通知与 ERP 打通，可以基于业务数据做营销活动和用户分群。',
        '接入 Sentry 错误监控和 OTA 热更新，不必每次都重新发版。',
      ],
      result: 'App Store 和 Google Play 共 120 次下载。',
    },
    {
      title: 'Santander 支付集成',
      desc: '把 Santander 的 API（Pix 二维码和 boleto）接入 ERP：自动处理 984 笔付款，共 1080 万雷亚尔，人工对账减少 88%。',
      meta: 'Grupo Wolf360 · 2025 — 2026',
      context: '把 Santander 银行的 API 接入公司的 ERP，用于 Pix（二维码）和 boleto 收款。',
      did: [
        '把 Santander 的 API（Pix 二维码和 boleto）接入 ERP。',
        '把收款流程自动化：创建收款、匹配付款、完成对账。',
      ],
      result: '自动处理 984 笔付款，总额 1080 万雷亚尔，人工对账时间减少 88%。',
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
      desc: '用 PHP/Laravel 在 7 天内完成的加盟网页，获得客户好评。',
      meta: 'Testing Company · 2023 — 2024',
      context: '巴西加盟连锁品牌 Franquias Piccadilly 的公开网站平台。',
      did: [
        '用 Laravel + Blade 和 MySQL 开发新功能。',
        '修复线上 bug，配合 QA 周期每周交付改进。',
        '与加盟团队紧密合作，把业务需求转化为网页流程。',
      ],
      result: '7 天交付，获得客户好评。',
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
      desc: '为企业客户编写每天运行的 Cypress 端到端测试，保持应用稳定，尽早发现回归问题。',
      meta: 'Testing Company · 2023 — 2024',
      context: '在 Testing Company，我被派驻到多个企业客户项目，负责编写和维护自动化测试。',
      did: [
        '每天运行的 Cypress 端到端测试，验证用户的关键流程。',
        'Cinemark：用 C# 做 iOS App 自动化测试。',
        'Jitterbit：用 C# + Selenium 为 Wevo 做 Web 自动化，并接入发布流水线。',
        'Grupo Herval：用 Selenium C# 和 Cypress 在 Jenkins 上跑 Web 和 API 测试，用 Batch 脚本编排执行。',
        '用 Selenium（C#）和 Cypress 编写 BDD 风格的测试用例。',
      ],
      result: '应用保持稳定，尽早发现界面回归问题，减少人工测试。',
    },
  ],
  skills: ['开发', '界面', '测试与交付', '人工智能', '课程'],
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
    projects: t.projects.map((p, i) => ({ ...p, num: NUMERALS[i], tags: PROJECT_TAGS[i], ...PROJECT_MEDIA[i] })),
    skills: SKILL_GROUPS.map((g, i) => ({ ...g, label: t.skills[i] })),
  };
}
export type Content = ReturnType<typeof getContent>;

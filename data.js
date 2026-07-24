/**
 * EGT IP Project 1.2 Initial Seed Data
 */

const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    name: "GLADIATOR",
    code: "PRJ-GLAD-001",
    description: "Самостоятелен проект с данни за търговска марка GLADIATOR.",
    createdDate: "2003-04-09",
    items: [
      {
        id: "item-glad-1",
        name: "GLADIATOR",
        type: "trademark",
        status: "registered",
        intStatus: "none",
        image: null,
        gallery: [],
        
        // Национална регистрация (BG)
        appDate: "09.04.2003 г.",
        regDate: "25.03.2005 г.",
        territory: "BG",
        nationalLink: "",
        
        // Международна регистрация (WO)
        intAppDate: "N / A",
        intRegDate: "N / A",
        intTerritory: "N / A",
        intLink: "",
        intLinks: [],
        
        notes: "Самостоятелна търговска марка GLADIATOR. Без прикрепени промишлени дизайни.",
        files: []
      }
    ]
  },
  {
    id: "proj-2",
    name: "INCA GOLD",
    code: "PRJ-INCA-002",
    description: "Самостоятелен проект с данни за търговска марка INCA GOLD (Национална и Международна регистрация).",
    createdDate: "2003-06-05",
    items: [
      {
        id: "item-inca-1",
        name: "INCA GOLD",
        type: "trademark",
        status: "expired",
        intStatus: "expired",
        image: null,
        gallery: [],
        
        // Национална регистрация (BG)
        appDate: "05.06.2003 г.",
        regDate: "02.12.2003 г.",
        territory: "BG",
        nationalLink: "",
        
        // Международна регистрация (WO)
        intAppDate: "02.12.2003 г.",
        intRegDate: "02.12.2003 г.",
        intTerritory: "WO",
        intLink: "",
        intLinks: [],
        
        notes: "Търговска марка INCA GOLD. Статус: Изтекла и прекратена.",
        files: []
      }
    ]
  },
  {
    id: "proj-3",
    name: "Oil COMPANY",
    code: "PRJ-OIL-003",
    description: "Обединен проект съдържащ търговска марка Oil COMPANY и промишлен дизайн Oil COMPANY.",
    createdDate: "2003-06-05",
    items: [
      {
        id: "item-oil-1",
        name: "Oil COMPANY",
        type: "trademark",
        status: "expired",
        intStatus: "expired",
        image: "images/oil_company_1_logo.png",
        gallery: [
          "images/oil_company_1_logo.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "5.06.2003 г.",
        regDate: "2.12.2003 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2003_65129",
        
        // Международна регистрация (WO)
        intAppDate: "21.06.2018 г.",
        intRegDate: "21.06.2018 г.",
        intTerritory: "RU, BY, MD, LV, UA",
        intLink: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000000815868",
        intLinks: ["https://www.tmdn.org/tmview/#/tmview/detail/WO500000000815868"],
        
        notes: "Търговска марка Oil COMPANY (Изтекла). Територии: RU, BY, MD, LV, UA. Вписване в BPO (Рег. № 65129) и TMview.",
        files: []
      },
      {
        id: "item-oil-ds",
        name: "Oil COMPANY",
        type: "design",
        status: "none",
        intStatus: "expired",
        image: "images/oil_company_1_design.png",
        gallery: [
          "images/oil_company_1_design.png"
        ],
        
        // Регистрация на дизайн (BG/Int)
        appDate: "N / A",
        regDate: "N / A",
        territory: "N / A",
        nationalLink: "",
        
        // Международни данни
        intAppDate: "21.06.2018 г.",
        intRegDate: "21.06.2018 г.",
        intTerritory: "WO (RU, BY, MD, LV, UA)",
        intLink: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000000835995",
        intLinks: ["https://www.tmdn.org/tmview/#/tmview/detail/WO500000000835995"],
        
        notes: "Промишлен дизайн за ротативка Oil COMPANY. Статус: Изтекъл. Международна регистрация в TMview.",
        link: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000000835995",
        files: []
      }
    ]
  },
  {
    id: "proj-4",
    name: "Oil Company II",
    code: "PRJ-OIL2-004",
    description: "Обединен проект съдържащ запазена търговска марка Oil COMPANY II и промишлен дизайн Oil Company II.",
    createdDate: "2015-12-18",
    items: [
      {
        id: "item-oil2-tm",
        name: "OiL CompanY II",
        type: "trademark",
        status: "registered",
        intStatus: "registered",
        image: "images/oil_company_2_tm_logo.png",
        gallery: [
          "images/oil_company_2_tm_logo.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "7.12.2020 г.",
        regDate: "10.05.2021 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2020_160989",
        
        // Международна регистрация
        intAppDate: "7.12.2020 г.",
        intRegDate: "N / A",
        intTerritory: "N / A",
        intLink: "https://www.tmdn.org/tmview/#/tmview/detail/BG50202000160989N",
        intLinks: ["https://www.tmdn.org/tmview/#/tmview/detail/BG50202000160989N"],
        
        notes: "Регистрирана търговска марка Oil Company II в Патентно Ведомство BG (Рег. № 160989) и TMview.",
        files: []
      },
      {
        id: "item-oil2-ds",
        name: "Oil Company II",
        type: "design",
        status: "registered",
        intStatus: "none",
        image: "images/oil_company_2_design_1.jpg",
        gallery: [
          "images/oil_company_2_design_1.jpg",
          "images/oil_company_2_design_2.jpg"
        ],
        
        // Регистрация на дизайн (EM / EUIPO)
        appDate: "18.12.2015 г.",
        regDate: "18.12.2015 г.",
        territory: "EM",
        nationalLink: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0069",
        
        // Международни данни
        intAppDate: "N / A",
        intRegDate: "N / A",
        intTerritory: "N / A",
        intLink: "",
        intLinks: [],
        
        notes: "Промишлен дизайн за казино ротативка Oil Company II, регистриран в EUIPO (Дизайн № 002914820-0069).",
        files: []
      }
    ]
  },
  {
    id: "proj-5",
    name: "crazy Bugs",
    code: "PRJ-BUG-005",
    description: "Обединен проект съдържащ две търговски марки crazy Bugs (2003 г. & 2025 г.) и един промишлен дизайн crazy Bugs Scatter BONUS.",
    createdDate: "2003-06-20",
    items: [
      {
        id: "item-bug-tm1",
        name: "crazy Bugs (2003)",
        type: "trademark",
        status: "registered",
        intStatus: "registered",
        image: "images/crazy_bugs_tm1.png",
        gallery: [
          "images/crazy_bugs_tm1.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "20.06.2003 г.",
        regDate: "16.12.2003 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2003_65417",
        
        // Международна регистрация (WO)
        intAppDate: "16.12.2003 г.",
        intRegDate: "16.12.2003 г.",
        intTerritory: "WO",
        intLink: "",
        intLinks: [],
        
        notes: "Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Класове: 9, 28. Вписване: BG/N/2003/65417 | Рег. № 46482",
        files: []
      },
      {
        id: "item-bug-tm2",
        name: "crazy Bugs (2025)",
        type: "trademark",
        status: "registered",
        intStatus: "none",
        image: "images/crazy_bugs_tm2.png",
        gallery: [
          "images/crazy_bugs_tm2.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "28.05.2025 г.",
        regDate: "28.05.2025 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2025_177620",
        
        // Международна регистрация
        intAppDate: "N / A",
        intRegDate: "N / A",
        intTerritory: "N / A",
        intLink: "",
        intLinks: [],
        
        notes: "Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Класове: 9, 28, 41. Вписване: BG/N/2025/177620 | Рег. № 177620",
        files: []
      },
      {
        id: "item-bug-ds",
        name: "crazy Bugs Scatter BONUS",
        type: "design",
        status: "registered",
        intStatus: "none",
        image: "images/crazy_bugs_design.png",
        gallery: [
          "images/crazy_bugs_design.png"
        ],
        
        // Регистрация на дизайн (BG)
        appDate: "17.12.2003 г.",
        regDate: "17.12.2003 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2003_68446",
        
        // Международни данни
        intAppDate: "N / A",
        intRegDate: "N / A",
        intTerritory: "N / A",
        intLink: "",
        intLinks: [],
        
        notes: "Промишлен дизайн за слот игра crazy Bugs Scatter BONUS. Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Класове: 9, 28. Рег. № 48070",
        files: []
      }
    ]
  },
  {
    id: "proj-6",
    name: "ACTION MONEY",
    code: "PRJ-ACT-006",
    description: "Обединен проект съдържащ търговска марка ACTION MONEY и промишлен дизайн ACTION MONEY.",
    createdDate: "2003-06-20",
    items: [
      {
        id: "item-act-tm",
        name: "ACTION MONEY",
        type: "trademark",
        status: "registered",
        intStatus: "registered",
        image: "images/action_money_tm_logo.png",
        gallery: [
          "images/action_money_tm_logo.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "20.06.2003 г.",
        regDate: "16.12.2003 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2003_65418",
        
        // Международна регистрация (WO / EUIPO)
        intAppDate: "21.06.2018 г.",
        intRegDate: "21.06.2018 г.",
        intTerritory: "WO (EU)",
        intLink: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000001438596",
        intLinks: [
          "https://www.tmdn.org/tmview/#/tmview/detail/WO500000001438596",
          "https://euipo.europa.eu/eSearch/#details/trademarks/W01438596"
        ],
        
        notes: "Търговска марка ACTION MONEY. Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Рег. № 46483 в Патентно ведомство (BPO), EUIPO и TMview.",
        link: "https://euipo.europa.eu/eSearch/#details/trademarks/W01438596",
        files: []
      },
      {
        id: "item-act-ds",
        name: "ACTION MONEY",
        type: "design",
        status: "registered",
        intStatus: "registered",
        image: "images/action_money_ds_highres.png",
        gallery: [
          "images/action_money_ds_highres.png",
          "images/action_money_ds_2.png"
        ],
        
        // Регистрация на дизайн (BG / EUIPO)
        appDate: "17.12.2003 г.",
        regDate: "17.12.2003 г.",
        territory: "BG / EM",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2003_68445",
        
        // Международни данни (EUIPO)
        intAppDate: "18.12.2015 г.",
        intRegDate: "18.12.2015 г.",
        intTerritory: "EM (EU)",
        intLink: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0081",
        intLinks: [
          "https://euipo.europa.eu/eSearch/#details/designs/002914820-0081"
        ],
        
        notes: "Промишлен дизайн за ротативка ACTION MONEY. Регистриран в BPO (Рег. № 48071) и EUIPO (Дизайн № 002914820-0081).",
        link: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0081",
        files: []
      }
    ]
  },
  {
    id: "proj-7",
    name: "GOLD OF ROMA",
    code: "PRJ-GOR-007",
    description: "Обединен проект съдържащ търговска марка GOLD OF ROMA и промишлен дизайн GOLD OF ROMA.",
    createdDate: "2003-11-12",
    items: [
      {
        id: "item-gor-tm",
        name: "GOLD OF ROMA",
        type: "trademark",
        status: "registered",
        intStatus: "expired",
        image: "images/gold_of_roma_tm_logo.png",
        gallery: [
          "images/gold_of_roma_tm_logo.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "12.11.2003 г.",
        regDate: "15.11.2004 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2003_67393",
        
        // Международна регистрация (WO)
        intAppDate: "20.04.2004 г.",
        intRegDate: "20.04.2004 г.",
        intTerritory: "WO (RU, BY, MD, UA)",
        intLink: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000000823531",
        intLinks: [
          "https://www.tmdn.org/tmview/#/tmview/detail/WO500000000823531"
        ],
        
        notes: "Търговска марка GOLD OF ROMA. Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Рег. № 49830 в BPO. Международна регистрация в TMview (Изтекла).",
        link: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000000823531",
        files: []
      },
      {
        id: "item-gor-ds",
        name: "GOLD OF ROMA",
        type: "design",
        status: "registered",
        intStatus: "none",
        image: "images/gold_of_roma_ds_highres.png",
        gallery: [
          "images/gold_of_roma_ds_highres.png"
        ],
        
        // Регистрация на дизайн (BG)
        appDate: "17.12.2003 г.",
        regDate: "17.12.2003 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2003_68444",
        
        // Международни данни
        intAppDate: "N / A",
        intRegDate: "N / A",
        intTerritory: "N / A",
        intLink: "",
        intLinks: [],
        
        notes: "Промишлен дизайн за слот игра GOLD OF ROMA. Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Рег. № 48069 в BPO.",
        files: []
      }
    ]
  },
  {
    id: "proj-8",
    name: "EMPEROR'S PALACE",
    code: "PRJ-EMP-008",
    description: "Обединен проект съдържащ три търговски марки EMPEROR'S PALACE (2004 г., 2019 г. & 2023 г.) и промишлен дизайн EMPEROR'S PALACE.",
    createdDate: "2004-11-26",
    items: [
      {
        id: "item-emp-tm2004",
        name: "EMPEROR'S PALACE (2004)",
        type: "trademark",
        status: "registered",
        intStatus: "none",
        image: "images/emperors_palace_tm2004.png",
        gallery: [
          "images/emperors_palace_tm2004.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "26.11.2004 г.",
        regDate: "08.06.2006 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2004_75310",
        
        // Международна регистрация
        intAppDate: "N / A",
        intRegDate: "N / A",
        intTerritory: "N / A",
        intLink: "",
        intLinks: [],
        
        notes: "Класическа търговска марка EMPEROR'S PALACE (2004 г.). Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Рег. № 54721 в BPO.",
        files: []
      },
      {
        id: "item-emp-tm2019",
        name: "EMPEROR'S PALACE (2019)",
        type: "trademark",
        status: "registered",
        intStatus: "registered",
        image: "images/emperors_palace_tm2019.png",
        gallery: [
          "images/emperors_palace_tm2019.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "04.12.2019 г.",
        regDate: "28.05.2020 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2019_157225",
        
        // Международна регистрация (WO / EU)
        intAppDate: "02.09.2021 г.",
        intRegDate: "02.09.2021 г.",
        intTerritory: "WO (EU)",
        intLink: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000001616539",
        intLinks: [
          "https://www.tmdn.org/tmview/#/tmview/detail/WO500000001616539",
          "https://euipo.europa.eu/eSearch/#details/trademarks/W01616539"
        ],
        
        notes: "Търговска марка EMPEROR'S PALACE с китайски йероглифи (2019 г.). Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Рег. № 157225 (BPO) & W01616539 (EUIPO / TMview).",
        link: "https://euipo.europa.eu/eSearch/#details/trademarks/W01616539",
        files: []
      },
      {
        id: "item-emp-tm2023",
        name: "EMPEROR'S PALACE (2023)",
        type: "trademark",
        status: "registered",
        intStatus: "registered",
        image: "images/emperors_palace_tm2023.png",
        gallery: [
          "images/emperors_palace_tm2023.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "07.11.2023 г.",
        regDate: "28.03.2024 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2023_171318",
        
        // Международна регистрация (WO / EU 2024)
        intAppDate: "12.04.2024 г.",
        intRegDate: "12.04.2024 г.",
        intTerritory: "WO (EU)",
        intLink: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000001810562",
        intLinks: [
          "https://www.tmdn.org/tmview/#/tmview/detail/WO500000001810562",
          "https://euipo.europa.eu/eSearch/#details/trademarks/W01810562"
        ],
        
        notes: "Модерна 3D червена търговска марка EMPEROR'S PALACE (2023/2024 г.). Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Рег. № 171318 (BPO) & W01810562 (EUIPO / TMview).",
        link: "https://euipo.europa.eu/eSearch/#details/trademarks/W01810562",
        files: []
      },
      {
        id: "item-emp-ds",
        name: "EMPEROR'S PALACE",
        type: "design",
        status: "registered",
        intStatus: "registered",
        image: "images/emperors_palace_ds_highres.png",
        gallery: [
          "images/emperors_palace_ds_highres.png"
        ],
        
        // Регистрация на дизайн (EM / EUIPO)
        appDate: "06.02.2018 г.",
        regDate: "06.02.2018 г.",
        territory: "EM",
        nationalLink: "https://euipo.europa.eu/eSearch/#details/designs/004695260-0045",
        
        // Международни данни (EUIPO)
        intAppDate: "06.02.2018 г.",
        intRegDate: "06.02.2018 г.",
        intTerritory: "EM (EU)",
        intLink: "https://euipo.europa.eu/eSearch/#details/designs/004695260-0045",
        intLinks: [
          "https://euipo.europa.eu/eSearch/#details/designs/004695260-0045"
        ],
        
        notes: "Промишлен дизайн за слот игра EMPEROR'S PALACE. Регистриран в EUIPO (Дизайн № 004695260-0045). Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД.",
        link: "https://euipo.europa.eu/eSearch/#details/designs/004695260-0045",
        files: []
      }
    ]
  },
  {
    id: "proj-9",
    name: "Classic Blend",
    code: "PRJ-CBL-009",
    description: "Самостоятелен проект с данни за търговска марка Classic Blend (без прикачени промишлени дизайни и без лого снимка).",
    createdDate: "2005-05-19",
    items: [
      {
        id: "item-cbl-tm",
        name: "Classic Blend",
        type: "trademark",
        status: "registered",
        intStatus: "none",
        image: null,
        gallery: [],
        
        // Национална регистрация (BG)
        appDate: "19.05.2005 г.",
        regDate: "07.03.2007 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2005_78828",
        
        // Международна регистрация (TMview вписване)
        intAppDate: "N / A",
        intRegDate: "N / A",
        intTerritory: "N / A",
        intLink: "https://www.tmdn.org/tmview/#/tmview/detail/BG50200500078828N",
        intLinks: [
          "https://www.tmdn.org/tmview/#/tmview/detail/BG50200500078828N"
        ],
        
        notes: "Търговска марка Classic Blend. Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Рег. № 57685 в Патентно ведомство (BPO) и TMview.",
        link: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2005_78828",
        files: []
      }
    ]
  },
  {
    id: "proj-10",
    name: "OCEAN RUSH",
    code: "PRJ-OCE-010",
    description: "Обединен проект съдържащ търговска марка OCEAN RUSH и промишлен дизайн OCEAN RUSH.",
    createdDate: "2005-09-09",
    items: [
      {
        id: "item-oce-tm",
        name: "OCEAN RUSH",
        type: "trademark",
        status: "registered",
        intStatus: "expired",
        image: "images/ocean_rush_tm_logo.png",
        gallery: [
          "images/ocean_rush_tm_logo.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "09.09.2005 г.",
        regDate: "28.02.2007 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2005_81055",
        
        // Международна регистрация (WO)
        intAppDate: "06.06.2006 г.",
        intRegDate: "06.06.2006 г.",
        intTerritory: "WO (RU, BY, MD, UA)",
        intLink: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000000890288",
        intLinks: [
          "https://www.tmdn.org/tmview/#/tmview/detail/WO500000000890288"
        ],
        
        notes: "Търговска марка OCEAN RUSH. Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Рег. № 57608 в BPO. Международна регистрация в TMview (Изтекла).",
        link: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000000890288",
        files: []
      },
      {
        id: "item-oce-ds",
        name: "OCEAN RUSH",
        type: "design",
        status: "registered",
        intStatus: "registered",
        image: "images/ocean_rush_ds_1.jpg",
        gallery: [
          "images/ocean_rush_ds_1.jpg",
          "images/ocean_rush_ds_2.jpg"
        ],
        
        // Регистрация на дизайн (EM / EUIPO)
        appDate: "18.12.2015 г.",
        regDate: "18.12.2015 г.",
        territory: "EM",
        nationalLink: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0068",
        
        // Международни данни (EUIPO)
        intAppDate: "18.12.2015 г.",
        intRegDate: "18.12.2015 г.",
        intTerritory: "EM (EU)",
        intLink: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0068",
        intLinks: [
          "https://euipo.europa.eu/eSearch/#details/designs/002914820-0068"
        ],
        
        notes: "Промишлен дизайн за слот игра OCEAN RUSH. Регистриран в EUIPO (Дизайн № 002914820-0068). Галерия от скрийншоти на ротативката и таблицата с печалби.",
        link: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0068",
        files: []
      }
    ]
  },
  {
    id: "proj-11",
    name: "Cat 4 Cash",
    code: "PRJ-CAT-011",
    description: "Обединен проект съдържащ търговска марка Cat 4 Cash и два промишлени дизайна (CAT 4 CASH MULTI-1 & MULTI-2).",
    createdDate: "2006-09-28",
    items: [
      {
        id: "item-cat-tm",
        name: "Cat 4 Cash",
        type: "trademark",
        status: "registered",
        intStatus: "none",
        image: "images/cat4cash_tm_logo.png",
        gallery: [
          "images/cat4cash_tm_logo.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "28.09.2006 г.",
        regDate: "12.03.2008 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2006_88655",
        
        // Международна регистрация
        intAppDate: "N / A",
        intRegDate: "N / A",
        intTerritory: "N / A",
        intLink: "",
        intLinks: [],
        
        notes: "Търговска марка Cat 4 Cash. Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Рег. № 61605 в Патентно ведомство (BPO).",
        link: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2006_88655",
        files: []
      },
      {
        id: "item-cat-ds1",
        name: "CAT 4 CASH MULTI-1",
        type: "design",
        status: "registered",
        intStatus: "registered",
        image: "images/cat4cash_multi1_ds1.png",
        gallery: [
          "images/cat4cash_multi1_ds1.png",
          "images/cat4cash_multi1_ds2.jpg",
          "images/cat4cash_multi1_ds3.jpg"
        ],
        
        // Регистрация на дизайн (EM / EUIPO)
        appDate: "18.12.2015 г.",
        regDate: "18.12.2015 г.",
        territory: "EM",
        nationalLink: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0015",
        
        // Международни данни (EUIPO)
        intAppDate: "18.12.2015 г.",
        intRegDate: "18.12.2015 г.",
        intTerritory: "EM (EU)",
        intLink: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0015",
        intLinks: [
          "https://euipo.europa.eu/eSearch/#details/designs/002914820-0015"
        ],
        
        notes: "Промишлен дизайн за мултигейм игра CAT 4 CASH MULTI-1. Регистриран в EUIPO (Дизайн № 002914820-0015). Галерия от екрани: избор на игра, Джакпот екран & Free Spin завъртания.",
        link: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0015",
        files: []
      },
      {
        id: "item-cat-ds2",
        name: "CAT 4 CASH MULTI-2",
        type: "design",
        status: "registered",
        intStatus: "registered",
        image: "images/cat4cash_multi2_ds1.png",
        gallery: [
          "images/cat4cash_multi2_ds1.png"
        ],
        
        // Регистрация на дизайн (EM / EUIPO)
        appDate: "18.12.2015 г.",
        regDate: "18.12.2015 г.",
        territory: "EM",
        nationalLink: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0016",
        
        // Международни данни (EUIPO)
        intAppDate: "18.12.2015 г.",
        intRegDate: "18.12.2015 г.",
        intTerritory: "EM (EU)",
        intLink: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0016",
        intLinks: [
          "https://euipo.europa.eu/eSearch/#details/designs/002914820-0016"
        ],
        
        notes: "Промишлен дизайн за мултигейм игра CAT 4 CASH MULTI-2. Регистриран в EUIPO (Дизайн № 002914820-0016). Скрийншот на избора на игри.",
        link: "https://euipo.europa.eu/eSearch/#details/designs/002914820-0016",
        files: []
      }
    ]
  },
  {
    id: "proj-12",
    name: "RISE OF RA",
    code: "PRJ-RRA-012",
    description: "Обединен проект съдържащ търговски марки RISE OF RA (БГ 2006, БГ 2019 с китайски йероглифи, Международна 2016 и Международна 2020).",
    createdDate: "2006-11-22",
    items: [
      {
        id: "item-rra-tm2006",
        name: "RISE OF RA (2006)",
        type: "trademark",
        status: "registered",
        intStatus: "registered",
        image: "images/rise_of_ra_tm_logo.png",
        gallery: [
          "images/rise_of_ra_tm_logo.png",
          "images/rise_of_ra_banner.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "22.11.2006 г.",
        regDate: "05.08.2008 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2006_91475",
        
        // Международна регистрация (WO)
        intAppDate: "19.10.2016 г.",
        intRegDate: "19.10.2016 г.",
        intTerritory: "WO",
        intLink: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000001356049",
        intLinks: [
          "https://www.tmdn.org/tmview/#/tmview/detail/WO500000001356049"
        ],
        
        notes: "Класическа търговска марка RISE OF RA (2006 г.). Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Вписване BG: Заявка № 91475 | Рег. № 66329. Международна регистрация № 1356049 (WIPO / TMview).",
        link: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2006_91475",
        files: []
      },
      {
        id: "item-rra-tm2019",
        name: "RISE OF RA (2019 / 2020)",
        type: "trademark",
        status: "registered",
        intStatus: "registered",
        image: "images/rise_of_ra_cn_logo.png",
        gallery: [
          "images/rise_of_ra_cn_logo.png"
        ],
        
        // Национална регистрация (BG)
        appDate: "04.12.2019 г.",
        regDate: "02.06.2020 г.",
        territory: "BG",
        nationalLink: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2019_157240",
        
        // Международна регистрация (WO)
        intAppDate: "02.06.2020 г.",
        intRegDate: "02.06.2020 г.",
        intTerritory: "WO",
        intLink: "https://www.tmdn.org/tmview/#/tmview/detail/WO500000001551611",
        intLinks: [
          "https://www.tmdn.org/tmview/#/tmview/detail/WO500000001551611"
        ],
        
        notes: "Търговска марка RISE OF RA с китайски йероглифи (太陽神的崛起 RISE OF RA). Собственик: ЕВРО ГЕЙМС ТЕХНОЛОДЖИ ООД. Вписване BG: Заявка № 157240 | Рег. № 157240. Международна регистрация № 1551611 (WIPO / TMview).",
        link: "https://portal.bpo.bg/bpo-registers/marks/view/BG_N_2019_157240",
        files: []
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INITIAL_PROJECTS };
}


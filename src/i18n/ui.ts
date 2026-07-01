// Central dictionary for all UI chrome strings (nav labels, buttons, aria
// labels, CV section headings). Content prose lives in content collections.
export type Lang = "en" | "pl";

export const DEFAULT_LANG: Lang = "en";
export const LANGS: readonly Lang[] = ["en", "pl"] as const;

export const ui = {
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.projects": "Projects & apps",
    "nav.research": "Research",
    "nav.skills": "Skills",
    "nav.achievements": "Achievements",
    "nav.interests": "Interests",
    "nav.toggle": "Toggle navigation",
    "projects.moreCodePrefix": "More code can be found on ",
    "projects.moreCodeLink": "my github",
    "cta.downloadCv": "Download CV (PDF)",
    "theme.toggleAria": "Toggle dark mode",
    "theme.toggleTitle": "Toggle theme",
    "lang.label": "Language",
    "lang.switchToEn": "Switch to English",
    "lang.switchToPl": "Switch to Polish",
    "concerts.show": "Click here to view the full concerts list",
    "concerts.hide": "Click here to hide the full concerts list",
    "cv.workExperience": "Work experience",
    "cv.projects": "Projects",
    "cv.skills": "Skills",
    "cv.interests": "Interests",
    "cv.education": "Education",
    "cv.certifications": "Certifications",
  },
  pl: {
    "nav.about": "O mnie",
    "nav.experience": "Doświadczenie",
    "nav.education": "Wykształcenie",
    "nav.projects": "Projekty i aplikacje",
    "nav.research": "Badania",
    "nav.skills": "Umiejętności",
    "nav.achievements": "Osiągnięcia",
    "nav.interests": "Zainteresowania",
    "nav.toggle": "Otwórz lub zamknij nawigację",
    "projects.moreCodePrefix": "Więcej kodu znajdziesz na ",
    "projects.moreCodeLink": "moim GitHubie",
    "cta.downloadCv": "Pobierz CV (PDF)",
    "theme.toggleAria": "Przełącz tryb ciemny",
    "theme.toggleTitle": "Przełącz motyw",
    "lang.label": "Język",
    "lang.switchToEn": "Przełącz na angielski",
    "lang.switchToPl": "Przełącz na polski",
    "concerts.show": "Kliknij, aby zobaczyć pełną listę koncertów",
    "concerts.hide": "Kliknij, aby ukryć pełną listę koncertów",
    "cv.workExperience": "Doświadczenie zawodowe",
    "cv.projects": "Projekty",
    "cv.skills": "Umiejętności",
    "cv.interests": "Zainteresowania",
    "cv.education": "Wykształcenie",
    "cv.certifications": "Certyfikaty",
  },
} as const;

export type UIKey = keyof (typeof ui)["en"];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[DEFAULT_LANG][key];
  };
}

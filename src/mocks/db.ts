export interface IConsent {
  id: string;
  name: string;
  email: string;
  consents: string[];
}

let consents: IConsent[] = [
  {
    id: "1",
    name: "Bojack Horseman",
    email: "bojack@horseman.com",
    consents: ["Receive newsletter", "Be shown targeted ads"],
  },
  {
    id: "2",
    name: "Princess Carolyn",
    email: "princess@manager.com",
    consents: ["Receive newsletter"],
  },
  {
    id: "3",
    name: "John Doe",
    email: "johndoe@manager.com",
    consents: ["Receive newsletter"],
  },
];

let lastId = 3;

export const db = {
  consents: {
    getAll: () => consents,
    add: (newConsentData: Omit<IConsent, "id">) => {
      const newConsent = {
        id: String(lastId++),
        ...newConsentData,
      };

      consents = [...consents, newConsent];
      return newConsent;
    },
  },
};

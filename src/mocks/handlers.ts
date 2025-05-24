import { http, HttpResponse } from "msw";
import { db, type IConsent } from "./db";

const API_BASE_URL = "/consents";

export const handlers = [
  // mock for GET /consents
  http.get(API_BASE_URL, () => {
    return HttpResponse.json({
      data: db.consents.getAll(),
    });
  }),

  // mock for POST /consents
  http.post(API_BASE_URL, async ({ request }) => {
    const newConsentData = (await request.json()) as Omit<IConsent, "id">;

    if (
      !newConsentData.name ||
      !newConsentData.email ||
      !newConsentData.consents
    ) {
      return HttpResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const addedConsent = db.consents.add(newConsentData);

    // Returns the newly created consent and a 201 status
    return HttpResponse.json(addedConsent, { status: 201 });
  }),
];

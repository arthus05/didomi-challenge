import { http, HttpResponse } from "msw";
import { db, type IConsent } from "./db";

const API_BASE_URL = "/consents";

export const handlers = [
  // mock for GET /consents
  http.get(API_BASE_URL, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "2", 10);

    const allConsents = db.consents.getAll();
    const totalItems = allConsents.length;
    const totalPages = Math.ceil(totalItems / limit);

    const paginatedConsents = allConsents.slice(
      (page - 1) * limit,
      page * limit,
    );

    return HttpResponse.json({
      data: paginatedConsents,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages,
      },
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

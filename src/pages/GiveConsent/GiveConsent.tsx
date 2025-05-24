import { useState } from "react";
import { PageLayout } from "../../layout/Page/Page";

import "./styles.scss";

export const GiveConsent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedConsents, setSelectedConsents] = useState<
    Record<string, boolean>
  >({});

  const handleConsentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setSelectedConsents((prev) => ({ ...prev, [value]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch("/consents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          consents: Object.keys(selectedConsents).filter(
            (key) => selectedConsents[key],
          ),
        }),
      });

      setName("");
      setEmail("");
      setSelectedConsents({});
      alert("Consent submitted successfully!");
    } catch (err) {
      console.error("Failed to submit new consent:", err);
    }
  };

  return (
    <PageLayout>
      <section className="give-consent">
        <form className="give-consent__form" onSubmit={handleSubmit}>
          <fieldset className="give-consent__form-user-data">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <p>I agree to:</p>

          <fieldset className="give-consent__form-consents">
            <div>
              <input
                type="checkbox"
                id="consent1"
                name="consent1"
                value="Receive newsletter"
                onChange={handleConsentSelect}
              />
              <label htmlFor="consent1">Receive newsletter</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="consent2"
                name="consent2"
                value="Be shown targeted ads"
                onChange={handleConsentSelect}
              />
              <label htmlFor="consent2">Be shown targeted ads</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="consent3"
                name="consent3"
                value="Contribute to anonymous visit statistics"
                onChange={handleConsentSelect}
              />
              <label htmlFor="consent3">
                Contribute to anonymous visit statistics
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="give-consent__form-submit"
            disabled={
              Object.values(selectedConsents).filter(Boolean).length === 0
            }
          >
            Give consent
          </button>
        </form>
      </section>
    </PageLayout>
  );
};

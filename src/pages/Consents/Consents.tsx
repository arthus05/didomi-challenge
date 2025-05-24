import { useEffect, useState } from "react";
import { PageLayout } from "../../layout/Page/Page";

import "./styles.scss";

interface IConsents {
  name: string;
  email: string;
  consents: string[];
}

export const Consents = () => {
  const [consents, setConsents] = useState<IConsents[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(consents.length / 2);
  const paginatedConsents = consents.slice(
    (currentPage - 1) * 2,
    currentPage * 2,
  );

  const fetchConsents = async () => {
    try {
      const res = await fetch("/consents");

      if (!res.ok) {
        throw new Error(`HTTP request ${res.status} error`);
      }

      const result = await res.json();
      setConsents(result.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchConsents();
  }, [currentPage]);

  const onPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);
  };

  return (
    <PageLayout>
      <section className="consents">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Consent given for</th>
            </tr>
          </thead>
          <tbody>
            {paginatedConsents.map((consent) => (
              <tr>
                <td>{consent.name}</td>
                <td>{consent.email}</td>
                <td>{consent.consents.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 ? (
          <section>
            <span onClick={() => onPageChange(currentPage - 1)}>
              {"<"} {"<"} Previous page
            </span>
            <div>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <span onClick={() => onPageChange(p)}>{p}</span>
              ))}
            </div>
            <span onClick={() => onPageChange(currentPage + 1)}>
              Next page {">"} {">"}
            </span>
          </section>
        ) : (
          <></>
        )}
      </section>
    </PageLayout>
  );
};

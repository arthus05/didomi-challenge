import { useEffect, useState } from "react";
import { PageLayout } from "../../layout/Page/Page";

import "./styles.scss";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

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
        <div className="consents__content">
          <Table className="consents__table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Consent given for</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedConsents.map((consent) => (
                <TableRow>
                  <TableCell>{consent.name}</TableCell>
                  <TableCell>{consent.email}</TableCell>
                  <TableCell>{consent.consents.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 ? (
            <section className="consents__paging-buttons">
              <span onClick={() => onPageChange(currentPage - 1)}>
                {"<"} {"<"} Previous page
              </span>
              <div className="consents__paging-buttons--numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <span onClick={() => onPageChange(p)}>{p}</span>
                  ),
                )}
              </div>
              <span onClick={() => onPageChange(currentPage + 1)}>
                Next page {">"} {">"}
              </span>
            </section>
          ) : (
            <></>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { adminGetEnrollmentsStats } from "@/app/data/admin/admin-get-enrollments-stats";
import data from "./data.json";
import { DataTable } from "@/components/sidebar/data-table";
export default async function AdminPage() {
  const enrollmentsStats = await adminGetEnrollmentsStats();

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive data={enrollmentsStats} />

      <DataTable data={data} />
    </>
  );
}

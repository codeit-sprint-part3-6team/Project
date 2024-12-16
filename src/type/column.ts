interface GetColumnParams {
  teamId: string;
  dashboardId: number;
}

interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

interface GetColumnsResponse {
  result: string;
  data: Column[];
}

export type { GetColumnParams, GetColumnsResponse };

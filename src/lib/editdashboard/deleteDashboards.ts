import instance from '../instance';

const deleteDashboard = async (dashboardId: number | undefined) => {
  const { data } = await instance.delete(`/dashboards/${dashboardId}`);
  return data;
};

export default deleteDashboard;

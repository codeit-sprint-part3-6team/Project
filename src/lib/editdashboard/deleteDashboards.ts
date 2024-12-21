import instance from '../instance';

const deleteDashboard = async (dashboardId: number) => {
  try {
    await instance.delete(`/11-6/dashboards/${dashboardId}`);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default deleteDashboard;

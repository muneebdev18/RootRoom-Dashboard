const barChartUtils = {
  getMonthName: function (monthIndex) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex - 1];
  },
  CHART_COLORS: {
    blue: '#04a7ea',
    purple: '#070029',
    peach: 'rgb(249, 131, 124)',
  },
};

export default barChartUtils;
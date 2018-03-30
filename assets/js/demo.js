type = ['', 'info', 'success', 'warning', 'danger'];

demo = {
  initDashboardPageCharts: function() {
    /* ----------==========     Daily Sales Chart initialization    ==========---------- */

    dataDailySalesChart = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [[12, 17, 7, 17, 23, 18, 38]]
    };

    optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    };

    var dailySalesChart = new Chartist.Line(
      '#dailySalesChart',
      dataDailySalesChart,
      optionsDailySalesChart
    );

    md.startAnimationForLineChart(dailySalesChart);

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    var dataCompletedTasksChart = {
      labels: ['Bananas', 'Apples', 'Grapes'],
      series: [5, 3, 4]
    };

    var sum = function(a, b) {
      return a + b;
    };

    var optionsCompletedTasksChart = {
      labelInterpolationFnc: function(value) {
        return value[0];
      }
    };

    var completedTasksChart = new Chartist.Pie(
      '#completedTasksChart',
      dataCompletedTasksChart,
      optionsCompletedTasksChart
    );
    // start animation for the Completed Tasks Chart - Line Chart
    md.startAnimationForLineChart(completedTasksChart);

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var dataEmailsSubscriptionChart = {
      labels: [
        '0-10 lac',
        '10 lac-20 lac',
        '20 lac-30 lac',
        '30 lac-40 lac',
        '40 lac-50 lac',
        '50 lac-60 lac'
      ],
      series: [[542, 443, 320, 780, 553, 453]]
    };
    var optionsEmailsSubscriptionChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0
      }
    };
    var responsiveOptions = [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ];
    var emailsSubscriptionChart = Chartist.Bar(
      '#emailsSubscriptionChart',
      dataEmailsSubscriptionChart,
      optionsEmailsSubscriptionChart,
      responsiveOptions
    );

    //start animation for the Emails Subscription Chart
    md.startAnimationForBarChart(emailsSubscriptionChart);
  }
};

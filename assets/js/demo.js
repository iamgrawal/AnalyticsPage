var dataDailySalesChart = {
  labels: [],
  series: []
};
var seriesDailySalesChart = [];

var dataCompletedTasksChart = {
  labels: [],
  series: []
};

var seriesEmailsSubscriptionChart = [];

var dataEmailsSubscriptionChart = {
  labels: [],
  series: []
};

demo = {
  initDashboardPageCharts: function() {
    apis.FillLineGraphData();
    apis.FillBarGraph();
    apis.FillPieGraph();
    apis.FillTable();
  },
  /* ----------==========     Daily Sales Chart initialization    ==========---------- */

  initLineGraph: function() {
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
  },

  /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

  initPieGraph: function() {
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
  },

  /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

  initBarGraph: function() {
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

apis = {
  FillLineGraphData: function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = this.responseText;
        response = $.parseJSON(response);
        $.each(response, function(i, item) {
          dataDailySalesChart.labels.push(item.day);
          seriesDailySalesChart.push(parseInt(item.views));
        });
        dataDailySalesChart.series.push(seriesDailySalesChart);
        demo.initLineGraph();
      }
    };
    xhttp.open('GET', 'http://122.176.81.234:8001/app/line-graph', true);
    xhttp.send();
  },
  FillBarGraph: function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = this.responseText;
        response = $.parseJSON(response);
        $.each(response, function(i, item) {
          dataEmailsSubscriptionChart.labels.push(item.range);
          seriesEmailsSubscriptionChart.push(item.value);
        });
        dataEmailsSubscriptionChart.series.push(seriesEmailsSubscriptionChart);
        demo.initBarGraph();
      }
    };
    xhttp.open('GET', 'http://122.176.81.234:8001/app/bar-graph', true);
    xhttp.send();
  },
  FillPieGraph: function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = this.responseText;
        response = $.parseJSON(response);
        $.each(response, function(i, item) {
          dataCompletedTasksChart.labels.push(item.tag);
          dataCompletedTasksChart.series.push(item.value);
        });
        demo.initPieGraph();
      }
    };
    xhttp.open('GET', 'http://122.176.81.234:8001/app/pie-chart', true);
    xhttp.send();
  },
  FillTable: function() {
    var xhttp = new XMLHttpRequest();
    var value = window.location.hash;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = this.responseText;
        response = $.parseJSON(response);
        $.each(response, function(i, item) {
          $('<tr>')
            .html(
              '<td>' +
                i +
                '</td><td><a href="' +
                item.url +
                '">' +
                item.title +
                '</td><td>' +
                item.count +
                '</td></a>'
            )
            .appendTo('#tableBody');
        });
      }
    };
    xhttp.open('GET', 'http://122.176.81.234:8001/app/table', true);
    xhttp.send();
  }
};

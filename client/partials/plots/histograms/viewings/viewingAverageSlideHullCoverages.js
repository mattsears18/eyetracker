Template.PlotHistogramViewingAverageSlideHullCoverages.helpers({
  x: () => {               return getX(); },

  layout: () => {
    return {
      title: 'Average Convex Hull Coverage (Slide Method)',
      xaxis: {
        title: 'Coverage',
        rangemode: 'tozero',
        autorange: true,
      },
      yaxis: {
        title: 'Frequency',
      },
      margin: {
        l: 60,
        r: 10,
        b: 70,
        t: 50,
      },
      bargap: 0.06,
    };
  },
});

function getX() {
  viewings = Template.currentData().viewings;
  return viewings.fetch().map(function(viewing) {
    return viewing.averageSlideHullCoverage;
  });
}
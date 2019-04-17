import PlotHull from '../PlotHull/PlotHull';

export default function getHulls() {
  let hulls = [];

  if(!this.viewing().gazepoints.length) { return hulls; }

  let firstHullEndIndex = this.getEndGazepointIndex(0);

  let firstHull = new PlotHull({
    viewing: this.viewing(),
    fixationTrailLength: this.fixationTrailLength,
    startIndex: 0,
    endIndex: firstHullEndIndex
  });

  let endIndex;

  for(endIndex = (this.viewing().gazepoints.length - 1); endIndex > firstHullEndIndex; endIndex--) {
    let startIndex = this.getStartGazepointIndex(endIndex);
    let h = new PlotHull({
      viewing: this.viewing(),
      fixationTrailLength: this.fixationTrailLength,
      startIndex: startIndex,
      endIndex: endIndex,
    });
    hulls.push(h);
  }

  hulls.push(firstHull);
  hulls = hulls.reverse();

  return hulls;
}

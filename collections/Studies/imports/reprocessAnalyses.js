import Jobs from "../../../collections/Jobs/Jobs";

export default function reprocessAnalyses() {
  analyses = Analyses.find({ studyId: this._id });

  analyses.forEach(function(analysis) {
    analysis.makeViewingJobs();
  });
}

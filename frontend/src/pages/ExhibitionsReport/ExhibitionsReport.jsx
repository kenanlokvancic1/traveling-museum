import React from "react";
import ExhibitionsReportLayout from "../../components/ExhibitionsReport/ExhibitionsReportLayout";
import { ReportContainer, ReportTitle } from "./ExhibitionsReport.styles";

const ExhibitionsReport = () => {
  return (
    <ReportContainer>
      <ReportTitle variant="h4">Exhibitions Report</ReportTitle>
      <ExhibitionsReportLayout />
    </ReportContainer>
  );
};

export default ExhibitionsReport;

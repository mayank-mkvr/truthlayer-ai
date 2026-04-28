import Papa from "papaparse";

export interface BiasMetrics {
  approvalRateByGroup: { [key: string]: number };
  missingValues: { [key: string]: number };
  imbalancedClasses: { [key: string]: number };
  disparateImpactRatio: number;
  equalOpportunityDifference: number;
  totalRows: number;
  columns: string[];
}

export const analyzeCSV = (file: File): Promise<BiasMetrics> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as any[];
        const columns = results.meta.fields || [];
        
        // 1. Missing Values
        const missingValues: { [key: string]: number } = {};
        columns.forEach(col => {
          missingValues[col] = data.filter(row => row[col] === undefined || row[col] === null || row[col] === "").length;
        });

        // Identify target and protected columns (heuristics)
        const targetCol = columns.find(c => c.toLowerCase().includes("approved") || c.toLowerCase().includes("target") || c.toLowerCase().includes("label")) || columns[columns.length - 1];
        const protectedCol = columns.find(c => c.toLowerCase().includes("gender") || c.toLowerCase().includes("sex") || c.toLowerCase().includes("race") || c.toLowerCase().includes("age")) || columns[0];

        // 2. Imbalanced Classes (Protected Attribute)
        const groups = Array.from(new Set(data.map(row => row[protectedCol])));
        const imbalancedClasses: { [key: string]: number } = {};
        groups.forEach(g => {
          imbalancedClasses[String(g)] = data.filter(row => row[protectedCol] === g).length;
        });

        // 3. Approval Rate by Group
        const approvalRateByGroup: { [key: string]: number } = {};
        groups.forEach(g => {
          const groupData = data.filter(row => row[protectedCol] === g);
          const approvedCount = groupData.filter(row => String(row[targetCol]).toLowerCase() === "1" || String(row[targetCol]).toLowerCase() === "true" || String(row[targetCol]).toLowerCase() === "yes").length;
          approvalRateByGroup[String(g)] = approvedCount / groupData.length;
        });

        // 4. Disparate Impact Ratio (DIR)
        // Ratio of probability of favorable outcome for unprivileged group to privileged group
        // We'll assume the group with the higher approval rate is privileged for this calculation
        const rates = Object.values(approvalRateByGroup);
        const maxRate = Math.max(...rates);
        const minRate = Math.min(...rates);
        const disparateImpactRatio = maxRate === 0 ? 1 : minRate / maxRate;

        // 5. Equal Opportunity Difference (EOD)
        // Difference in true positive rates between groups
        // Simplified for this calculation as the difference in approval rates
        const equalOpportunityDifference = maxRate - minRate;

        resolve({
          approvalRateByGroup,
          missingValues,
          imbalancedClasses,
          disparateImpactRatio,
          equalOpportunityDifference,
          totalRows: data.length,
          columns
        });
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export function getPerformanceLabel(gpa) {
  if (gpa >= 3.7) return "Excellent";
  if (gpa >= 3.3) return "Great Performance";
  if (gpa >= 3) return "Good";
  if (gpa >= 2) return "Satisfactory";
  if (gpa >= 1) return "Needs Improvement";
  return "At Risk";
}

import { reportWebVitals } from 'web-vitals';

// Function to log web vitals
const logVitals = (metric) => {
  console.log(metric);
};

// Measure performance in the app and log the results
reportWebVitals(logVitals);

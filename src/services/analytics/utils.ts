export const initAnalyticsDOM = () => {
  const analyticElements = document.querySelectorAll("[data-analytics]");
  if (analyticElements.length > 0) {
    analyticElements.forEach((element) => {
      element.addEventListener("click", () => {
        const value = element.getAttribute("data-analytics");
        const options = element.getAttribute("data-analytics-options");
        if (value) {
          if (options) {
            window.analyticsManager.track(value, JSON.parse(options));
          } else {
            window.analyticsManager.track(value);
          }
        }
      });
    });
  }
};

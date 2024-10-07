export const initAnalytics = () => {
  const analyticElements = document.querySelectorAll("[data-analytics]");
  if (analyticElements.length > 0) {
    analyticElements.forEach((element) => {
      element.addEventListener("click", () => {
        const value = element.getAttribute("data-analytics");
        const options = element.getAttribute("data-analytics-options");
        if (value) {
          if (options) {
            window.gtag("event", value, JSON.parse(options));
          } else {
            window.gtag("event", value);
          }
        }
      });
    });
  }
};

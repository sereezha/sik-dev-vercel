export function initIntersect() {
  const items = document.querySelectorAll("[data-intersect]");
  if (!items?.length) return;

  const itemsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  items.forEach((item) => itemsObserver.observe(item));
}

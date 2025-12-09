export const scrollToElement = (id, scrollPosition = "start") => {
  if (typeof window === "undefined") return;

  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: scrollPosition });
  }
};

export const navigateToIdLink = (link, id, scrollPosition = "start") => {
  if (typeof window === "undefined") return;

  if (window.location.pathname !== link) {
    window.location.href = `${link.replace(/^\/?/, "/")}#${id}`;
  } else {
    scrollToElement(id, scrollPosition);
  }
};

export const handleIdScroll = (link) => {
  if (!link?.linkOptions?.id) return;

  const id = link.linkOptions.id;
  const scrollPos = link.linkOptions.scrollPosition || "start";

  navigateToIdLink(link.link, id, scrollPos);
};

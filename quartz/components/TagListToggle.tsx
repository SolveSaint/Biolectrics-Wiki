import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const TagListToggle: QuartzComponent = (_props: QuartzComponentProps) => {
  const code = `
    (function () {
      document.addEventListener("DOMContentLoaded", function () {
        var tagList = document.querySelector(".tag-list, .tags");
        if (!tagList) return;

        var maxVisible = 20; // change this to show more/less before expand
        if (tagList.children.length <= maxVisible) return;

        tagList.style.maxHeight = "150px";
        tagList.style.overflow = "hidden";
        tagList.style.position = "relative";

        var btn = document.createElement("button");
        btn.textContent = "Show more tags";
        btn.className = "expand-tags-btn";
        btn.addEventListener("click", function () {
          var expanded = tagList.style.maxHeight === "none";
          tagList.style.maxHeight = expanded ? "150px" : "none";
          btn.textContent = expanded ? "Show more tags" : "Show fewer tags";
        });

        tagList.after(btn);
      });
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
};

export default (() => TagListToggle) satisfies QuartzComponentConstructor;

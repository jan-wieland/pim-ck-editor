(function () {
  document.addEventListener(pimcore.events.initializeWysiwyg, (e) => {
    const { textarea, context } = e.detail;
    const textareaId = textarea.id;
    const element = document.getElementById(textareaId);
    if (!element) return;

    // Wrapper für CKEditor erstellen
    const wrapper = document.createElement("div");
    wrapper.id = textareaId + "_ck_wrapper";
    element.parentNode.insertBefore(wrapper, element);
    element.style.display = "none";

    CKEditor5.ClassicEditor.create(wrapper, {
      initialData: element.value,
      plugins: [
        CKEditor5.Essentials,
        CKEditor5.Paragraph,
        CKEditor5.Bold,
        CKEditor5.Italic,
        CKEditor5.Underline,
        CKEditor5.Strikethrough,
        CKEditor5.Heading,
        CKEditor5.Link,
        CKEditor5.List,
        CKEditor5.BlockQuote,
        CKEditor5.Table,
        CKEditor5.TableToolbar,
        CKEditor5.Alignment,
        CKEditor5.HorizontalLine,
        CKEditor5.SourceEditing,
      ],
      toolbar: {
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "|",
          "alignment",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "link",
          "blockQuote",
          "insertTable",
          "horizontalLine",
          "|",
          "sourceEditing",
          "|",
          "undo",
          "redo",
        ],
      },
      link: {
        decorators: {
          openInNewTab: {
            mode: "manual",
            label: "In neuem Tab öffnen",
            attributes: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
          addCssClass: {
            mode: "manual",
            label: "CSS-Klasse",
            attributes: {
              class: "link",
            },
          },
        },
        defaultProtocol: "https://",
      },
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Absatz",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "H1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "H2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "H3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "H4",
            class: "ck-heading_heading4",
          },
        ],
      },
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
    })
      .then((editor) => {
        // Änderungen an Pimcore melden
        editor.model.document.on("change:data", () => {
          document.dispatchEvent(
            new CustomEvent(pimcore.events.changeWysiwyg, {
              detail: {
                e: { target: { id: textareaId } },
                data: editor.getData(),
                context: context,
              },
            }),
          );
        });

        // Editor-Instanz speichern für späteres Cleanup
        element._ckEditor = editor;
      })
      .catch((error) => {
        console.error("CKEditor init error:", error);
      });
  });

  // Cleanup wenn Pimcore den Editor zerstört
  document.addEventListener(pimcore.events.destroyWysiwyg, (e) => {
    const { textarea } = e.detail;
    const element = document.getElementById(textarea.id);
    if (element && element._ckEditor) {
      element._ckEditor.destroy();
      element._ckEditor = null;
    }
  });
})();

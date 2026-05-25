pimcore.registerNS("pimcore.bundle.ckeditor.editor");
pimcore.bundle.ckeditor.editor = Class.create({
  editors: new Map(),

  initialize: function () {
    if (!parent.pimcore.wysiwyg) {
      parent.pimcore.wysiwyg = {};
      parent.pimcore.wysiwyg.editors = [];
    }
    parent.pimcore.wysiwyg.editors.push("ckeditor");

    document.addEventListener(
      parent.pimcore.events.initializeWysiwyg,
      this.initializeWysiwyg.bind(this),
    );
    document.addEventListener(
      parent.pimcore.events.createWysiwyg,
      this.createWysiwyg.bind(this),
    );
    document.addEventListener(
      parent.pimcore.events.beforeDestroyWysiwyg,
      this.beforeDestroyWysiwyg.bind(this),
    );
  },

  initializeWysiwyg: function (e) {
    this.config = e.detail.config ?? {};
  },

  createWysiwyg: function (e) {
    const textareaId = e.detail.textarea.id ?? e.detail.textarea;
    const element = document.getElementById(textareaId);
    if (!element) return;

    const initialData = element.innerHTML;
    element.innerHTML = "";

    CKEDITOR.ClassicEditor.create(element, {
      licenseKey: "GPL",
      initialData: initialData,
      plugins: [
        CKEDITOR.Essentials,
        CKEDITOR.Paragraph,
        CKEDITOR.Bold,
        CKEDITOR.Italic,
        CKEDITOR.Underline,
        CKEDITOR.Strikethrough,
        CKEDITOR.Heading,
        CKEDITOR.Link,
        CKEDITOR.List,
        CKEDITOR.BlockQuote,
        CKEDITOR.Table,
        CKEDITOR.TableToolbar,
        CKEDITOR.Alignment,
        CKEDITOR.HorizontalLine,
        CKEDITOR.SourceEditing,
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
            attributes: { target: "_blank", rel: "noopener noreferrer" },
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
        this.editors.set(textareaId, editor);

        editor.model.document.on("change:data", () => {
          document.dispatchEvent(
            new CustomEvent(pimcore.events.changeWysiwyg, {
              detail: {
                e: { target: { id: textareaId } },
                data: editor.getData(),
                context: e.detail.context,
              },
            }),
          );
        });
      })
      .catch((error) => {
        console.error("CKEditor init error:", error);
      });
  },

  beforeDestroyWysiwyg: function (e) {
    const textareaId = e.detail.textarea.id ?? e.detail.textarea;
    const editor = this.editors.get(textareaId);
    if (editor) {
      editor.destroy();
      this.editors.delete(textareaId);
    }
  },
});

new pimcore.bundle.ckeditor.editor();

pimcore.registerNS("pimcore.plugin.pimckeditor");

pimcore.plugin.pimckeditor = Ext.extend(pimcore.plugin.admin, {
  getClassName: function () {
    return "pimcore.plugin.pimckeditor";
  },

  initialize: function () {
    pimcore.plugin.broker.registerPlugin(this);

    if (pimcore.wysiwyg) {
      pimcore.wysiwyg.registerProvider("ckeditor", {
        initializeWysiwyg: function (id, config) {
          // Hier wird die CKEditor5-Instanz auf dem Textarea-Feld gestartet
          if (typeof ClassicEditor !== "undefined") {
            ClassicEditor.create(document.getElementById(id), config).catch(
              (error) => {
                console.error(error);
              },
            );
          }
        },
      });

      pimcore.wysiwyg.defaultProvider = "ckeditor";
    }
  },
});

new pimcore.plugin.pimckeditor();

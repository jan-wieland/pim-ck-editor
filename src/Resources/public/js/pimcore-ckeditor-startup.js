pimcore.registerNS("pimcore.plugin.pimckeditor");

pimcore.plugin.pimckeditor = Ext.extend(pimcore.plugin.admin, {
  getClassName: function () {
    return "pimcore.plugin.pimckeditor";
  },

  initialize: function () {
    pimcore.plugin.broker.registerPlugin(this);

    // Das ist der entscheidende Fix für Pimcore 11:
    // Wir registrieren den CKEditor als WYSIWYG-Provider, damit
    // Pimcore weiß, wo es 'initializeWysiwyg' aufrufen kann!
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

      // Setze CKEditor als Standard, falls Quill aus ist
      pimcore.wysiwyg.defaultProvider = "ckeditor";
    }
  },
});

new pimcore.plugin.pimckeditor();

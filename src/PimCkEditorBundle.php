<?php

namespace JanWieland\PimCkEditorBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;

class PimCkEditorBundle extends AbstractPimcoreBundle
{
    public function getJsPaths(): array
    {
        return [
            '/bundles/pimckeditor/js/pimcore-ckeditor-startup.js',
        ];
    }

    public function getEditmodeJsPaths(): array
    {
        return [
            '/bundles/pimckeditor/js/ckeditor5.umd.js',
            '/bundles/pimckeditor/js/pimcore-ckeditor.js',
        ];
    }

    public function getEditmodeCssPaths(): array
    {
        return [
            '/bundles/pimckeditor/css/ckeditor5.css',
            '/bundles/pimckeditor/css/pimcore-ckeditor.css',
        ];
    }

    public function getNiceName(): string
    {
        return 'CKEditor 5 for Pimcore';
    }

    public function getDescription(): string
    {
        return 'Replaces Quill with CKEditor 5 including full link dialog with target, CSS classes and Pimcore page browser.';
    }
}

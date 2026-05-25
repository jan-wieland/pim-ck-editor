<?php
namespace JanWieland\PimCkEditorBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\PimcoreBundleAdminClassicInterface;
use Pimcore\Extension\Bundle\Traits\BundleAdminClassicTrait;

class PimCkEditorBundle extends AbstractPimcoreBundle implements
    PimcoreBundleAdminClassicInterface
{
    use BundleAdminClassicTrait;

    public function getPath(): string
    {
        return dirname(__DIR__);
    }

    public function getJsPaths(): array
    {
        return ["/bundles/pimckeditor/js/pimcore-ckeditor-startup.js"];
    }

    public function getEditmodeJsPaths(): array
    {
        return [
            "/bundles/pimckeditor/js/ckeditor5.umd.js",
            "/bundles/pimckeditor/js/pimcore-ckeditor.js",
        ];
    }

    public function getEditmodeCssPaths(): array
    {
        return [
            "/bundles/pimckeditor/css/ckeditor5.css",
            "/bundles/pimckeditor/css/pimcore-ckeditor.css",
        ];
    }
}

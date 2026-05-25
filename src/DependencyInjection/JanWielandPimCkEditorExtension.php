<?php

namespace JanWieland\PimCkEditorBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

class JanWielandPimCkEditorExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container): void
    {
        // Falls du eine services.yaml hast, wird sie hier geladen.
        // Wenn nicht, reicht diese leere Methode aus, damit Symfony
        // das Bundle voll als Service- und Asset-Bundle akzeptiert!
    }

    /**
     * Zwingt Symfony dazu, den korrekten Alias 'pim_ck_editor' zu nutzen
     */
    public function getAlias(): string
    {
        return "pim_ck_editor";
    }
}

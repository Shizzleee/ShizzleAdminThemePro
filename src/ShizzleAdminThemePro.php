<?php

declare(strict_types=1);

namespace Shizzle\ShizzleAdminThemePro;

use Shopware\Core\Framework\Plugin;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Config\Loader\DelegatingLoader;
use Symfony\Component\Config\Loader\LoaderResolver;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\PhpFileLoader;
use Symfony\Component\DependencyInjection\Loader\XmlFileLoader;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

/**
 * @psalm-suppress PropertyNotSetInConstructor
 */
final class ShizzleAdminThemePro extends Plugin
{
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);

        $this->registerContainerFile($container);
    }

    private function registerContainerFile(ContainerBuilder $container): void
    {
        $fileLocator = new FileLocator($this->getPath());
        $loaderResolver = new LoaderResolver([
            new XmlFileLoader($container, $fileLocator),
            new YamlFileLoader($container, $fileLocator),
            new PhpFileLoader($container, $fileLocator),
        ]);
        $delegatingLoader = new DelegatingLoader($loaderResolver);

        /** @var string $environment */
        $environment = $container->getParameter('kernel.environment');

        // Include environment specific config files
        $pattern = sprintf(
            '%1$s/Resources/config/packages/%2$s/*',
            $this->getPath(),
            $environment,
        );

        foreach (glob($pattern) as $path) {
            $delegatingLoader->load($path);
        }
    }
}

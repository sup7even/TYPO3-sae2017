<?php
defined('TYPO3_MODE') or die();

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    'theme',
    'Configuration/TSConfig/Page.tsc',
    'PageTSConfig der Theme Extension'
);

<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
	'Sae.' . $_EXTKEY,
	'Blog',
	array(
		'Blog' => 'list, show',
		
	),
	// non-cacheable actions
	array(
		'Blog' => '',
		
	)
);
## EXTENSION BUILDER DEFAULTS END TOKEN - Everything BEFORE this line is overwritten with the defaults of the extension builder
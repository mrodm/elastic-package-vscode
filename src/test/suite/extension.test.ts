import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { elasticPackageCommand } from '../../command';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Get elastic-package commands', () => {
		assert.strictEqual(elasticPackageCommand("test", true), "elastic-package -v test");
		assert.strictEqual(elasticPackageCommand("test", false), "elastic-package test");
		assert.strictEqual(elasticPackageCommand("test -a", true), "elastic-package -v test -a");
	});
});

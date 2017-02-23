/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 * ------------------------------------------------------------------------------------------
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var vscode_1 = require("vscode");
var vscode_languageclient_1 = require("vscode-languageclient");
function activate(context) {
    // The server is pulled in from npm, and can be found in our node_modules dir.
    var serverModule = context.asAbsolutePath(path.join('node_modules', 'polymer-editor-service', 'lib', 'polymer-language-server.js'));
    // The debug options for the server
    var debugOptions = { execArgv: ['--nolazy', '--debug=6004'] };
    // If the extension is launched in debug mode then the debug server options
    // are used.
    // Otherwise the run options are used.
    var serverOptions = {
        run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.stdio },
        debug: {
            module: serverModule,
            transport: vscode_languageclient_1.TransportKind.stdio,
            options: debugOptions
        }
    };
    // Options to control the language client
    var clientOptions = {
        // Register the server for the appropriate file types.
        documentSelector: ['html', 'javascript'],
        synchronize: {
            // Synchronize the setting section 'polymer-ide' to the server
            configurationSection: 'polymer-ide',
            // Notify the server about file changes to '.clientrc files contain in the
            // workspace
            fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc')
        }
    };
    // Create the language client and start the client.
    var disposable = new vscode_languageclient_1.LanguageClient('polymer-ide', serverOptions, clientOptions)
        .start();
    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map
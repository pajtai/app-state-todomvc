#!/usr/bin/env node

var childProcess    = require('child_process'),
    exec            = childProcess.execSync,
    chalk           = require('chalk'),
    _               = require('lodash'),
    children        = [],
    spawn           = childProcess.spawn;

process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill
process.on('exit', cleanExit);

runCommands([
    ['python -m SimpleHTTPServer', 'Starting static assets server', { async : true }],
    ['watchify app/index.js -dv -o bundle.js']
]);

function runCommands(commands) {
    commands.forEach(function(commandInfo) {
        var command = commandInfo[0],
            comment = commandInfo[1],
            options = commandInfo[2];

        comment && console.log(chalk.green('> '), comment);
        if (options && options.async) {
            execBg(command, options);
        } else {
            exec(command, { stdio: 'inherit' });
        }
    });
}

function execBg(command, options) {

    command = _.isArray(command) ? command : command.split(' ');
    var args = command.splice(1);
    console.log('bg command:', chalk.yellow(command[0], ' args:', args));
    var child;

    try {
        options = _.extend({ stdio : 'inherit' }, options);
        child = spawn(command[0], args, options);
        children.push(child);
    } catch(e) {
        console.log(chalk.red('error'), e);
    }
}

function cleanExit() {
    var count = 0;
    if (stopped) {
        return;
    }
    console.log();
    console.log(chalk.red('--- Exiting ---'));
    children.forEach(function(child) {
        console.log('Stopping', chalk.blue(++count));
        child.kill();
    });
    stopped = true;
    process.exit();
}
#! /usr/bin/env node

var express = require("express");
var app = express();
var path = require('path');
var multer = require("multer");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//Save application path into a global variable

global.Neptune_ROOT_DIR = __dirname;

//Create server
{
    global.server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Running the server on " + host + " " + port);
  });
}
global.server.timeout = 1000000000;

//View engine setup
{
  app.use(express.static(path.join(__dirname, 'public')));

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  var hbs = require('hbs');
  hbs.registerPartials(__dirname + '/views/partials');
}
//app.use(express.static(__dirname + '/public'));


//App usage
{

      app.use(logger('dev'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: false}));
      app.use(cookieParser());
      //app.use(express.static(path.join(__dirname + 'output')));
      app.use(express.static(path.join(__dirname, 'public')));

      app.use("/output", express.static(__dirname + "/output"));
}

//Error handlers
{

// development error handler
// will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

// production error handler
// no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

/**************** CONTROLLERS ****************/
{
    var viewsController = require('./controllers/views');
    var fileController = require('./controllers/fileupload');
    var writeController = require('./controllers/filewrite');
    var serialController = require('./controllers/serialcommunication');
    var workspaceController = require('./controllers/workspace');
    var compileMintController = require('./controllers/compileMint');
    var translateLFRController = require('./controllers/translateLFR');
}

/**************** RENDER PAGES ****************/
{
    // Bootstrap:
    app.get('/' , viewsController.openHomePage);
    app.get('/dashboard', viewsController.openDashboard);
    app.get('/specify', viewsController.openSpecifyPage);
    app.get('/design', viewsController.openDesignPage);
    app.get('/control', viewsController.openControllersPage);
    app.get('/controlFull', viewsController.openControlFullPage);
    app.get('/Build', viewsController.openBuildPage);
    app.get('/buildfull', viewsController.openNewBuildPage);
    app.get('/assembly', viewsController.openAssemblyPage);

    app.get('/fluigipage', viewsController.getFluigiPage);
    app.get('/uShroomPage', viewsController.openMMPage);
    app.get('/serialcommunication', serialController.openSerialPage);

    app.get('/lfrpage', viewsController.openLfrPage);
    app.get('/lfrpage_bs', viewsController.openLfr_bsPage);
}

/**************** SERIAL COMMUNICATION ****************/
{
    app.post('/serialcommunication/open', serialController.openSerialConnection);
    app.post('/serialcommunication/close', serialController.closeSerialConnection);
    app.post('/serialcommunication/send', serialController.arduinoSend);
    app.post('/serialcommunication/list', serialController.listPorts);
}

/************** FILE WRITE ********************/
{
    app.post('/api/writeToFile',writeController.writeToFile)
}

/**************** USHROOM MAPPER & FLUIGI ****************/
{
    app.post('/api/compileMint', compileMintController.compileMint);
    app.post('/api/translateLFR', translateLFRController.translateLFR);
}

/**************** WORKSPACE INITIATION AND MAINTAINENCE ****************/
{
    app.post('/api/clearFiles', workspaceController.clearFiles);
    app.post('/api/generateUCF', workspaceController.generateUCF);
    app.post('/api/getFile', workspaceController.getFile);
    app.post('/api/download', workspaceController.download);
    app.post('/api/parseDir', workspaceController.parseDir);
    app.post('/api/getProjects', workspaceController.getProjects);
    app.post('/api/makeProject', workspaceController.makeProject);
    app.post('/api/scanFiles', workspaceController.scanFiles);
    app.post('/api/findHome', workspaceController.findHome);
}








/**************** DEPRECATED CONTROLLERS ****************/
//var downloadController = require('./controllers/download');
//var zipController = require('./controllers/zipFiles');
//      app.post('/api/zipFiles',zipController.zipFiles);
//var fileGetter = require('./controllers/fileGetter');
//var ucfMaker = require('./controllers/generateUCF');
//var clearFilesController = require('./controllers/clearFiles');
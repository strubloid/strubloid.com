class Server {

    constructor() {

        if(process.env.NODE_ENV !== 'production'){
            require('dotenv'). config()
        }
        this.loadModules();
        this.setupFrontend();
        this.loadRouters();
        this.setupDatabase()
        this.app.listen(process.env.PORT || 3000)
    }

    loadModules() {

        this.express = require('express');
        this.favicon = require('express-favicon');
        this.app = this.express();
        this.path = require('path');
        this.bodyParser = require('body-parser');
        this.methodOverride = require('method-override');
        this.mongoose = require('mongoose');

    }

    loadRouters() {

        this.app.get('*', async (req, res, next) => {
            try {
                let locals = {};

                // this will set on the globals list of variables
                res.locals = locals;

                res.sendFile(this.path.join(__dirname, 'build', 'index.html'));

                // this will make continue to the other's routers
                // next();

            } catch (e) {
                console.log(e)
            }
        })

    }

    setupFrontend() {

        this.app.use(this.favicon(__dirname + '/build/favicon.ico'));
        this.app.use(this.express.static(__dirname));
        this.app.use(this.express.static(this.path.join(__dirname, 'build')));

        this.app.use(this.methodOverride('_method'));

        // setting objects to use with body-parser
        this.app.use(this.bodyParser.urlencoded({
            limit: '10mb',
            extended : false
        }));

        // parse requests of content-type - application/json
        this.app.use(this.bodyParser.json());
    }

    setupDatabase() {

        // loading the library for mongo-db + connection
        // this.mongoose.connect(process.env.DATABASE_URL, {
        //     useNewUrlParser : true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        // });
        // this.db = this.mongoose.connection;
        // this.db.on('error', error => console.error(error));
        // this.db.once('open', error => console.log('connected to mongoose database'));
    }
}

var server = new Server();
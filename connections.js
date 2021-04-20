const mongoose = require('mongoose');

function makeNewConnection(data) {
       mongoose.connect(data, {
        useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection

    db.on('error', function (error) {
        console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
    });

    db.on('connected', function () {
        mongoose.set('debug', function (col, method, query, doc) {
            console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
        });
        console.log(`MongoDB :: connected ${this.name}`);
    });

    db.on('disconnected', function () {
        console.log(`MongoDB :: disconnected ${this.name}`);
    });

    return db;
}

const listingConnection = makeNewConnection('mongodb://127.0.0.1:27017/Listing');
const blogConnection = makeNewConnection('mongodb://127.0.0.1:27017/Blog');

module.exports = {
    listingConnection,
    blogConnection,
};
const mongoose = require('mongoose');

async function test() {
    await mongoose.connect('mongodb://buidinhtuan04:tuan1234@ac-seqq0bu-shard-00-00.xhbwb9r.mongodb.net:27017,ac-seqq0bu-shard-00-01.xhbwb9r.mongodb.net:27017,ac-seqq0bu-shard-00-02.xhbwb9r.mongodb.net:27017/?ssl=true&replicaSet=atlas-g9qhl0-shard-0&authSource=admin&appName=Cluster0');
    const db = mongoose.connection.db;
    const cart = await db.collection('carts').findOne({ "items.0": { $exists: true } });
    if (!cart) { console.log("No carts with items!"); process.exit(1); }
    const user = await db.collection('users').findOne({ _id: cart.user });
    console.log("Found user with cart:", user.email);
    process.exit(0);
}
test();

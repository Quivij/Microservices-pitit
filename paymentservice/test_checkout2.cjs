const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fs = require('fs');

async function test() {
    await mongoose.connect('mongodb://buidinhtuan04:tuan1234@ac-seqq0bu-shard-00-00.xhbwb9r.mongodb.net:27017,ac-seqq0bu-shard-00-01.xhbwb9r.mongodb.net:27017,ac-seqq0bu-shard-00-02.xhbwb9r.mongodb.net:27017/?ssl=true&replicaSet=atlas-g9qhl0-shard-0&authSource=admin&appName=Cluster0');
    console.log("Connected to DB");
    
    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({ email: 'buidinhtuan04@gmail.com' });
    if (!user) { console.log('User not found'); process.exit(1); }
    
    const cart = await db.collection('carts').findOne({ user: user._id });
    if (!cart) { console.log('Cart not found'); process.exit(1); }
    
    const token = jwt.sign({ userId: user._id, role: user.role, email: user.email }, 'your_jwt_secret', { expiresIn: '7d' });
    
    const payload = {
        items: [cart.items[0].product.toString()],
        usedXu: 0,
        deliveryAddressId: user._id, // mock address id
        type: 'cod'
    };
    
    try {
        const res = await fetch('http://localhost:6974/v1/api/payment/create-qr', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        console.log("STATUS:", res.status);
        console.log("SUCCESS:", data);
    } catch(err) {
        console.log("ERROR:", err.toString());
    }
    
    if (fs.existsSync('./src/controllers/createqr_error.txt')) {
        console.log("CREATE_QR_ERROR:\n" + fs.readFileSync('./src/controllers/createqr_error.txt', 'utf8'));
    } else {
        console.log("No error file found.");
    }
    process.exit(0);
}
test();

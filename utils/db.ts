import mongoose from 'mongoose';

// isConnected
// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting
let isConnected = 0;

const connect = async () => {
    try {
        if (isConnected === 1) {
            console.log('Already Connected to Database');
            return;
        }

        if (mongoose.connections.length > 0) {
            isConnected = mongoose.connections[0].readyState;
            if (isConnected === 1) {
                console.log('Use Previous Connection');
                return;
            }
        }

        // create new connection to database
        const db = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connect Database Successfully');
        isConnected = mongoose.connections[0].readyState;
    } catch (error) {
        console.log('Connect to Database Error');
        console.log(error);
        process.exit(1);
    }
};

const db = { connect };
export default db;

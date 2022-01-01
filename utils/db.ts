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
            await mongoose.disconnect();
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

const disconnect = async () => {
    try {
        if (isConnected === 1) {
            if (process.env.NODE_ENV === 'production') {
                await mongoose.disconnect();
                isConnected = 0;
            } else {
                console.log('Development - Not Disconnected Database');
            }
        }
    } catch (error) {
        console.log('Disconnect Error');
        console.log(error);
        process.exit(1);
    }
};

const db = { connect, disconnect };
export default db;

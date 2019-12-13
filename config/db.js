import mongoose from 'mongoose';
import config from 'config';

// Get the connection string
const db = config.get('mongoURL');

//Connect to MongoDB
const connectDatabase = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        //console.log('error here');
        console.error(error.message);

        //Exit with falure code
        process.exit(1);
    }
};

export default connectDatabase;
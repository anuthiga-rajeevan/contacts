// @ts-nocheck
import mongoose from 'mongoose';
import colors from 'colors';
colors.enable();

export const connectDb = async () => {
  const dbName = process.env.MONGO_DB || 'contacts';
  const url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/contacts';
  const conn = await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host} - ${dbName}`.cyan.underline.bold);
};

export const connectTestDb = async () => {
  const dbName = process.env.TEST_DB || 'contacts-test';
  const url = `mongodb://127.0.0.1:27017/${dbName}`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

export const closeDbConnection = async () => {
  await mongoose.connection.close();
};

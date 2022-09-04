import { closeDbConnection, connectTestDb } from '../db';
import Contact from '../models/contact.model';
import User from '../models/user.model';

const globalTearDown = async () => {
  try {
    await connectTestDb();
    await User.deleteMany();
    await Contact.deleteMany();
    await closeDbConnection();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default globalTearDown;

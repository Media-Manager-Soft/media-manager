import { User } from "../Entities/User";


export class BackupService {
  public async hi() {


    const user = new User();
    user.first_name = "Timber";
    await user.save();

    const allUsers = await User.find();
    const firstUser = await User.findOne(1);
    const timber = await User.findOne({ first_name: "Timber"});






  }
}

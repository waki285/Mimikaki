import { database } from '@/manager';
import type { User } from '@/models/users';
import { botAdministrators } from '@/helper';

class UserManager {
  public async createUserData(userId: string): Promise<void> {
    await database.users.create({
      userId: userId,
    });
  }

  public async getUserData(userId: string): Promise<User> {
    let user = await database.users.findOne({ userId: userId });

    if (!user) {
      await this.createUserData(userId);
      user = await database.users.findOne({ userId: userId });
    }
    if (!user) throw new Error('Failed to create user data');

    return user;
  }

  public async updateUserData(
    userId: string,
    data: Partial<User>
  ): Promise<void> {
    await this.getUserData(userId);

    await database.users.updateOne({ userId: userId }, { $set: data });
  }

  public checkIsBotAdmin(userId: string): boolean {
    return botAdministrators.includes(userId);
  }
}

export const userManager = new UserManager();
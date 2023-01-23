import Users from "@/models/users";

class DatabaseManager {
  public users = Users;
}

export const database = new DatabaseManager();

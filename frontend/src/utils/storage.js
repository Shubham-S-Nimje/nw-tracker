const LocalStorageRepository = {
  /********************* Get an item from localStorage by key *********************/
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error getting localStorage item ${key}`);
      return null;
    }
  },

  /********************* Set an item in localStorage by key *********************/
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage item ${key}`);
    }
  },

  /********************* Delete an item from localStorage by key *********************/

  delete: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting localStorage item ${key}`);
    }
  },
};

export const storeUserInfo = (user, token) => {
  // console.log(user, access, refresh);
  LocalStorageRepository.set("user", user);
  LocalStorageRepository.set("access_token", token);
};

export const deleteUserInfo = () => {
  LocalStorageRepository.delete("user");
  LocalStorageRepository.delete("access_token");
};

export default LocalStorageRepository;

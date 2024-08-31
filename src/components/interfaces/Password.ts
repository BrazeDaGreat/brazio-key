interface Password {
  id: string;
  owner: string;
  email: string;
  username: string;
  website: string;
  password: string;
  pinned: boolean;
  updated: string;
  created: string;
  collectionId: string;
  collectionName: string;
}

export default Password;

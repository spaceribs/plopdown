export interface Permission {
  name: string;
  test_url: string | null;
  match: string;
}

export interface SavedPermission extends Permission {
  _id: string;
  _rev: string;
}

export class LocalStorageManager {
  /**
     * Return a string representing authentication token from localstorage, OR '' if missing
     */
  public GetToken(): string {
    let token: string = localStorage.getItem('token') || '';
    return token;
  }

  /**
   * Clear local storage token
   * */
  public ClearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
  }

  /**
   * set token to local storage
   * @param token
   */
  public SetToken(token: string) {
    localStorage.setItem('token', token);
  }

  public SetRoles(roles: string) {
    localStorage.removeItem('roles');
    if (roles)
      localStorage.setItem('roles', JSON.stringify(roles));
  }

  public GetRoles() : string[] {
    let roles = localStorage.getItem('roles');
    if (roles)
      return JSON.parse(roles);
    else
      return [];
  }
}

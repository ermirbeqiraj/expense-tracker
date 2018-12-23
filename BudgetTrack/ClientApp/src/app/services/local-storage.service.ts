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
  }

  /**
   * set token to local storage
   * @param token
   */
  public SetToken(token: string) {
    localStorage.setItem('token', token);
  }
}

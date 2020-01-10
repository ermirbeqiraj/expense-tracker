"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorageManager = /** @class */ (function () {
    function LocalStorageManager() {
    }
    /**
       * Return a string representing authentication token from localstorage, OR '' if missing
       */
    LocalStorageManager.prototype.GetToken = function () {
        var token = localStorage.getItem('token') || '';
        return token;
    };
    /**
     * Clear local storage token
     * */
    LocalStorageManager.prototype.ClearAuth = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
    };
    /**
     * set token to local storage
     * @param token
     */
    LocalStorageManager.prototype.SetToken = function (token) {
        localStorage.setItem('token', token);
    };
    LocalStorageManager.prototype.SetRoles = function (roles) {
        localStorage.removeItem('roles');
        if (roles)
            localStorage.setItem('roles', JSON.stringify(roles));
    };
    LocalStorageManager.prototype.GetRoles = function () {
        var roles = localStorage.getItem('roles');
        if (roles)
            return JSON.parse(roles);
        else
            return [];
    };
    return LocalStorageManager;
}());
exports.LocalStorageManager = LocalStorageManager;
//# sourceMappingURL=local-storage.service.js.map
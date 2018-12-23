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
    };
    /**
     * set token to local storage
     * @param token
     */
    LocalStorageManager.prototype.SetToken = function (token) {
        localStorage.setItem('token', token);
    };
    return LocalStorageManager;
}());
exports.LocalStorageManager = LocalStorageManager;
//# sourceMappingURL=local-storage.service.js.map
var sessionExpiration = (function () {

    var differenceMinutesToStartWarning = 2,
    expirationMinutes = 3,
    sessionExpiringCallback,
    sessionOkCallback,
    sessionTimeout,
    cookieName = '.session-expiration';

    return {
        init: function (data) {

            if (data === undefined) {
                throw 'parameters are required.';
            }

            if (data.expires !== undefined) {
                expirationMinutes = data.expires;
            }

            if (data.startWarning !== undefined) {
                differenceMinutesToStartWarning = data.startWarning;
            }

            if (data.sessionExpiring === undefined) {
                throw 'sessionExpiring is required';
            }
            sessionExpiringCallback = data.sessionExpiring;

            if (data.sessionOk === undefined) {
                sessionOkCallback = function () { }
            }
            sessionOkCallback = data.sessionOk;

            if (data.sessionTimeout === undefined) {
                throw 'sessionTimeout is required.';
            }
            sessionTimeout = data.sessionTimeout;

            setConfigs();
            configBind();

            var startWarningTime, oldExpirationTime, expirationTime = new Date();
            var sessionCheckIntervalId = setInterval(function () {
                oldExpirationTime = expirationTime;

                startWarningTime = getStartingWarningTime();
                expirationTime = getTimeoutTime();

                var now = new Date();
                if (now >= startWarningTime) {
                    var remainingTime = expirationTime.getTime() - now.getTime();
                    if (remainingTime <= 0) {
                        sessionTimeout();
                        clearInterval(sessionCheckIntervalId);
                    } else {
                        sessionExpiringCallback(parseInt(remainingTime / 1000));
                    }
                } else {
                    if ((oldExpirationTime.getTime() - expirationTime.getTime()) !== 0) {
                        sessionOkCallback();
                    }
                }
            }, 1000);
        }
    };

    function setConfigs() {
        var expireDate = new Date(new Date().getTime() + (expirationMinutes * 60000));
        var values = new Date(new Date().getTime() + ((expirationMinutes - differenceMinutesToStartWarning) * 60000)).getTime();
        values += ':';
        values += expireDate.getTime();
        setCookie(cookieName, values, 1);
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        var ms = d.getTime() + (exdays * 24 * 60 * 60 * 1000)
        d = new Date(ms);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";path=/";
    }

    function getMilliseconds(index) {
        var cookieValue = getCookie(cookieName);
        return parseInt(cookieValue.split(':')[index]);
    }

    function getStartingWarningTime() {
        return new Date(getMilliseconds(0));
    }

    function getTimeoutTime() {
        return new Date(getMilliseconds(1));
    }

    function configBind() {
        $(document).ajaxSend(function () {
            setConfigs();
        });
    }
})();

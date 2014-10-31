SessionExpirationScript
=======================

Script to alert the user if the session is going to expires

 - Supports IE7
 - Cookie based
 - Supports ajax and multi tabs
  
 
How to use:
---

Reference the script
```HTML
<script src="~/Scripts/jquery.js"></script>
<script src="~/Scripts/session-expiration.js"></script>
```

Then initialize the processes:
```JavaScript
sessionExpiration.Init({
    expires: 5, //Time in minutes to session expires
    startWarning: 2, //Time in minutes to start calling the alert before the session expires (in this case, 3 minutes after script loads (5-2))
    sessionExpiring: function (time) {
        $('body').html('Session remaining: ' + time + ' seconds');
    },
    sessionOk: function () {
        $('body').html('');
    },
    sessionTimeout: function () {
        alert("Your session was timed out");
        location.href = 'http://www.contoso.com/login';
    }
});
```

Version
----

1.1

What's new
---
 - 'sessionOk' will be called only when session timeout is refreshed
 - fixed the bug with cookies path

License
----

MIT

rt.bortolin@gmail.com

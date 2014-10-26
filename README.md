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
<script src="~/Scripts/session-expiration.js"></script>
```

Then initialize the processes:
```JavaScript
sessionExpiration.Init({
    expires: 5, //Time in minutes to session expires
    startWarning: 2, //Time in minutes to start calling the alert (in this case, 3 minutes after script load (5-2))
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

1.0


License
----

MIT

rt.bortolin@gmail.com

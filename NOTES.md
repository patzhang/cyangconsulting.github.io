Notes for Developing WDC
========================

## Play with the Tableau WDC examples ##

[Get the WDC SDK](http://tableau.github.io/webdataconnector/docs/#get-the-wdc-sdk)

[WDC Tutorial](http://tableau.github.io/webdataconnector/docs/wdc_tutorial)

## Authentication ##

[Basic Authentication with username and password](https://learn.mdsol.com/api/rws/about-rave-web-services-authentication-methods-95587260.html#AboutRaveWebServicesAuthenticationMethods-BasicHTTPAuthentication)
https://stackoverflow.com/questions/5507234/use-basic-authentication-with-jquery-and-ajax
```javascript
// added to jquery.ajax()
beforeSend: function setHeader(xhr) {
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
}
```
https://coderseye.com/2007/how-to-do-http-basic-auth-in-ajax.html

## Cross Origin Resource Sharing ##

[CORS](http://tableau.github.io/webdataconnector/docs/wdc_cors)
[Understand CORS](https://zinoui.com/blog/cross-domain-ajax-request)
[CORS video](https://youtu.be/HgdAwvt2vSs?t=533)
solution: proxy
https://github.com/Rob--W/cors-anywhere

## Convert csv to json ##

[papa parse: convert CSV to JSON](https://www.papaparse.com/)

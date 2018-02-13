export default {
  name: 'EverCookieMixin',
  data: function () {
    return {
      everCookie: ''
    }
  },
  created: function () {
    this.checkFpCookie()
  },
  methods: {
    checkFpCookie () {
      const everCookieOptions = {
        history: true, // CSS history knocking or not .. can be network intensive
        java: true, // Java applet on/off... may prompt users for permission to run.
        tests: 10, // 1000 what is it, actually?
        silverlight: false, // you might want to turn it off https://github.com/samyk/evercookie/issues/45,
        lso: true, // local storage
        domain: '.' + window.location.host.replace(/:\d+/, ''), // Get current domain
        baseurl: '', // base url for php, flash and silverlight assets
        asseturi: '/assets', // assets = .fla, .jar, etc
        phpuri: '/php', // php file path or route
        authPath: false, // '/evercookie_auth.php', // set to false to disable Basic Authentication cache
        swfFileName: '/evercookie.swf',
        xapFileName: '/evercookie.xap',
        jnlpFileName: '/evercookie.jnlp',
        pngCookieName: 'evercookie_png',
        pngPath: '/evercookie_png.php',
        etagCookieName: 'evercookie_etag',
        etagPath: '/evercookie_etag.php',
        cacheCookieName: 'evercookie_cache',
        cachePath: '/evercookie_cache.php',
        hsts: false,
        hsts_domains: [],
        db: true, // Database
        idb: true // Indexed DB
      }
      let ec = new window.Evercookie(everCookieOptions)
      let valueAvailable = false
      try {
        ec.get('ec_3', (value) => {
          if (value !== '' && value !== undefined && value !== null) {
            if (value.indexOf('html') === -1) {
              const subValues = value.split('|')
              if (subValues[0] === 'flag') {
                valueAvailable = true
              }
            }
          }
        })
      } catch (err) {
        console.log(err)
      }
      if (!valueAvailable) {
        ec.set('ec_3', 'flag|ever_cookie_value')
      }
    }
  }
}

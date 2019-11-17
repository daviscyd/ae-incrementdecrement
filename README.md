# ae-incrementdecrement
Increment/Decrement ExtendScript counter for After Effects.  This is very much a work-in-progress.

## dependencies
* es5-shim.jsx (from the excellent [BenZed after-effects repo](https://github.com/BenZed/after-effects)
This script uses the array.forEach() method, which is available in ES5 but for whatever reason the After Effects scripting engine is based on ES3 from 1999 (!).  See [this link](https://helpx.adobe.com/after-effects/using/legacy-and-extend-script-engine.html) if you're interested in a detailed explanation/justification.

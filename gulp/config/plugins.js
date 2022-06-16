import replace from "gulp-replace"; //Find and replace
import plumber from "gulp-plumber"; //Error processing
import notify from "gulp-notify"; //Notifications
import browsersync from "browser-sync";
import newer from "gulp-newer"; //Checks if images is really updated
import ifPlugin from "gulp-if";

// Export obj
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    ifPlugin: ifPlugin,
}
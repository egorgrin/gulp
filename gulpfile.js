//  Main module
import gulp from 'gulp';

//  Path import
import { path } from './gulp/config/path.js';

// Common plugins import
import { plugins } from './gulp/config/plugins.js';

// Creating global obj with values

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev:!process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
};

//  Tasks import
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTff, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { sprite } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

// Change watcher
function watcher() {
    gulp.watch(path.watch.files, copy);
    // gulp.watch(path.watch.html, gulp.series(html, ftp));
    gulp.watch(path.watch.html, html);
    // gulp.watch(path.watch.scss, gulp.series(scss, ftp));
    gulp.watch(path.watch.scss, scss);
    // gulp.watch(path.watch.js, gulp.series(js, ftp));
    gulp.watch(path.watch.js, js);
    // gulp.watch(path.watch.images, gulp.series(images, ftp));
    gulp.watch(path.watch.images, images);
}

export { sprite }

const fonts = gulp.series(otfToTff, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(
    fonts,
    gulp.parallel(copy, html, scss, js, images)
);

// Creating task runner scenario
const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFtp = gulp.series(reset, mainTasks, ftp);

//Scenario export
export {dev};
export {build};
export {deployZip};
export {deployFtp};

// Default scenario
gulp.task('default', dev);

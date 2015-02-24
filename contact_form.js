/**
 * Fidelity - A site theme for Fidelity UK
 *
 * @author Alex Curtis <alex.curtis@madebypavilion.com>
 * @copyright 2015 Made By Pavilion Ltd.
 */

function Fidelity(){}

/**
 * Called when the application is being installed for the first time.
 *
 * @param cb A callback that must be called upon completion.  cb(err, result).
 * The result is ignored
 */
Fidelity.onInstall = function(cb) {
    cb(null, true);
};

/**
 * Called when the application is uninstalling this plugin.  The plugin should
 * make every effort to clean up any plugin-specific DB items or any in function
 * overrides it makes.
 *
 * @param cb A callback that must be called upon completion.  cb(err, result).
 * The result is ignored
 */
Fidelity.onUninstall = function(cb) {
    cb(null, true);
};

/**
 * Called when the application is starting up. The function is also called at
 * the end of a successful install. It is guaranteed that all core PB services
 * will be available including access to the core DB.
 *
 * @param cb A callback that must be called upon completion.  cb(err, result).
 * The result is ignored
 */
Fidelity.onStartup = function(cb) {
    pb.TemplateService.registerGlobal('contact_form_css', function(flag, cb) {
        pb.plugins.getSetting('css', 'contactform-pencilblue', function(err, css) {
            cb(err, css);
        });
    });
    pb.TemplateService.registerGlobal('contact_form_phone', function(flag, cb) {
        pb.plugins.getSetting('show_phone', 'contactform-pencilblue', function(err, showPhone) {
            cb(err, !showPhone ? 'display: none' : '');
        });
    });
    cb(null, true);
};

/**
 * Called when the application is gracefully shutting down.  No guarantees are
 * provided for how much time will be provided the plugin to shut down.
 *
 * @param cb A callback that must be called upon completion.  cb(err, result).
 * The result is ignored
 */
Fidelity.onShutdown = function(cb) {
    cb(null, true);
};

//exports
module.exports = Fidelity;

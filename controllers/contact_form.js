var sanitizeHtml = require('sanitize-html');

function ContactForm(){}

util.inherits(ContactForm, pb.BaseController);

ContactForm.prototype.send = function(callback){
    var self = this;
    this.getJSONPostParams(function(err, post){
        var valid = self.validate(post);
        if(!valid){
            var err = self._getError(post, 'CF_API_VALIDATION');
            return callback(err);
        }
        var sanitized = self.sanitize(post);
        self.sendEmail(sanitized, function(error){
            if(!error) { return callback(self._getSuccess(sanitized, 'CF_API_SENT')); }
            var err = self._getError(sanitized, 'CF_API_ERROR');
            return callback(err);
        });
    });
};

ContactForm.prototype.validate = function(data){
    return data.name !== undefined 
    && data.email !== undefined
    && data.subject !== undefined
    && data.message !== undefined; 
};

ContactForm.prototype.sanitize = function(data){
    var options = {
        allowedTags: false,
        allowedAttributes: false
    };
    return {
        name:       sanitizeHtml(data.name, options),
        phone:      sanitizeHtml(data.phone, options),
        email:      sanitizeHtml(data.email, options),
        subject:    sanitizeHtml(data.subject, options),
        message:    sanitizeHtml(data.message, options),
    };
};

ContactForm.prototype._getError = function(data, message){
    var loc = this.ls.get(message);
    var err = pb.BaseController.apiResponse(pb.BaseController.API_FAILURE, loc, data);
    return { code: 500, content: err };
};

ContactForm.prototype._getSuccess = function(data, message){
    var loc = this.ls.get(message);
    var message = pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, loc, data);
    return { content: message };
};

ContactForm.prototype.sendEmail = function(data, callback){
    var emailService = new pb.EmailService();
    this.getSettings(function(err, settings){
        if(err) { return callback(err); }
        var options = {
            from:           data.email,
            to:             settings.to,
            subject:        data.subject,
            replacements:   data,
            template:       settings.template
        };
        emailService.sendFromTemplate(options, callback);
    });
};

ContactForm.prototype.getSettings = function(callback){
    async.parallel({
        to: function(cb){
            pb.plugins.getSetting('email_to', 'contact_form', cb);
        },
        template: function(cb){
            pb.plugins.getSetting('email_template', 'contact_form', cb);
        },
    }, callback);
};

ContactForm.getRoutes = function(cb) {
    var routes = [
        {
            method:         'post',
            path:           '/contact/send',
            handler:        'send',
            auth_required:  false,
            content_type:   'application/json'
        }
    ];
    cb(null, routes);
};

//exports
module.exports = ContactForm;

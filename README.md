Contact Form for PencilBlue
=====

##### Display a contact form on your PencilBlue site

Installation and Setup
-----

1. Clone the contactform-pencilblue repository into the plugins folder of your PencilBlue installation.
    ```shell
    cd [pencilblue_directory]/plugins
    git clone https://github.com/alexcurtis/contactform-pencilblue.git
    ```

2. Install the contactform-pencilblue plugin through the manage plugins screen in the admin section. (/admin/plugins)

3. Go to the contactform-pencilblue settings screen and setup the following options: (/admin/plugins/contactform-pencilblue/settings)

    Setting         | Description               | Default                                        
    ----------------|---------------------------|------------------------------------------
    Css             | CSS File Path             | /public/contact_form/css/contact_form.css     
    Show phone      | Show Optional Phone Field | true                                          
    Email to        | Destination Email Address | user@pencilblue.org                           
    Email template  | HTML Email Template       | email/default                                 

4. Add the `^tmp_contact_form^` directive to any HTML template and the contact form will now be automatically loaded.

5. If not already done so, make sure the PencilBlue email system is setup correctly (/admin/site_settings/email).
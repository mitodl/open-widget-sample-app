# open-widget-sample-app

A sample app to demonstrate, develop and test the open widget framework.

To run the app, pip install the open-widget-framework django app:

  pip install local/path/to/open_widget_framework

or once the module is published:

  pip install open_widget_framework
  
Then install the node module. To do do locally, run npm link in the open-widget-framework repo and then in the sample-app repo run
  
  npm link open-widget-framework
  
or once the module is published:

  npm install open-widget-framework
  

Install other dependencies with pip-compile -> pip-sync and npm install
Compile the js with

  npm run build
  
and then collect the static files with

  python manage.py collectstatic
  
Finally run the server with 

  python manage.py runserver
  

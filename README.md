# open-widget-sample-app

A sample app to demonstrate, develop and test the open widget framework (https://github.com/mitodl/open-widget-framework).

## Installation
pip install the `open_widget_framework` django package:
```bash
pip install open_widget_framework
```  

npm install the `open-widget-framework` npm module: 
```bash
npm install open-widget-framework
```  

Install other dependencies with `pip-compile` -> `pip-sync` and `npm install`

Compile the js with:
```bash
npm run build
```  

and then collect the static files with
```bash
python manage.py collectstatic
```

## Running Locally
To run application locally, use:
```bash
python manage.py runserver
```

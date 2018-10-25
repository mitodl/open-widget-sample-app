# open-widget-sample-app

A sample app to demonstrate, develop and test the open widget framework.

## Installation
pip install the `open_widget_framework` django package (https://github.com/mitodl/open-widget-sample-app):
```bash
pip install open_widget_framework
```  

npm install the `open-widget-framework` npm module (https://github.com/mitodl/open-widget-sample-app). 
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

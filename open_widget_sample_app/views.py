from django.shortcuts import render


def index(request):
    """
    Renders the home page which enables the single page sample react app
    """
    return render(request, 'open_widget_sample_app/index.html')

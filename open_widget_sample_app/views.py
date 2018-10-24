
from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def index(request):
    """
    Renders the home page which enables the single page sample react app
    """
    context = {
        'site_url': settings.SITE_BASE_URL
    }

    return render(request, 'open_widget_sample_app/index.html', context=context)

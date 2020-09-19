from django.urls import path

from predictor import views
from .views import current_user, UserList

urlpatterns = [
    path('current_user/predict/', views.call_model.as_view()),
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
]
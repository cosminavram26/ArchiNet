import os
from django.shortcuts import render
import tensorflow as tf
import pandas as pd
import matplotlib
from rest_framework import permissions

from ArchiNet import settings
from core.serializers import UserSerializer, UserSerializerWithToken
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from tensorflow import keras
from .apps import PredictorConfig
from django.http import JsonResponse
import json
import base64
from rest_framework.views import APIView
path = os.path.join(settings.STATIC_ROOT)

class call_model(APIView):

    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        if request.method == 'GET':
            #get current user
            serializer = UserSerializer(request.user)

            #get stories
            stories = request.GET.get('stories')

            #get architecture
            architecture = request.GET.get('architecture')

            #predict image
            prediction = predict_image(serializer.data)

            #build response
            response_andrei = {
                'email' : 'cosmin@gmail.com',
                'img' :  "image_generated"+list(serializer.data.values())[0]+".png",
            }
            response_andrei.update(serializer.data)

            response = []
            response.append(response_andrei)
            #return response
            return JsonResponse(response, safe=False)

def predict_image(name):
    input_data = tf.random.normal([1, 4096])
    photos = []
    plt.figure(figsize=(15, 15))
    title = ['Input Image', 'Predicted Image']
    prediction_DCGAN = PredictorConfig.DCGAN_model(input_data, training=False)
    prediction_ArchiNet = PredictorConfig.PIX2PIX_model(prediction_DCGAN, training=True)
    display_list = [prediction_DCGAN[0], prediction_ArchiNet[0]]
    for i in range(2):
        plt.subplot(1, 2, i + 1)
        plt.title(title[i])
        # Getting the pixel values between [0,1] to plot it
        plt.imshow(display_list[i] * 0.5 + 0.5)
        photos.append(display_list[i])
        plt.axis('off')
        plt.savefig('./static/image_generated'+list(name.values())[0]+'.png')
    plt.show()
    return PredictorConfig.PIX2PIX_model

def index(request):
    temp = {}
    temp['stories'] = 0
    temp['architecture'] = 0
    context = {'temp':temp}
    return render(request, 'index.html',context)

def predictArchiNet(request):
    print(request)
    if request.method == 'POST':
        temp={}
        temp['stories'] = request.POST.get('storiesVal')
        temp['architecture'] = request.POST.get('architectureVal')
    testData=pd.DataFrame({'x':temp}).transpose()
    predict_image()
    return render(request, 'index.html')

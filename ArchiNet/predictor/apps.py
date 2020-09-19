import os

from django.apps import AppConfig
from django.conf import settings
from tensorflow import keras

class PredictorConfig(AppConfig):
    name = 'predictor'

    #create path to model
    path = os.path.join(settings.MODELS)

    #load model
    PIX2PIX_model = keras.models.load_model(path + '/generatorArchiNetMaps', compile=False)
    DCGAN_model = keras.models.load_model(path + '/generatorDCGANMaps', compile=False)
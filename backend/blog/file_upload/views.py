from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.serializers import Serializer, CharField, ImageField
from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated


class FileUploadView(GenericAPIView):
    http_method_names = ['post']
    parser_classes = [MultiPartParser]

    class InputSerializer(Serializer):
        image = ImageField(allow_empty_file=False, required=True)
        title = CharField(required=True)
        description = CharField(required=True)

    def post(self, request):
        input_serializer = FileUploadView.InputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)

        uploaded_image = input_serializer.validated_data['image']

        fs = FileSystemStorage()
        saved_image = fs.save(uploaded_image.name, uploaded_image)
        image_url = fs.url(saved_image)

        return Response(
            status=status.HTTP_200_OK,
            data={
                'title': input_serializer.validated_data['title'],
                'description': input_serializer.validated_data['description'],
                'image_url': image_url
            }
        )

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class TestView(GenericAPIView):
    http_method_names = ["get"]
    permission_classes = [IsAuthenticated]

    def get(self, _):
        return Response(
            status=status.HTTP_200_OK, data="Success. You will be a great developer"
        )

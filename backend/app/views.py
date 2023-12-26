from django.shortcuts import render
from django.contrib.auth import get_user_model
from .models import Property, Booking
from .serializers import PropertySerializer, BookingSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from rest_framework import views

# Create your views here.
class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    
    def perform_create(self, serializer):
        serializer.save(host=self.request.user)
        
class PropertyRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    
class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return Booking.objects.filter(guest=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(host=self.request.user)
        
class BookingRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return Booking.objects.filter(guest=self.request.user)
    
class UserDetailsView(views.APIView):
    def get(self, request, token):
        user = get_user_model().objects.get(auth_token=token)
        return Response({
            'username': user.username,
            'is_host': user.is_host
        })

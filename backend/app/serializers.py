from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import User, Property, Room, Booking, RoomBooking, Review, Photo, PropertyType, Amenity, AmenityType


class CustomRegisterSerializer(RegisterSerializer):
    is_host = serializers.BooleanField(required=False)
    
    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'is_host': self.validated_data.get('is_host', ''),
        }
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'is_host',)


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'


class RoomBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomBooking
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'


class PropertyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyType
        fields = '__all__'


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = '__all__'


class AmenityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmenityType
        fields = '__all__'


class PropertySerializer(serializers.ModelSerializer):
    host = UserSerializer(read_only=True)
    photos = PhotoSerializer(many=True)
    rooms = RoomSerializer(many=True)
    amenities = AmenityTypeSerializer(many=True)
    property_type = PropertyTypeSerializer()
    
    class Meta:
        model = Property
        fields = '__all__'
        depth = 1
        
    def create(self, validated_data):
        photos_data = validated_data.pop('photos')
        rooms_data = validated_data.pop('rooms')
        amenities_data = validated_data.pop('amenities')
        property_type = validated_data.pop('property_type')
        
        property = Property.objects.create(**validated_data)
        for photo_data in photos_data:
            photo = Photo.objects.create(property=property, **photo_data)
            property.photos.add(photo)
        
        for room_data in rooms_data:
            room = Room.objects.create(property=property, **room_data)
            property.rooms.add(room)
        
        for amenity_name in amenities_data:
            amenity = AmenityType.objects.get(name=amenity_name['name'])
            property.amenities.add(amenity)
            
        property_type = PropertyType.objects.create(**property_type)
        property.property_type = property_type
        property.save()
        return property

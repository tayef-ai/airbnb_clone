from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    is_host = models.BooleanField(default=False)
    
# This model is used to store different types of amenities
class AmenityType(models.Model):
    name = models.CharField(max_length=100)

# This model is used to store different types of properties
class PropertyType(models.Model):
    name = models.CharField(max_length=100)

# This model is used to store information about rooms within properties
class Room(models.Model):
    name = models.CharField(max_length=200)
    capacity = models.PositiveSmallIntegerField()

# This model is used to store detailed information about a property
class Property(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    location = models.CharField(max_length=200)
    available_start = models.DateField()
    available_end = models.DateField()
    photos = models.ManyToManyField('Photo')
    property_type = models.ForeignKey(PropertyType, on_delete=models.SET_NULL, null=True)
    rooms = models.ManyToManyField(Room)
    amenities = models.ManyToManyField(AmenityType, through='Amenity')

# This model is used to link amenities to properties
class Amenity(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='property_amenities')
    amenity_type = models.ForeignKey(AmenityType, on_delete=models.CASCADE, default=None, related_name='amenity_type')

# This model is used to store booking information made by guests
class Booking(models.Model):
    guest = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    rooms = models.ManyToManyField(Room, through='RoomBooking')

# This model is used to store details of room bookings within a general booking
class RoomBooking(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    adults = models.PositiveSmallIntegerField()
    children = models.PositiveSmallIntegerField()

# This model is used to store reviews made by users for properties
class Review(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.PositiveSmallIntegerField()

# This model is used to store information about photos related to properties
class Photo(models.Model):
    url = models.URLField()
    alt_text = models.CharField(max_length=200)

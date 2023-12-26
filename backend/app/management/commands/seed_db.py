from django.core.management.base import BaseCommand
from django.utils import timezone
from app.models import User, AmenityType, PropertyType, Room, Photo, Property, Amenity, Booking, RoomBooking, Review


class Command(BaseCommand):
    help = 'Seed database with initial data'
    
    def handle(self, *args, **options):
        # Deleting all existing data
        User.objects.all().delete()
        AmenityType.objects.all().delete()
        PropertyType.objects.all().delete()
        Room.objects.all().delete()
        Photo.objects.all().delete()
        Property.objects.all().delete()
        Amenity.objects.all().delete()
        Booking.objects.all().delete()
        RoomBooking.objects.all().delete()
        Review.objects.all().delete()
        
        # Adding new Users
        user1 = User.objects.create_user(username='user1', password='password123', is_host=True)
        user2 = User.objects.create_user(username='user2', password='password456', is_host=True)
        user3 = User.objects.create_user(username='guest1', password='password789', is_host=False)
        
        # Adding AmenityTypes
        amenity_type1 = AmenityType.objects.create(name='Wi-Fi')
        amenity_type2 = AmenityType.objects.create(name='Air Conditioning')
        amenity_type3 = AmenityType.objects.create(name='Pool')
        amenity_type4 = AmenityType.objects.create(name='Gym')
        
        # Adding PropertyTypes
        property_type1 = PropertyType.objects.create(name='Villa')
        property_type2 = PropertyType.objects.create(name='Apartment')
        property_type3 = PropertyType.objects.create(name='House')
        
        # Adding Rooms
        room1 = Room.objects.create(name='Master Bedroom', capacity=2)
        room2 = Room.objects.create(name='Guest Bedroom', capacity=1)
        room3 = Room.objects.create(name='Living Room', capacity=4)
        room4 = Room.objects.create(name='Kitchen', capacity=1)
        
        # Adding Photos
        photo1 = Photo.objects.create(url='https://a0.muscache.com/im/pictures/miso/Hosting-598289084005563595/original/5037ecff-e315-4464-9c85-64503ae5b6ea.jpeg?im_w=720', alt_text='Photo 1')
        photo2 = Photo.objects.create(url='https://a0.muscache.com/im/pictures/miso/Hosting-40388474/original/fb5cce26-79f9-49bb-b85a-e198d45acf08.jpeg?im_w=720', alt_text='Photo 2')
        photo3 = Photo.objects.create(url='https://a0.muscache.com/im/pictures/miso/Hosting-17234604/original/2a9bef54-6ce1-4417-b243-286fb994bd6f.jpeg?im_w=720', alt_text='Photo 3')
        photo4 = Photo.objects.create(url='https://a0.muscache.com/im/pictures/662e5a71-e7ad-42e9-a81e-a6421502ecc3.jpg?im_w=720', alt_text='Photo 4')
        
        # Adding Properties
        property1 = Property.objects.create(
            host=user1,
            title='Beautiful Villa in the countryside',
            description='A beautiful villa with pool and Wi-Fi',
            price=120.00,
            location='Countryside, USA',
            available_start=timezone.now(),
            available_end=timezone.now() + timezone.timedelta(days=90),
            property_type=property_type1,
        )
        property1.photos.add(photo1)
        property1.rooms.add(room1, room2, room3)
        
        property2 = Property.objects.create(
            host=user2,
            title='Modern Apartment in the city',
            description='A modern apartment with gym and Wi-Fi',
            price=80.00,
            location='City, USA',
            available_start=timezone.now(),
            available_end=timezone.now() + timezone.timedelta(days=60),
            property_type=property_type2,
        )
        property2.photos.add(photo2)
        property2.rooms.add(room1, room4)
        
        # Adding Amenities to Properties
        amenity1 = Amenity.objects.create(property=property1, amenity_type=amenity_type1)
        amenity2 = Amenity.objects.create(property=property1, amenity_type=amenity_type2)
        amenity3 = Amenity.objects.create(property=property1, amenity_type=amenity_type3)
        amenity4 = Amenity.objects.create(property=property2, amenity_type=amenity_type1)
        amenity5 = Amenity.objects.create(property=property2, amenity_type=amenity_type4)
        
        # Adding Bookings
        booking1 = Booking.objects.create(
            guest=user3,
            property=property1,
            check_in_date=timezone.now() + timezone.timedelta(days=7),
            check_out_date=timezone.now() + timezone.timedelta(days=14),
        )
        booking2 = Booking.objects.create(
            guest=user3,
            property=property2,
            check_in_date=timezone.now() + timezone.timedelta(days=15),
            check_out_date=timezone.now() + timezone.timedelta(days=22),
        )
        
        # Adding RoomBookings
        room_booking1 = RoomBooking.objects.create(
            room=room1,
            booking=booking1,
            adults=2,
            children=0,
        )
        room_booking2 = RoomBooking.objects.create(
            room=room2,
            booking=booking2,
            adults=1,
            children=0,
        )
        
        # Adding Reviews
        review1 = Review.objects.create(
            reviewer=user3,
            property=property1,
            review_text='Amazing stay! The villa was beautiful and the host was very accommodating.',
            rating=5,
        )
        review2 = Review.objects.create(
            reviewer=user3,
            property=property2,
            review_text='Great apartment! Very modern and clean.',
            rating=4,
        )

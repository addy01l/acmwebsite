from rest_framework import viewsets, views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Member, Event, EventGallery, Domain, TeamMember, ContactMessage, MembershipApplication, NewsletterSubscriber, EventRegistration
from .serializers import (
    MemberSerializer, EventSerializer, EventGallerySerializer, DomainSerializer, 
    TeamMemberSerializer, ContactMessageSerializer, MembershipApplicationSerializer, 
    NewsletterSubscriberSerializer, EventRegistrationSerializer
)
from .permissions import IsAdminUserOrReadOnly, IsAdminOrMember

class MemberLoginView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        enrollment_no = request.data.get('enrollment_no')

        if not email or not enrollment_no:
            return Response({'error': 'Email and Enrollment Number are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            member = Member.objects.get(email=email, enrollment_no=enrollment_no)
        except Member.DoesNotExist:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Get or create a Django User for this member to generate a standard JWT token
        user, created = User.objects.get_or_create(username=enrollment_no)
        if created:
            user.email = email
            user.set_unusable_password()
            user.is_staff = False
            user.save()

        refresh = RefreshToken.for_user(user)
        
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'role': 'member',
            'member_name': member.name
        })

class AdminStatsView(views.APIView):
    permission_classes = [IsAdminOrMember]

    def get(self, request):
        stats = {
            'members': Member.objects.count(),
            'events': Event.objects.count(),
            'applications': MembershipApplication.objects.count(),
            'registrations': EventRegistration.objects.count(),
            'messages': ContactMessage.objects.count(),
            'subscribers': NewsletterSubscriber.objects.count(),
        }
        return Response(stats)

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all().order_by('-created_at')
    serializer_class = MemberSerializer
    permission_classes = [IsAdminOrMember] # Admin or member can manage members (maybe members should just view, IsAdminOrMember handles this)

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-date')
    serializer_class = EventSerializer
    permission_classes = [IsAdminUserOrReadOnly] # Public can view, only admin can edit

    def get_queryset(self):
        queryset = super().get_queryset()
        is_upcoming = self.request.query_params.get('is_upcoming', None)
        if is_upcoming is not None:
            is_upcoming = is_upcoming.lower() == 'true'
            queryset = queryset.filter(is_upcoming=is_upcoming)
        return queryset

class EventGalleryViewSet(viewsets.ModelViewSet):
    queryset = EventGallery.objects.all().order_by('-created_at')
    serializer_class = EventGallerySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class DomainViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all().order_by('order')
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class MembershipApplicationViewSet(viewsets.ModelViewSet):
    queryset = MembershipApplication.objects.all().order_by('-created_at')
    serializer_class = MembershipApplicationSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class NewsletterSubscriberViewSet(viewsets.ModelViewSet):
    queryset = NewsletterSubscriber.objects.all().order_by('-subscribed_at')
    serializer_class = NewsletterSubscriberSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class EventRegistrationViewSet(viewsets.ModelViewSet):
    queryset = EventRegistration.objects.all().order_by('-created_at')
    serializer_class = EventRegistrationSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        registration = serializer.save()
        event = registration.event
        
        # Send confirmation email
        subject = f"Registration Confirmed: {event.title}"
        
        message = f"Hello {registration.applicant_name},\n\n"
        message += f"Thank you for registering for {event.title}!\n\n"
        message += f"Event Details:\n"
        message += f"Date: {event.date.strftime('%B %d, %Y %I:%M %p')}\n"
        message += f"Venue: {event.venue}\n\n"
        
        if event.ticket_price > 0:
            message += "We have received your registration and your payment screenshot. It is currently under review by our team.\n\n"
        else:
            message += "Your registration has been successfully recorded.\n\n"
            
        message += "We look forward to seeing you there!\n\n"
        message += "Best Regards,\nShivalik ACM Chapter"
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [registration.applicant_email],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Error sending email: {e}")

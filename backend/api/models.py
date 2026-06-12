from django.db import models
from django.utils import timezone
import uuid

class Member(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    branch = models.CharField(max_length=100)
    year = models.IntegerField()
    enrollment_no = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    date = models.DateTimeField()
    venue = models.CharField(max_length=255)
    banner = models.ImageField(upload_to='events/', null=True, blank=True)
    reg_link = models.URLField(max_length=500, blank=True, null=True)
    is_upcoming = models.BooleanField(default=True)
    
    # New fields for Registration System
    ticket_price = models.IntegerField(default=0, help_text="Amount in INR. 0 for free events.")
    payment_details = models.CharField(max_length=255, blank=True, null=True, help_text="UPI ID or Payment Link")
    custom_form_fields = models.JSONField(default=list, blank=True, help_text="Array of objects defining custom questions, e.g. [{'type': 'text', 'question': 'T-Shirt Size?', 'required': true}]")
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class EventGallery(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, related_name='gallery', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='event_gallery/')
    created_at = models.DateTimeField(auto_now_add=True)

class EventRegistration(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending Verification'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, related_name='registrations', on_delete=models.CASCADE)
    applicant_name = models.CharField(max_length=255)
    applicant_email = models.EmailField()
    applicant_phone = models.CharField(max_length=20)
    custom_answers = models.JSONField(default=dict, blank=True)
    payment_screenshot = models.ImageField(upload_to='payment_screenshots/', null=True, blank=True)
    payment_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.applicant_name} - {self.event.title}"

class Domain(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    skills = models.JSONField(default=list)  # Stored as a JSON array of strings
    team_leads = models.CharField(max_length=255)
    icon = models.CharField(max_length=100) # Lucide icon name

    def __str__(self):
        return self.name

class TeamMember(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='team/', null=True, blank=True)
    linkedin = models.URLField(max_length=500, blank=True, null=True)
    github = models.URLField(max_length=500, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class ContactMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} from {self.name}"

class MembershipApplication(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    branch = models.CharField(max_length=100)
    year = models.IntegerField()
    enrollment_no = models.CharField(max_length=100, unique=True)
    skills = models.TextField()
    resume = models.FileField(upload_to='resumes/')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Application: {self.name}"

class NewsletterSubscriber(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

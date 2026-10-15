from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.core.exceptions import ValidationError
import re


class RegisterForm(UserCreationForm):
    """
    Custom registration form with additional fields and validation.
    Extends Django's built-in UserCreationForm for secure password handling.
    """
    first_name = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.TextInput(attrs={
            'placeholder': 'First Name',
            'id': 'id_first_name',
            'autocomplete': 'given-name',
        })
    )
    last_name = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.TextInput(attrs={
            'placeholder': 'Last Name',
            'id': 'id_last_name',
            'autocomplete': 'family-name',
        })
    )
    username = forms.CharField(
        max_length=150,
        required=True,
        widget=forms.TextInput(attrs={
            'placeholder': 'Username',
            'id': 'id_username',
            'autocomplete': 'username',
        })
    )
    email = forms.EmailField(
        max_length=254,
        required=True,
        widget=forms.EmailInput(attrs={
            'placeholder': 'Email Address',
            'id': 'id_email',
            'autocomplete': 'email',
        })
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Password',
            'id': 'id_password1',
            'autocomplete': 'new-password',
        })
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Confirm Password',
            'id': 'id_password2',
            'autocomplete': 'new-password',
        })
    )

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2']

    def clean_username(self):
        """Validate username: alphanumeric, underscores only, 3-30 chars."""
        username = self.cleaned_data.get('username')
        if not re.match(r'^[a-zA-Z0-9_]{3,30}$', username):
            raise ValidationError(
                'Username must be 3-30 characters and contain only letters, numbers, and underscores.'
            )
        if User.objects.filter(username__iexact=username).exists():
            raise ValidationError('This username is already taken.')
        return username

    def clean_email(self):
        """Validate that email is not already registered."""
        email = self.cleaned_data.get('email')
        if User.objects.filter(email__iexact=email).exists():
            raise ValidationError('An account with this email already exists.')
        return email

    def clean_first_name(self):
        """Validate first name contains only letters."""
        first_name = self.cleaned_data.get('first_name')
        if not re.match(r'^[a-zA-Z\s]{2,30}$', first_name):
            raise ValidationError('First name must contain only letters (2-30 characters).')
        return first_name.strip()

    def clean_last_name(self):
        """Validate last name contains only letters."""
        last_name = self.cleaned_data.get('last_name')
        if not re.match(r'^[a-zA-Z\s]{2,30}$', last_name):
            raise ValidationError('Last name must contain only letters (2-30 characters).')
        return last_name.strip()


class LoginForm(AuthenticationForm):
    """
    Custom login form extending Django's AuthenticationForm.
    Provides styled widgets and custom error messages.
    """
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'placeholder': 'Username',
            'id': 'id_login_username',
            'autocomplete': 'username',
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Password',
            'id': 'id_login_password',
            'autocomplete': 'current-password',
        })
    )

    error_messages = {
        'invalid_login': 'Invalid username or password. Please try again.',
        'inactive': 'This account is inactive. Contact support.',
    }

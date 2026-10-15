/**
 * Frontend Form Validation
 * Real-time validation with visual feedback for login and registration forms.
 * Works alongside Django's backend validation as a defense-in-depth approach.
 */

// ============================================
// Utility Functions
// ============================================

/**
 * Display an error message for a field
 */
function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + '-error');
    const input = document.getElementById(fieldId.replace('-error', ''));
    if (errorEl) {
        errorEl.textContent = message;
    }
    if (input) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
    }
}

/**
 * Clear error message for a field
 */
function clearError(fieldId) {
    const errorEl = document.getElementById(fieldId + '-error');
    const input = document.getElementById(fieldId.replace('-error', ''));
    if (errorEl) {
        errorEl.textContent = '';
    }
    if (input) {
        input.classList.remove('input-error');
    }
}

/**
 * Mark a field as valid
 */
function markValid(fieldId) {
    clearError(fieldId);
    const input = document.getElementById(fieldId);
    if (input) {
        input.classList.add('input-success');
    }
}

/**
 * Toggle password visibility
 */
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const eyeOpen = button.querySelector('.eye-open');
    const eyeClosed = button.querySelector('.eye-closed');

    if (input.type === 'password') {
        input.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    } else {
        input.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
}


// ============================================
// Validation Rules
// ============================================

const validators = {
    /**
     * Validate a name field (first or last name)
     */
    name: function(value, fieldName) {
        if (!value.trim()) {
            return fieldName + ' is required.';
        }
        if (value.trim().length < 2) {
            return fieldName + ' must be at least 2 characters.';
        }
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
            return fieldName + ' must contain only letters.';
        }
        return null;
    },

    /**
     * Validate username
     */
    username: function(value) {
        if (!value.trim()) {
            return 'Username is required.';
        }
        if (value.trim().length < 3) {
            return 'Username must be at least 3 characters.';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value.trim())) {
            return 'Username can only contain letters, numbers, and underscores.';
        }
        return null;
    },

    /**
     * Validate email format
     */
    email: function(value) {
        if (!value.trim()) {
            return 'Email is required.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
            return 'Please enter a valid email address.';
        }
        return null;
    },

    /**
     * Validate password strength
     */
    password: function(value) {
        if (!value) {
            return 'Password is required.';
        }
        if (value.length < 8) {
            return 'Password must be at least 8 characters.';
        }
        return null;
    },

    /**
     * Validate password confirmation matches
     */
    confirmPassword: function(password, confirmPassword) {
        if (!confirmPassword) {
            return 'Please confirm your password.';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }
        return null;
    }
};


// ============================================
// Login Form Validation
// ============================================

function validateLoginForm() {
    let isValid = true;

    // Username
    const username = document.getElementById('id_login_username');
    if (username) {
        const usernameError = validators.username(username.value);
        if (usernameError) {
            showError('username', usernameError);
            isValid = false;
        } else {
            clearError('username');
        }
    }

    // Password
    const password = document.getElementById('id_login_password');
    if (password) {
        if (!password.value) {
            showError('password', 'Password is required.');
            isValid = false;
        } else {
            clearError('password');
        }
    }

    return isValid;
}


// ============================================
// Register Form Validation
// ============================================

function validateRegisterForm() {
    let isValid = true;

    // First Name
    const firstName = document.getElementById('id_first_name');
    if (firstName) {
        const error = validators.name(firstName.value, 'First name');
        if (error) {
            showError('first_name', error);
            isValid = false;
        } else {
            clearError('first_name');
        }
    }

    // Last Name
    const lastName = document.getElementById('id_last_name');
    if (lastName) {
        const error = validators.name(lastName.value, 'Last name');
        if (error) {
            showError('last_name', error);
            isValid = false;
        } else {
            clearError('last_name');
        }
    }

    // Username
    const username = document.getElementById('id_username');
    if (username) {
        const error = validators.username(username.value);
        if (error) {
            showError('username', error);
            isValid = false;
        } else {
            clearError('username');
        }
    }

    // Email
    const email = document.getElementById('id_email');
    if (email) {
        const error = validators.email(email.value);
        if (error) {
            showError('email', error);
            isValid = false;
        } else {
            clearError('email');
        }
    }

    // Password
    const password1 = document.getElementById('id_password1');
    if (password1) {
        const error = validators.password(password1.value);
        if (error) {
            showError('password1', error);
            isValid = false;
        } else {
            clearError('password1');
        }
    }

    // Confirm Password
    const password2 = document.getElementById('id_password2');
    if (password1 && password2) {
        const error = validators.confirmPassword(password1.value, password2.value);
        if (error) {
            showError('password2', error);
            isValid = false;
        } else {
            clearError('password2');
        }
    }

    return isValid;
}


// ============================================
// Real-time Validation (on blur)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Real-time validation on input blur
    const fieldValidators = {
        'id_first_name': (val) => validators.name(val, 'First name'),
        'id_last_name': (val) => validators.name(val, 'Last name'),
        'id_username': (val) => validators.username(val),
        'id_email': (val) => validators.email(val),
        'id_password1': (val) => validators.password(val),
        'id_login_username': (val) => validators.username(val),
    };

    // Attach blur listeners
    for (const [id, validate] of Object.entries(fieldValidators)) {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('blur', function() {
                if (this.value.trim()) {
                    const errorKey = id.replace('id_', '').replace('login_', '');
                    const error = validate(this.value);
                    if (error) {
                        showError(errorKey, error);
                    } else {
                        markValid(id);
                    }
                }
            });

            // Clear error on focus
            input.addEventListener('focus', function() {
                const errorKey = id.replace('id_', '').replace('login_', '');
                clearError(errorKey);
                this.classList.remove('input-error', 'input-success');
            });
        }
    }

    // Confirm password real-time check
    const pw2 = document.getElementById('id_password2');
    if (pw2) {
        pw2.addEventListener('blur', function() {
            const pw1 = document.getElementById('id_password1');
            if (this.value && pw1) {
                const error = validators.confirmPassword(pw1.value, this.value);
                if (error) {
                    showError('password2', error);
                } else {
                    markValid('id_password2');
                }
            }
        });

        pw2.addEventListener('focus', function() {
            clearError('password2');
            this.classList.remove('input-error', 'input-success');
        });
    }
});

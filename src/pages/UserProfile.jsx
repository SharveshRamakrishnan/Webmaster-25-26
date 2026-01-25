import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit2, Save, X, AlertCircle, CheckCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageHero from '../components/PageHero';
import '../css/userProfile.css';

export default function UserProfile() {
  const { user, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || user.email?.split('@')[0] || '');
    }
  }, [user]);

  // Handle profile update
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Display name cannot be empty');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateUserProfile(displayName);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout with confirmation
  const handleLogoutConfirm = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/');
    } catch {
      setError('Failed to logout');
    } finally {
      setIsLoading(false);
      setShowLogoutConfirm(false);
    }
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user?.email) return '?';
    const parts = user.email.split('@')[0].split('.');
    return (parts[0][0] + (parts[1]?.[0] || parts[0][1] || '')).toUpperCase();
  };

  if (!user) {
    return (
      <div className="profile-unauthorized">
        <PageHero
          title="User Profile"
          subtitle="Manage your account information"
        />
        <div className="profile-container">
          <div className="profile-empty-state">
            <User size={48} className="profile-empty-icon" />
            <h2>Not Logged In</h2>
            <p>Please log in to view your profile</p>
            <button
              onClick={() => navigate('/login')}
              className="profile-btn-primary"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title="User Profile"
        subtitle="Manage your account information and settings"
        className="profile-hero"
      />

      <div className="profile-container">
        <div className="profile-card">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                {getUserInitials()}
              </div>
              <div className="profile-avatar-label">Account</div>
            </div>
            <div className="profile-header-content">
              <h1 className="profile-title">{displayName || user.email}</h1>
              <p className="profile-email">{user.email}</p>
              <p className="profile-account-type">
                {user.providerData?.length > 0
                  ? `Signed in with ${user.providerData[0].providerId.split('.')[0]}`
                  : 'Email & Password'}
              </p>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="profile-alert error">
              <AlertCircle size={18} />
              <span>{error}</span>
              <button onClick={() => setError('')} className="alert-close">
                <X size={16} />
              </button>
            </div>
          )}

          {success && (
            <div className="profile-alert success">
              <CheckCircle size={18} />
              <span>{success}</span>
            </div>
          )}

          {/* Profile Information Form */}
          <div className="profile-section">
            <div className="profile-section-header">
              <h2>Personal Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="profile-btn-edit"
                  disabled={isLoading}
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="profile-form">
                <div className="form-group">
                  <label htmlFor="displayName" className="form-label">
                    Display Name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="form-input"
                    placeholder="Enter your display name"
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address (Cannot be changed)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user.email}
                    className="form-input form-input-disabled"
                    disabled
                  />
                </div>

                <div className="profile-form-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setDisplayName(user.displayName || user.email?.split('@')[0] || '');
                      setError('');
                    }}
                    className="profile-btn-secondary"
                    disabled={isLoading}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="profile-btn-primary"
                    disabled={isLoading}
                  >
                    <Save size={16} />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info-display">
                <div className="info-field">
                  <span className="info-label">Display Name</span>
                  <span className="info-value">{displayName || 'Not set'}</span>
                </div>
                <div className="info-field">
                  <span className="info-label">Email Address</span>
                  <span className="info-value">{user.email}</span>
                </div>
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="profile-section danger-zone">
            <h2>Account Actions</h2>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="profile-btn-logout"
              disabled={isLoading || showLogoutConfirm}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          {/* Logout Confirmation Modal */}
          {showLogoutConfirm && (
            <div className="profile-modal-overlay">
              <div className="profile-modal">
                <div className="modal-header">
                  <h3>Confirm Logout</h3>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="modal-close"
                    disabled={isLoading}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to logout?</p>
                  <p className="modal-subtext">You will need to log in again to access your saved items and personalized features.</p>
                </div>
                <div className="modal-actions">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="profile-btn-secondary"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogoutConfirm}
                    className="profile-btn-danger"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging out...' : 'Yes, Logout'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

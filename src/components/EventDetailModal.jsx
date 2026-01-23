import React from 'react';
import PropTypes from 'prop-types';
import { X, Clock, MapPin, Users, Heart } from 'lucide-react';
import { useResources } from '../context/ResourceContext';
import { useAuth } from '../context/AuthContext';
import '../css/modal.css';

export default function EventDetailModal({ event, onClose }) {
  const { userEvents, toggleUserEvent } = useResources();
  const { isAuthenticated } = useAuth();
  const isRegistered = userEvents.includes(Number(event.id));

  const handleToggleEvent = () => {
    if (isAuthenticated) {
      toggleUserEvent(Number(event.id));
    }
  };

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-icon-box">
            <span className="modal-icon">📅</span>
          </div>
          <div>
            <h2 className="modal-title">{event.name}</h2>
            <span className="modal-category-badge">{event.category}</span>
          </div>
        </div>

        {/* Main Description */}
        <div className="modal-section">
          <h3 className="modal-section-title">About This Event</h3>
          <p className="modal-description">{event.description}</p>
        </div>

        {/* Date & Time */}
        <div className="modal-section">
          <h3 className="modal-section-title">Event Details</h3>
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <Clock size={18} className="contact-info-icon" />
              <div>
                <span className="contact-label">Date</span>
                <p className="contact-value">{formattedDate}</p>
              </div>
            </div>
            <div className="contact-info-item">
              <Clock size={18} className="contact-info-icon" />
              <div>
                <span className="contact-label">Time</span>
                <p className="contact-value">{event.time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Attendees */}
        <div className="modal-section">
          <h3 className="modal-section-title">Location & Attendance</h3>
          <div className="location-hours-grid">
            <div className="location-item">
              <MapPin size={18} className="location-icon" />
              <div>
                <span className="location-label">Location</span>
                <p className="location-value">{event.location}</p>
              </div>
            </div>
            <div className="location-item">
              <Users size={18} className="location-icon" />
              <div>
                <span className="location-label">Expected Attendees</span>
                <p className="location-value">{event.attendees} people</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          {isAuthenticated && (
            <button 
              className={`btn-favorite ${isRegistered ? 'active' : ''}`}
              onClick={handleToggleEvent}
              title={isRegistered ? 'Remove from saved events' : 'Register for this event'}
            >
              <Heart size={18} fill={isRegistered ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} />
              {isRegistered ? 'Registered!' : 'Register for Event'}
            </button>
          )}
          <button className="btn-close-modal" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

EventDetailModal.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    attendees: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

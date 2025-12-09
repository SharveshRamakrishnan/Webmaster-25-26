import React, { useState } from 'react';
import EventsHero from '../components/EventsHero';
import EventFilters from '../components/EventFilters';
import EventsGrid from '../components/EventsGrid';
import CalendarCTA from '../components/CalendarCTA';
import events from '../data/events';
import '../css/eventsPage.css';

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events
    .filter(event => selectedCategory === 'All' || event.category === selectedCategory)
    .filter(event => 
      searchQuery === '' || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <EventsHero />
      
      <div className="events-page-container">
        <EventFilters 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <EventsGrid events={filteredEvents} />
      </div>

      <CalendarCTA />
    </>
  );
}

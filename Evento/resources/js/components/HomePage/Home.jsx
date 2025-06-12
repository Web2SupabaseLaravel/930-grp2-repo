import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import NavigationBar from './Navbar';
import Hero from './Hero';
import AboutUs from './AboutUs';
import EventList from './EventList';
import ReviewList from './ReviewList';
import Footer from './Footer';

import food from '../../assets/food.png';
import soccer from '../../assets/soccer.png';
import teacher from '../../assets/teacher.png';
import music from '../../assets/music.png';

function Home() {
  const menuItems = [
    { text: 'Home', link: '#home' },
    { text: 'Events', link: '#events' },
    { text: 'Create Event', link: '/events' }
  ];

  const events = [
    {
      image: food,
      title: 'Food Truck Festival',
      date: 'April 25',
      location: 'Food Court',
      category: 'Food'
    },
    {
      image: soccer,
      title: 'Community Soccer',
      date: 'Dec 20',
      location: 'Madrid',
      category: 'Sports'
    },
    {
      image: teacher,
      title: 'Marketing Workshop',
      date: 'July 14',
      location: 'Luminus',
      category: 'Education'
    },
    {
      image: music,
      title: 'Live Music Concert',
      date: 'Sep 13',
      location: 'Stockholm',
      category: 'Music'
    }
  ];

  const reviews = [
    {
      title: 'Great Experience',
      rating: 4,
      review: 'Amazing event management platform! Very user friendly.',
      author: 'John Doe'
    },
    {
      title: 'Excellent Service',
      rating: 1,
      review: 'The team was very helpful and responsive.',
      author: 'Jane Smith'
    }
  ];

  return (
    <div>
      <NavigationBar menuItems={menuItems} />
      
      <div id="home">
        <Hero />
      </div>
      
      <AboutUs 
        title="About Us"
        description="Evento empowers attendees, organizer, and administrators with seamless event handling. Join us to make your events successful and memorable!"
      />
      
      <div id="events">
        <EventList 
          title="Suggested Events"
          events={events}
        />
      </div>
      
      <ReviewList 
        title="User Reviews"
        reviews={reviews}
      />
      
      <Footer 
        brandName="Evento"
        brandName2="Privacy"
        email="info@evento.com"
      />
    </div>
  );
}

export default Home; 
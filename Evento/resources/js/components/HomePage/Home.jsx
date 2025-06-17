import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import NavigationBar from './Navbar';
import Hero from './Hero';
import AboutUs from './AboutUs';
import EventList from './EventList';
import ReviewList from './ReviewList';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

import food from '../../assets/food.png';
import soccer from '../../assets/soccer.png';
import teacher from '../../assets/teacher.png';
import music from '../../assets/music.png';

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      once: true, // Animations occur only once when scrolling
      offset: 100, // Offset (in pixels) from the original trigger point
    });
  }, []);

  const menuItems = [
    { text: 'Home', link: '/home' },
    { text: 'DashBoard', link: '/DashBoard' },
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
      
      <div id="home" data-aos="fade-up">
        <Hero />
      </div>
      
      <div data-aos="fade-up" data-aos-delay="100">
        <AboutUs 
          title="About Us"
          description="Evento empowers attendees, organizer, and administrators with seamless event handling. Join us to make your events successful and memorable!"
        />
      </div>
      
      <div id="events" data-aos="fade-up" data-aos-delay="200">
        <EventList 
          title="Suggested Events"
          events={events}
        />
      </div>
      
      <div data-aos="fade-up" data-aos-delay="300">
        <ReviewList 
          title="User Reviews"
          reviews={reviews}
        />
      </div>
      
      <div data-aos="fade-up" data-aos-delay="400">
        <Footer 
          brandName="Evento"
          brandName2="Privacy"
          email="info@evento.com"
        />
      </div>
    </div>
  );
}

export default Home;
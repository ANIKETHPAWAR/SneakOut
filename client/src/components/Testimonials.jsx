import React from 'react';
import { Link } from 'react-router-dom';

const TESTIMONIALS = [
  {
    name: 'Aarav K.',
    role: 'Travel Photographer',
    quote:
      'SneakOut helped me discover unreal rooftops and hidden alleys. The photo category is spot on.',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    name: 'Maya S.',
    role: 'Weekend Explorer',
    quote:
      'I loved the curated lists. The “Hidden” section made my city feel new again.',
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
  {
    name: 'Rohit P.',
    role: 'Food Blogger',
    quote:
      'Found quiet cafes and tiny diners I never knew existed. Bookmarked so many spots!',
    avatar: 'https://i.pravatar.cc/80?img=15',
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-heading mb-2">What Explorers Are Saying</h2>
          <p className="text-subtle max-w-2xl mx-auto">
            Stories from our community discovering hidden gems across the city.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className="gcard">
              <div className="gcard-inner items-start text-left">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold text-heading leading-tight">{t.name}</div>
                    <div className="text-xs text-subtle">{t.role}</div>
                  </div>
                </div>

                <p className="text-[15px] text-heading/90">
                  “{t.quote}”
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-primary)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  Verified Explorer
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA stripe */}
        <div className="mt-10 gcard">
          <div className="gcard-inner md:flex items-center justify-between text-center md:text-left">
            <div className="mb-3 md:mb-0">
              <h3 className="text-xl font-semibold text-heading">Share your hidden gem</h3>
              <p className="text-subtle">Help the community discover your favorite spot.</p>
            </div>
            <Link to="/add-spot" className="gbtn">
              <span className="gbtn-inner">Add a Spot</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;



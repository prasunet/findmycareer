'use client';

import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

const scholarships = [
  {
    title: 'GATE Scholarship (For M.Tech)',
    description: 'Scholarship for students pursuing M.Tech courses through GATE examination, offering financial assistance to deserving students.',
    amount: '₹12,400/month',
    lastDate: 'October 1, 2025',
    link: 'https://gate.iitb.ac.in/',
  },
  {
    title: 'JRF (Junior Research Fellowship)',
    description: 'Awarded to postgraduate students pursuing research, offering financial aid for studies in science, technology, engineering, and other disciplines.',
    amount: '₹31,000/month (First 2 years), ₹35,000/month (Next 3 years)',
    lastDate: 'July 15, 2025',
    link: 'https://csirhrdg.res.in/',
  },
  {
    title: 'UGC NET Fellowship',
    description: 'For students pursuing M.A./M.Sc. and research programs in Indian universities, based on the National Eligibility Test (NET) scores.',
    amount: '₹31,000/month',
    lastDate: 'June 30, 2025',
    link: 'https://ugc.ac.in/',
  },
  {
    title: 'DAAD Scholarship (Germany)',
    description: 'A prestigious scholarship for Indian students pursuing master’s or doctoral programs at German universities.',
    amount: 'Varies (Living expenses, tuition fees, and more)',
    lastDate: 'July 31, 2025',
    link: 'https://www.daad.de/en/',
  },
  {
    title: 'Chevening Scholarship (UK)',
    description: 'Fully funded scholarships for Indian students pursuing a master’s degree in the United Kingdom, covering tuition fees, living costs, and travel.',
    amount: 'Fully Funded',
    lastDate: 'November 1, 2025',
    link: 'https://www.chevening.org/',
  },
  {
    title: 'Rhodes Scholarship (Oxford University)',
    description: 'One of the world’s oldest and most esteemed scholarships, supporting outstanding postgraduate students at the University of Oxford.',
    amount: 'Fully Funded (Tuition, travel, living expenses)',
    lastDate: 'October 31, 2025',
    link: 'https://www.rhodeshouse.ox.ac.uk/',
  },
  {
    title: 'Commonwealth Scholarships (UK)',
    description: 'For students from Commonwealth countries, funding postgraduate study in the UK. Includes tuition, airfare, and a living allowance.',
    amount: 'Fully Funded',
    lastDate: 'October 15, 2025',
    link: 'https://cscuk.dfid.gov.uk/',
  },
  {
    title: 'Fulbright-Nehru Master’s Fellowship (USA)',
    description: 'A prestigious scholarship for students pursuing a master’s degree in the USA, awarded by the United States-India Educational Foundation (USIEF).',
    amount: 'Fully Funded (Tuition, living allowance, travel expenses)',
    lastDate: 'July 15, 2025',
    link: 'https://www.usief.org.in/',
  },
];

export default function MastersScholarships() {
  const [visibleCount, setVisibleCount] = useState(5); // Initial scholarships shown (5)
  const [filterCriteria, setFilterCriteria] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState(scholarships);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterCriteria(value);

    if (value === 'amount') {
      setFilteredScholarships([ ...filteredScholarships.sort((a, b) => {
        const aAmount = parseInt(a.amount.replace(/[^\d]/g, '')) || 0;
        const bAmount = parseInt(b.amount.replace(/[^\d]/g, '')) || 0;
        return bAmount - aAmount;
      })]);
    } else if (value === 'date') {
      setFilteredScholarships([ ...filteredScholarships.sort((a, b) => new Date(a.lastDate).getTime() - new Date(b.lastDate).getTime()) ]);
    } else {
      setFilteredScholarships(scholarships); // Reset to original order
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3); // Load 3 more scholarships at a time
  };

  const shouldShowLoadMore = scholarships.length > visibleCount;

  return (
    <> 
    <Navbar />
    <Layout>
      <div style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '1rem',
            fontWeight: 'bold',
            color: '#222',
          }}
        >
          Top Scholarships for Master’s Degree Students
        </h1>

        <p
          style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
            color: '#555',
            fontSize: '1.1rem',
          }}
        >
          Find the best scholarships available for postgraduate students to support your master’s degree studies.
        </p>

        {/* Sort By Dropdown */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2.5rem',
            justifyContent: 'center',
          }}
        >
          <select
            style={selectStyle}
            onChange={handleFilterChange}
            value={filterCriteria}
          >
            <option value="">Sort By</option>
            <option value="amount">Amount</option>
            <option value="date">Last Date</option>
          </select>
        </div>

        {/* Scholarships List */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredScholarships.slice(0, visibleCount).map((scholarship, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                borderRadius: '1rem',
                padding: '1.8rem',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                border: '1px solid #eee',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.7rem', fontWeight: '600', color: '#1a1a1a' }}>
                {scholarship.title}
              </h3>
              <p style={{ fontSize: '1rem', marginBottom: '1rem', lineHeight: '1.5', color: '#444' }}>
                {scholarship.description}
              </p>
              <p style={{ fontSize: '0.95rem', marginBottom: '0.4rem', color: '#0070f3' }}>
                <strong>Amount:</strong> {scholarship.amount}
              </p>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#333' }}>
                <strong>Last Date:</strong> {scholarship.lastDate}
              </p>
              <Link
                href={scholarship.link}
                target="_blank"
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#0070f3',
                  color: '#fff',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                }}
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {shouldShowLoadMore && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <div
              onClick={loadMore}
              style={{
                margin: '3rem auto 2rem',
                width: '100px',
                height: '20px',
                background: '#0070f3',
                borderRadius: '15px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '4px',
                  background: '#fff',
                  borderRadius: '999px',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'bendLine 1s ease-out forwards',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
    </>
  );
}

const selectStyle = {
  padding: '0.6rem',
  borderRadius: '0.5rem',
  border: '1px solid #ccc',
  minWidth: '180px',
};

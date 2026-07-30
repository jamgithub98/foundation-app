import React from 'react';

const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Empowering communities through compassion, education, and sustainable action.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
            <p className="text-lg leading-relaxed">
              Founded in 2020 with a small group of passionate individuals, 
              we set out to bridge the gap between privilege and need. 
              What started as a weekend initiative has now grown into a 
              registered foundation impacting 250+ lives across the region.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              We believe that every person deserves access to quality 
              education, proper healthcare, and the opportunity to build 
              a dignified life.
            </p>
            <div className="mt-6">
              <span className="badge badge-primary badge-lg mr-2">🏆 Registered NGO</span>
              <span className="badge badge-secondary badge-lg">📍 India</span>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-80 h-80 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary">
              <span className="text-7xl">🤝</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-3">❤️</div>
                <h3 className="card-title">Compassion</h3>
                <p>We approach every initiative with empathy and a deep understanding of community needs.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-3">🤝</div>
                <h3 className="card-title">Integrity</h3>
                <p>We operate with complete transparency, ensuring every contribution reaches its intended purpose.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-3">🚀</div>
                <h3 className="card-title">Impact</h3>
                <p>We focus on sustainable, measurable outcomes that create lasting change in communities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl text-center">
            <figure className="px-10 pt-10">
              <div className="w-32 h-32 rounded-full bg-neutral text-neutral-content flex items-center justify-center text-4xl">
                👨‍💼
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title justify-center">Founder Name</h3>
              <p className="text-primary font-semibold">Founder & Director</p>
              <p>Passionate about social change since 2010.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl text-center">
            <figure className="px-10 pt-10">
              <div className="w-32 h-32 rounded-full bg-neutral text-neutral-content flex items-center justify-center text-4xl">
                👩‍💼
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title justify-center">Co-Founder</h3>
              <p className="text-primary font-semibold">Project Head</p>
              <p>Expert in community outreach programs.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl text-center">
            <figure className="px-10 pt-10">
              <div className="w-32 h-32 rounded-full bg-neutral text-neutral-content flex items-center justify-center text-4xl">
                👩‍🏫
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title justify-center">Team Member</h3>
              <p className="text-primary font-semibold">Education Lead</p>
              <p>Drives all educational initiatives.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
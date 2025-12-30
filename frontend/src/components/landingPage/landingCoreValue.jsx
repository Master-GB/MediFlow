import React from 'react'

const landingCoreValue = () => {
  return (
    <div>
        <section className="relative pb-16 md:pt-10 overflow-hidden">
        {/* Background with Parallax Effect */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("src/assets/images/coreValue.jpeg")',
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10
            }}
          ></div>
          <div className="absolute z-15 inset-0 bg-linear-to-b from-blue-600/20 via-blue-700/30 to-blue-800/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-green-500 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Guiding principles that shape our approach to transforming healthcare through technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Continuously evolving our technology to stay at the forefront of healthcare solutions.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                gradient: "from-blue-500 to-blue-600"
              },
              {
                title: "Excellence",
                description: "Delivering the highest standard of quality in every aspect of our service.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                gradient: "from-green-500 to-emerald-600"
              },
              {
                title: "Compassion",
                description: "Putting patients first with empathetic, human-centered design and support.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                gradient: "from-pink-500 to-rose-500"
              },
              {
                title: "Integrity",
                description: "Maintaining the highest ethical standards in all our operations and data handling.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                gradient: "from-amber-500 to-yellow-500"
              },
              {
                title: "Collaboration",
                description: "Fostering partnerships between patients, providers, and technologists.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                gradient: "from-indigo-500 to-purple-600"
              },
              {
                title: "Accessibility",
                description: "Ensuring our platform is usable by everyone, regardless of ability or location.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradient: "from-teal-500 to-emerald-600"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-gray-400/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-400/30"
                data-aos="fade-up"
                data-aos-delay={50 * (index % 3)}
              >
                {/* Animated background on hover */}
                <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-1`}></div>

                {/* Icon container with gradient background */}
                <div className={`w-16 h-16 ${item.gradient} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg transform transition-all duration-300 group-hover:scale-110`}>
                  {item.icon}
                </div>

                {/* Content */}
                <h4 className="text-xl font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-blue-100 text-sm">{item.description}</p>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-500"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-500"></div>
              </div>
            ))}
          </div>


        </div>
      </section>
    </div>
  )
}

export default landingCoreValue
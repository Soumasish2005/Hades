'use client';

export default function StatsSection() {
  const stats = [
    { value: '1.2M+', label: 'Protected endpoints' },
    { value: '30 sec', label: 'Average response time' },
    { value: '20+', label: 'Integrations' },
    { value: '99.98%', label: 'Uptime' }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16 max-w-4xl mx-auto leading-tight">
          In an era where threats are constant and evolving, we believe your defense system should be just as dynamic.
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
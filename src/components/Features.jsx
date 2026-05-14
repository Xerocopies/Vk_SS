function Features() {
  const features = [
    { icon: '', title: 'Быстрая доставка', description: 'Отправляем по всей России курьерскими службами и Почтой за 1-3 дня.' },
    { icon: '🛡️', title: 'Гарантия качества', description: 'Оригинальные миниатюры WizKids, Reaper, Games Workshop с гарантией.' },
    { icon: '', title: 'Для новичков', description: 'Готовые наборы красок и кистей, обучающие материалы.' },
    { icon: '💎', title: 'Ручная работа', description: 'Эксклюзивные раскрашенные миниатюры от наших мастеров.' }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Почему выбирают нас</h2>
        <div className="features">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero__title">Миниатюры для D&D</h1>
        <p className="hero__subtitle">
          Более 500 готовых миниатюр, красок и аксессуаров. В наличии и под заказ.
        </p>
        <div className="hero-categories">
          <a href="#catalog" className="category-badge">Миниатюры</a>
          <a href="#catalog" className="category-badge">Краски</a>
          <a href="#catalog" className="category-badge">Аксессуары</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
function ProductsList({children}) {
  return (
    <section id="products" className="mt-4">
      <div className="container">
        <div className="row">
            {children}
        </div>
      </div>
    </section>
  );
}

export { ProductsList };
